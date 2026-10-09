# Dominio del portafolio

URL principal: https://camilogonzalez.dev/

El sitio se despliega en Vercel y el DNS se administra en Cloudflare.
Los metadatos de `index.html`, `public/robots.txt` y `public/sitemap.xml`
usan este dominio. Vite copia los archivos de `public/` al directorio `dist/`.

## Conectar el dominio

1. En el proyecto de Vercel, abrir **Settings → Domains** y añadir
   `camilogonzalez.dev` al entorno de producción.
2. Añadir también `www.camilogonzalez.dev` al mismo proyecto.
   `vercel.json` configura su redirección permanente a `camilogonzalez.dev`
   (sin www), conservando la ruta y los parámetros de consulta.
3. En Cloudflare, seleccionar `camilogonzalez.dev` y abrir **DNS → Records**.
   Copiar los valores exactos que muestre Vercel para cada dominio:

   | Tipo | Nombre en Cloudflare | Valor |
   | --- | --- | --- |
   | A | `@` | IP indicada por Vercel para el dominio raíz |
   | CNAME | `www` | Destino indicado por Vercel para www |

   Usar **DNS only** (nube gris) y TTL **Auto** para ambos registros.
   Si ya existe un registro web incompatible para `@` o `www`, corregirlo
   en lugar de duplicarlo. Conservar los registros de correo y verificación.
   Mantener los nameservers de Cloudflare.
4. Si Vercel solicita verificar la propiedad con un registro TXT, añadir
   exactamente el nombre y contenido que indique.
5. Esperar a que Vercel muestre **Valid Configuration** y comprobar que
   `https://camilogonzalez.dev/` carga con un certificado HTTPS válido.
6. Publicar estos cambios en la rama de producción conectada a Vercel.

El dominio provisional `juancamilo-nine.vercel.app` fue eliminado de Vercel.
No se espera que cargue ni redirija. Para recuperar enlaces antiguos habría
que volver a añadirlo al proyecto y configurar su redirección al dominio principal.

## Verificación después del despliegue

- El dominio principal carga el portafolio por HTTPS.
- `www.camilogonzalez.dev` redirige al principal.
- El HTML publicado contiene la URL canónica y las imágenes sociales del dominio nuevo.
- `/social-card.png`, `/robots.txt` y `/sitemap.xml` responden correctamente.
- Si se utiliza Google Search Console, verificar la propiedad del dominio
  mediante el TXT que proporcione Google y enviar `https://camilogonzalez.dev/sitemap.xml`.

## Referencias

- [Configurar un dominio en Vercel](https://vercel.com/docs/domains/set-up-custom-domain)
- [Redirecciones entre dominios en Vercel](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)
- [Administrar registros DNS en Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
- [Cloudflare delante de Vercel](https://vercel.com/kb/guide/cloudflare-with-vercel)
