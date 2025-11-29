#!/bin/bash
# Setup script for BAJA eco-volt landing page
# This script initializes git and prepares the project for deployment

echo "🌞 Inicializando BAJA eco-volt landing page..."

# Initialize git if not already done
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit: BAJA eco-volt landing page"
  echo "✅ Git initialized"
else
  echo "⚠️  Git ya está inicializado"
fi

# Create a local .env file for development (not committed)
if [ ! -f .env ]; then
  cat > .env << EOF
# Formspree endpoint - uncomment and add your endpoint if needed
# FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx

# For local testing, leave empty - forms will show alert summaries
FORMSPREE_ENDPOINT=
EOF
  echo "✅ .env file created (for reference)"
fi

echo ""
echo "📝 Próximos pasos:"
echo "1. Para ver localmente: python -m http.server 5500"
echo "2. Para configurar Formspree:"
echo "   - Crea una forma en https://formspree.io"
echo "   - Copia el endpoint en js/script.js (línea ~1)"
echo "3. Para desplegar en Netlify:"
echo "   - Sube el código a GitHub"
echo "   - Conecta el repo en app.netlify.com"
echo ""
echo "¡Listo! 🚀"
