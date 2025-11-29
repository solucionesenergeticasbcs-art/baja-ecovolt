# ⚡ INICIO RÁPIDO (2 MINUTOS)

## Ya hecho ✅

- Landing page lista
- Servidor local corriendo
- Git inicializado
- Todo listo para desplegar

## Lo único que necesitas hacer:

### Opción A: Despliegue en Netlify (lo más fácil)
```powershell
npm install -g netlify-cli
netlify login
netlify deploy --prod
```
**Listo en 5 minutos con URL pública.**

### Opción B: GitHub → Netlify (más profesional)
```powershell
# 1. Crear repo en GitHub (https://github.com/new)
git remote add origin https://github.com/TU-USUARIO/baja-ecovolt.git
git branch -M main
git push -u origin main

# 2. En Netlify (app.netlify.com)
# Haz clic "New site from Git" → Selecciona tu repo → Deploy
```
**Listo en 10 minutos, actualizaciones automáticas con git push.**

---

## Después del despliegue (opcional):

1. **Formspree** (capturar leads):
   - Ve a https://formspree.io → Create form
   - Copia endpoint
   - Pégalo en `js/script.js` línea ~4
   - Haz `git add js/script.js && git push`

2. **Personalizar dominio**:
   - En panel de Netlify → Settings → Change site name

---

## Tu sitio estará en línea en:
```
https://baja-ecovolt-abc123.netlify.app
```

¡Felicidades! 🚀☀️
