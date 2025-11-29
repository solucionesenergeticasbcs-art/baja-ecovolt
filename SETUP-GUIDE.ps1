# BAJA eco-volt Landing - Setup & Deployment Guide (PowerShell)

# 1. VER LOCALMENTE
Write-Host "🌐 Para ver el sitio localmente, elige una opción:" -ForegroundColor Cyan

Write-Host "`n✅ Opción A: Python 3 (recomendado, la mayoría lo tiene)" -ForegroundColor Green
Write-Host "python -m http.server 5500; Start-Process 'http://localhost:5500'" -ForegroundColor Gray

Write-Host "`n✅ Opción B: Node.js" -ForegroundColor Green
Write-Host "npx http-server -c-1 -p 5500" -ForegroundColor Gray

# 2. CONFIGURAR FORMSPREE (opcional para capturar leads online)
Write-Host "`n📧 Para capturar leads con Formspree:" -ForegroundColor Cyan
Write-Host "1. Ve a https://formspree.io" -ForegroundColor Gray
Write-Host "2. Crea un formulario nuevo" -ForegroundColor Gray
Write-Host "3. Copia el endpoint (ej: https://formspree.io/f/xxxxxxxx)" -ForegroundColor Gray
Write-Host "4. Abre js/script.js y busca: const FORMSPREE_ENDPOINT = ''" -ForegroundColor Gray
Write-Host "5. Pega tu endpoint ahí" -ForegroundColor Gray

# 3. DESPLEGAR EN NETLIFY
Write-Host "`n🚀 Para desplegar en Netlify:" -ForegroundColor Cyan
Write-Host "1. Crea un repo en GitHub con este código" -ForegroundColor Gray
Write-Host "2. Ve a https://app.netlify.com" -ForegroundColor Gray
Write-Host "3. Haz clic en 'New site from Git'" -ForegroundColor Gray
Write-Host "4. Selecciona tu repo" -ForegroundColor Gray
Write-Host "5. Netlify detectará y desplegará automáticamente" -ForegroundColor Gray
Write-Host "6. Los formularios enviarán a Netlify Forms automáticamente" -ForegroundColor Gray

# 4. INICIALIZAR GIT (si no lo has hecho)
Write-Host "`n🔧 Inicializar Git:" -ForegroundColor Cyan
Write-Host "git init" -ForegroundColor Gray
Write-Host "git add ." -ForegroundColor Gray
Write-Host "git commit -m 'Initial commit: BAJA eco-volt landing'" -ForegroundColor Gray
Write-Host "git remote add origin https://github.com/TU-USUARIO/baja-ecovolt.git" -ForegroundColor Gray
Write-Host "git branch -M main" -ForegroundColor Gray
Write-Host "git push -u origin main" -ForegroundColor Gray

Write-Host "`n✨ ¡Tu sitio está listo!" -ForegroundColor Green
