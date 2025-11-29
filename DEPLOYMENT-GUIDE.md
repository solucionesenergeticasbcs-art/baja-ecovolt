# 🚀 DESPLIEGUE FINAL: BAJA eco-volt Landing Page

## Estado Actual ✅

Tu landing page está **100% lista para producción**:

- ✅ Sitio corriendo localmente en `http://localhost:5500`
- ✅ Git inicializado y primer commit completado
- ✅ Estructura Netlify configurada (`netlify.toml`)
- ✅ Formularios listos para Netlify Forms + Formspree
- ✅ Diseño profesional con animaciones
- ✅ Agente de ventas interactivo (Ricardo)
- ✅ Cálculo Plan 70/30 automático

---

## 🎯 Opción 1: Despliegue Rápido con Netlify CLI (RECOMENDADO)

### Paso 1: Instalar Netlify CLI
```powershell
npm install -g netlify-cli
```

### Paso 2: Autenticación en Netlify
```powershell
netlify login
```
Se abrirá tu navegador. Inicia sesión o crea una cuenta Netlify (gratis).

### Paso 3: Desplegar
```powershell
cd "c:\Users\User\Nueva carpeta"
netlify deploy --prod
```

**Resultado**: Tu sitio estará en línea con URL como: `https://baja-ecovolt-abc123.netlify.app`

### ⏱️ Tiempo total: ~5 minutos

---

## 🐙 Opción 2: GitHub + Netlify UI (Más Control)

### Paso 1: Crear Repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repo: `baja-ecovolt`
3. Descripción: `Landing page de ventas - BAJA eco-volt`
4. ✅ Public (para desplegar en Netlify)
5. Haz clic en "Create repository"

### Paso 2: Subir código a GitHub
```powershell
cd "c:\Users\User\Nueva carpeta"
git remote add origin https://github.com/TU-USUARIO/baja-ecovolt.git
git branch -M main
git push -u origin main
```

### Paso 3: Desplegar en Netlify
1. Ve a https://app.netlify.com
2. Haz clic en "New site from Git"
3. Selecciona "GitHub"
4. Autoriza Netlify si es la primera vez
5. Selecciona tu repo `baja-ecovolt`
6. Netlify detectará automáticamente la configuración
7. Haz clic en "Deploy site"

**Resultado**: Despliegue automático cada vez que hagas `git push` 🎉

### ⏱️ Tiempo total: ~10 minutos (incluye setup GitHub)

---

## 📧 Paso 4: Configurar Formspree (Opcional pero Recomendado)

### Si quieres capturar leads automáticamente:

1. Ve a https://formspree.io
2. Crea una cuenta (gratis)
3. Haz clic en "New Form"
4. Nombra: `baja-ecovolt-leads`
5. Copia el endpoint que te genera (ej: `https://formspree.io/f/xyzabc123`)
6. Abre `js/script.js` en tu editor
7. Busca la línea:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzdefgh';
   ```
8. Reemplaza con tu endpoint real
9. Haz `git add js/script.js` y `git commit -m "Update Formspree endpoint"`
10. Haz `git push`

**Netlify reempliegará automáticamente** en ~30 segundos ⚡

---

## 📊 Verificación Post-Despliegue

Después de desplegar, verifica:

### ✅ El sitio carga correctamente
- Abre tu URL de Netlify
- Verifica que veas el logo, hero y productos
- Prueba los botones (hamburguesa en móvil, etc.)

### ✅ El agente de ventas funciona
- Haz clic en "Hablar con Ricardo"
- Completa las 3 preguntas
- Verifica que el cálculo 70/30 sea correcto

### ✅ Los formularios capturan datos
- Completa el formulario de contacto
- Verifica que los datos lleguen a:
  - **Netlify Forms**: Panel de Netlify → Forms tab
  - **Formspree**: Tu dashboard de Formspree (si configuraste)

### ✅ Mobile looks good
- Abre en móvil (o usa F12 → device mode)
- Verifica que el design se vea bien en 320px+

---

## 🎨 Personalización Post-Despliegue

### Cambiar colores
Edita `css/styles.css`:
```css
:root {
  --accent: #0ea5a4;        /* Cambiar a tu color principal */
  --dark: #063854;          /* Cambiar a tu color oscuro */
}
```

### Cambiar teléfonos de contacto
Edita `index.html` y busca:
- `+52 1 612 868 7728` (Gaby)
- `+52 1 612 108 9251` (Hugo)

Reemplaza con tus números, haz `git push` y Netlify redepliegue automáticamente.

### Añadir más paquetes solares
Edita la sección `#products` en `index.html` y duplica una tarjeta de producto.

---

## 📱 URL Personalizada (Dominio)

Si quieres una URL propia (ej: `www.bajaecovolt.mx`):

1. En el panel de Netlify, ve a "Site settings"
2. Haz clic en "Change site name"
3. Cambia a tu nombre deseado
4. O conecta un dominio personalizado (requiere compra de dominio)

---

## 🆘 Troubleshooting

### "netlify-cli no se encuentra"
```powershell
npm install -g netlify-cli --force
```

### "Los formularios no envían"
- Verifica que `FORMSPREE_ENDPOINT` esté bien configurado en `js/script.js`
- O usa Netlify Forms (funciona automáticamente sin configuración)

### "Git push falla"
- Verifica credenciales: `git config --list`
- Usa token de GitHub en lugar de contraseña (GitHub + 2FA)

### "Cambios no se ven después de git push"
- Espera 30-60 segundos a que Netlify redepliegue
- Hard refresh en navegador: `Ctrl+Shift+R`

---

## 🎯 Próximos pasos opcionales

1. **Analytics**: Conecta Google Analytics en Netlify
2. **Forms avanzadas**: Configura notificaciones por correo en Netlify Forms
3. **A/B Testing**: Netlify soporta deploy previews para testing
4. **SSL/HTTPS**: Incluido automáticamente (certificado gratis)
5. **CDN Global**: Netlify sirve tu sitio desde servidores en todo el mundo 🌍

---

## 📞 Contacto & Soporte

- **Netlify Docs**: https://docs.netlify.com
- **Formspree Docs**: https://formspree.io/docs
- **GitHub Pages**: https://pages.github.com
- **Contacto BAJA eco-volt**: solucionesenergeticasbcs@gmail.com

---

**¡Tu landing page está lista para conquistar clientes! 🚀☀️💚**
