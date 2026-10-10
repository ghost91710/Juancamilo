import { useLayoutEffect } from 'react';

const mix = (a, b, progress) => a + (b - a) * progress;
const ease = (progress) => progress * progress * (3 - 2 * progress);
const nearestSide = (point) => point.x + point.width / 2 < window.innerWidth / 2 ? -1 : 1;
const outside = (point, side) => side > 0 ? window.innerWidth + 24 : -point.width - 24;
const travelTime = (distance) => Math.min(1200, Math.max(750, Math.abs(distance) / .5));

// Travel happens in time: leave the current scene, wait offscreen, enter the next.
export default function useCharacterJourney(homeRef, actorRef, onSceneChange) {
  useLayoutEffect(() => {
    const actor = actorRef.current;
    const docks = {
      home: homeRef.current,
      about: document.querySelector('[data-character-stop="about"]'),
      contact: document.querySelector('[data-character-stop="contact"]'),
    };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let phase = 'initial';
    let place = 'home';
    let frame = 0;
    let started = 0;
    let lastScroll = window.scrollY;
    let originScroll = window.scrollY;
    let duration = 900;
    let exitX = 0;
    let origin = { x: 0, y: 0, width: 255 };
    let current = origin;
    let travelDirection = 1;

    function desiredPlace(boxes) {
      const height = window.innerHeight;
      for (const name of ['contact', 'about']) {
        if (boxes[name].top < height * .82 && boxes[name].top > height * .08) return name;
      }
      return boxes.home.top > height * .12 && boxes.home.top < height ? 'home' : null;
    }

    function change(nextPhase, time) {
      phase = nextPhase;
      started = time;
      actor.dataset.journey = phase;
      onSceneChange(place, phase === 'exiting' || phase === 'entering');
    }

    function draw(point, visible) {
      current = point;
      actor.style.visibility = visible ? 'visible' : 'hidden';
      actor.style.pointerEvents = phase === 'resting' ? 'auto' : 'none';
      actor.inert = phase !== 'resting';
      actor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${point.width / 255}) rotate(7deg)`;
      actor.style.setProperty('--journey-scale', point.width / 255);
      actor.style.setProperty('--run-facing', travelDirection);
      actor.dataset.place = place;
    }

    function render(time) {
      frame = 0;
      const scroll = window.scrollY;
      const scrollDelta = scroll - lastScroll;
      lastScroll = scroll;
      const boxes = Object.fromEntries(Object.entries(docks).map(([key, dock]) => [key, dock.getBoundingClientRect()]));
      const destination = desiredPlace(boxes);
      const point = (name) => ({ x: boxes[name].left, y: boxes[name].top, width: boxes[name].width });

      if (phase === 'initial' || motion.matches) {
        place = destination || 'home';
        change(destination ? 'resting' : 'hidden', time);
        draw(point(place), Boolean(destination));
        return;
      }

      if ((phase === 'resting' || phase === 'entering') && destination !== place) {
        // Keep the departure attached to its section as the page scrolls.
        origin = phase === 'resting' ? point(place) : { ...current, y: current.y - scrollDelta };
        originScroll = scroll;
        travelDirection = nearestSide(origin);
        exitX = outside(origin, travelDirection);
        duration = travelTime(exitX - origin.x);
        change('exiting', time);
      }

      if (phase === 'resting') {
        draw(point(place), true);
      } else if (phase === 'exiting') {
        const progress = Math.min(1, (time - started) / duration);
        draw({ ...origin, x: mix(origin.x, exitX, ease(progress)), y: origin.y - (scroll - originScroll) }, true);
        if (progress === 1) {
          change('hidden', time);
          draw(current, false);
        }
        schedule();
      } else if (phase === 'hidden') {
        if (destination && time - started >= 220) {
          place = destination;
          origin = point(place);
          const side = nearestSide(origin);
          travelDirection = -side;
          const targetX = origin.x;
          origin.x = outside(origin, side);
          duration = travelTime(targetX - origin.x);
          change('entering', time);
          draw(origin, true);
          schedule();
        } else if (destination) schedule();
      } else if (phase === 'entering') {
        const progress = Math.min(1, (time - started) / duration);
        const target = point(place);
        draw({ ...target, x: mix(origin.x, target.x, ease(progress)) }, true);
        if (progress === 1) change('resting', time);
        schedule();
      }
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }
    const observer = new ResizeObserver(schedule);
    Object.values(docks).forEach((dock) => observer.observe(dock));
    const page = document.querySelector('main');
    observer.observe(page);
    page.addEventListener('transitionend', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      page.removeEventListener('transitionend', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
    };
  }, [homeRef, actorRef, onSceneChange]);
}
