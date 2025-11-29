# BAJA eco-volt — Landing Page de Ventas

Landing page moderna y responsiva para BAJA eco-volt con sistema de agente de ventas interactivo, catálogo de productos y captura de leads.

## Características

- ✅ **Agente de ventas interactivo (Ricardo)**: Chatbot que guía al cliente a través de 3 preguntas clave.
- ✅ **Catálogo de paquetes solares**: 6 opciones (3–8 kW) con precios incluyendo 10% descuento.
- ✅ **Cálculo Plan 70/30**: Anticipo 70% + resto en 2 pagos automáticos.
- ✅ **Baterías LiFePO4**: Sección dedicada a características técnicas.
- ✅ **Formularios integrados**: Compatibles con Netlify Forms y Formspree.
- ✅ **Diseño responsivo**: Mobile-first, optimizado para todos los tamaños.
- ✅ **SVG heroes**: Ilustraciones personalizadas para energía solar.

## Estructura de archivos

```
├── index.html              # Página principal
├── css/styles.css          # Estilos (4.5 KB, optimizado)
├── js/script.js            # Lógica del agente y formularios
├── assets/
│   ├── solar-hero.svg      # Hero illustration
│   └── favicon.svg         # Favicon
├── netlify.toml            # Configuración Netlify
├── .gitignore              # Git ignore patterns
└── README.md               # Este archivo
```

## Inicio rápido (local)

### Opción 1: Python 3 (PowerShell)
```powershell
python -m http.server 5500; Start-Process "http://localhost:5500"
```

### Opción 2: Node.js
```bash
npx http-server -c-1 -p 5500
```

Luego abre el navegador en `http://localhost:5500`.

## Configuración (Captura de leads)

### 📧 Opción A: Formspree (recomendado para empezar)

1. Regístrate en [formspree.io](https://formspree.io)
2. Crea un nuevo formulario y obtén el endpoint: `https://formspree.io/f/xxxxxxxx`
3. Abre `js/script.js` y busca la línea:
   ```javascript
   const FORMSPREE_ENDPOINT = '';
   ```
4. Pega tu endpoint:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
   ```
5. Guarda y prueba. Los formularios enviarán automáticamente a Formspree.

**Nota**: Si no configuras el endpoint, los formularios siguen funcionando localmente (muestran resumen en pantalla).

### 🌐 Opción B: Netlify Forms (incluido en despliegue Netlify)

Si despliegas en Netlify:
1. Los formularios (`#lead-form` y `#agent-lead`) serán detectados automáticamente gracias a `data-netlify="true"`.
2. Los envíos aparecerán en la sección "Forms" del panel de Netlify.
3. Opcionalmente, configura notificaciones por correo en el panel de Netlify.

**Ventaja**: No requiere configuración adicional; Netlify maneja todo.

## Despliegue

### 🚀 Netlify (opción rápida)

1. **Crear un repo en GitHub**:
   ```powershell
   # en la carpeta del proyecto
   git init
   git add .
   git commit -m "Initial commit: BAJA eco-volt landing"
   git remote add origin https://github.com/tu-usuario/baja-ecovolt.git
   git branch -M main
   git push -u origin main
   ```

2. **Conectar en Netlify**:
   - Ve a [app.netlify.com](https://app.netlify.com)
   - Haz clic en "New site from Git"
   - Selecciona tu repo de GitHub
   - Netlify detectará la configuración (no requiere build)
   - Haz clic en "Deploy site"

3. **Tu sitio estará en línea** en un URL como: `https://baja-ecovolt-abc123.netlify.app`

### Vercel (alternativa)

1. Conecta tu repo en [vercel.com](https://vercel.com)
2. Vercel desplegará automáticamente
3. Para formularios, integra manualmente Formspree o usa una función serverless

## Personalización

### Cambiar colores

En `css/styles.css`, edita las variables CSS:
```css
:root {
  --accent: #0ea5a4;      /* Teal (botones, acentos) */
  --dark: #063854;        /* Navy (títulos) */
  --accent-dark: #0d7d7a; /* Darker teal (hover) */
}
```

### Actualizar precios de paquetes

En `index.html`, busca la sección `#products` y edita los atributos `data-price` en cada tarjeta.

### Cambiar contactos de formalización

En `index.html`, busca los teléfonos de Gaby y Hugo en la sección `#contact` y en el modal del agente (`#agent-lead`).

## Variables de entorno (opcional)

Si en el futuro necesitas variables sensibles (claves de API, etc.), crea un archivo `.env`:
```
FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

**Nota**: Este archivo NO debe ser commitido a Git. Ya está en `.gitignore`.

## Optimizaciones incluidas

- **CSS minificado**: ~4.5 KB (sin gzip)
- **SVG en lugar de imágenes**: Reduce tamaño y permite escalado infinito
- **Lazy loading**: Imágenes cargan bajo demanda
- **Smooth scrolling**: Navegación fluida
- **Mobile-first**: Diseño responsive desde 320px

## SEO Básico

El sitio incluye:
- Meta tags (title, description, og:title, og:description)
- Favicon personalizado
- Estructura semántica HTML5
- Fast load times (<2s en conexiones normales)

## Soporte y mantenimiento

- **Cambios en el contenido**: Edita `index.html` directamente
- **Cambios de estilos**: Modifica `css/styles.css`
- **Cambios en la lógica**: Edita `js/script.js`
- **Redeploy**: Simplemente haz `git push` y Netlify redeploya automáticamente

## Roadmap futuro (opcional)

- [ ] Agregar blog con artículos sobre energía solar
- [ ] Integrar con Calendly para agendar auditorías
- [ ] Dashboard de seguimiento para leads
- [ ] Certificaciones dinámicas (EC0586.01, EC1181)
- [ ] WhatsApp Business API para chat en vivo

## License

Este proyecto es de BAJA eco-volt. Todos los derechos reservados.

---

**¿Preguntas?** Revisa el archivo `index.html` para contactos o comunícate con el equipo de formalización:
- Gaby: +52 1 612 868 7728
- Hugo: +52 1 612 108 9251
- Emails: solucionesenergeticasbcs@gmail.com

