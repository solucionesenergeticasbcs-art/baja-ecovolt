// Enhanced interactions: year, product selection, lead form, and sales-agent flow
// Configure: si deseas enviar leads automáticamente, pega tu endpoint de Formspree aquí
// Demo endpoint para testing (crea el tuyo en https://formspree.io):
// const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzdefgh'; // Replace with your actual endpoint

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  const leadForm = document.getElementById('lead-form');
  const packageSelect = document.getElementById('package-select');
  const productsGrid = document.getElementById('products-grid');

  function formatMXN(n) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);
  }

  // When user clicks a "Seleccionar" button, prefill the package select and scroll to contact
  productsGrid?.addEventListener('click', function (e) {
    const btn = e.target.closest('.select-package');
    if (!btn) return;
    const card = btn.closest('.product');
    if (!card) return;
    const key = card.dataset.key;
    const price = Number(card.dataset.price || 0);
    // Set select to that option
    const opt = Array.from(packageSelect.options).find(o => o.value === key);
    if (opt) opt.selected = true;
    // Scroll to contact section
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    // Flash a small summary
    const summary = document.createElement('div');
    summary.className = 'thanks-message';
    summary.innerHTML = `<strong>Paquete seleccionado:</strong> ${opt.textContent} — ${formatMXN(price)} <br> Ahora complete sus datos para recibir la cotización.`;
    const formWrap = document.querySelector('.contact-grid');
    formWrap?.prepend(summary);
    setTimeout(() => summary.remove(), 7000);
  });

  // Handle lead form submit: compute 70/30 plan and show summary and (optionally) post to Formspree
  leadForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(leadForm);
    const name = fd.get('name');
    const phone = fd.get('phone');
    const email = fd.get('email');
    const address = fd.get('address');
    const pkg = fd.get('package');
    const selectedOption = packageSelect.querySelector(`option[value="${pkg}"]`);
    const price = Number(selectedOption?.dataset.price || 0);

    const anticipo = Math.round(price * 0.7);
    const resto = price - anticipo;
    const cuota1 = Math.round(resto / 2);
    const cuota2 = resto - cuota1;

    // Summary text
    const message = `Hola ${name},\n\nHemos preparado su cotización para ${selectedOption?.textContent || pkg}: ${formatMXN(price)}.\nAnticipo (70%): ${formatMXN(anticipo)}.\nResto (30%): ${formatMXN(resto)} → Pago 1: ${formatMXN(cuota1)} , Pago 2: ${formatMXN(cuota2)}.\n\nEn breve recibirá un PDF con la cotización al correo ${email}. Para formalizar, contacte a Gaby: +52 1 612 868 7728 o Hugo: +52 1 612 108 9251.`;

    // Si existe FORMSPREE_ENDPOINT configurado, lo usamos para enviar el lead
    if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.length > 5) {
      // Enviar como form data para compatibilidad
      fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: fd })
        .then(r => {
          if (r.ok) {
            alert('Gracias — su solicitud fue enviada. ' + '\n\n' + message);
          } else {
            alert('Error enviando la solicitud al servicio. Se mostró el resumen localmente.');
            alert(message);
          }
        })
        .catch(() => {
          alert('No se pudo conectar al servicio de envío. Se mostró el resumen localmente.');
          alert(message);
        })
        .finally(() => leadForm.reset());
    } else {
      // Demo fallback: mostrar resumen y reset
      alert(message);
      leadForm.reset();
    }
  });

  // SALES AGENT modal logic
  const agentModal = document.getElementById('sales-agent');
  const closeAgent = document.getElementById('close-agent');
  const startQualify = document.getElementById('start-qualify');
  const agentState = document.getElementById('agent-state');
  const agentSteps = agentState ? Array.from(agentState.querySelectorAll('.agent-step')) : [];
  let currentStep = 0;
  const answers = [];

  function showAgent(step) {
    if (!agentModal) return;
    agentModal.setAttribute('aria-hidden', 'false');
    agentSteps.forEach(s => s.style.display = 'none');
    const target = agentSteps.find(s => Number(s.dataset.step) === step);
    if (target) target.style.display = 'block';
    currentStep = step;
    console.log('Showing agent step:', step);
  }

  // Open agent modal via event delegation (more reliable)
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('#open-agent, #open-agent-2');
    if (btn) {
      e.preventDefault();
      showAgent(1);
      console.log('Agent modal opened from button');
    }
  });

  closeAgent?.addEventListener('click', function() {
    agentModal?.setAttribute('aria-hidden', 'true');
    console.log('Agent modal closed');
  });

  // Start qualification
  startQualify?.addEventListener('click', function () {
    answers.length = 0;
    showAgent(2);
    console.log('Qualification started');
  });

  // Handle question buttons
  agentState?.addEventListener('click', function (e) {
    const qbtn = e.target.closest('.qbtn');
    if (!qbtn) return;
    const answer = qbtn.dataset.answer || qbtn.textContent.trim();
    answers.push(answer);
    console.log('Answer selected:', answer);
    if (currentStep < 4) {
      showAgent(currentStep + 1);
    } else {
      showAgent(5);
    }
  });

  // Agent lead form
  const agentLead = document.getElementById('agent-lead');
  agentLead?.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(agentLead);
    const name = fd.get('name');
    const phone = fd.get('phone');
    const email = fd.get('email');
    const address = fd.get('address');
    const customKW = fd.get('custom_kw');

    // Prepare a short summary
    let chosenPackage = packageSelect.options[packageSelect.selectedIndex]?.text || 'Paquete no seleccionado';
    let price = Number(packageSelect.options[packageSelect.selectedIndex]?.dataset.price || 0);

    // If custom kW is provided (25-60 kW), apply 5% discount to base price
    if (customKW && customKW >= 25 && customKW <= 60) {
      // Base cost per kW: $17,843
      const basePricePerKW = 17843;
      price = Math.round(basePricePerKW * customKW * 1.16); // Include 16% IVA
      // Apply 5% discount for large systems
      price = Math.round(price * 0.95);
      chosenPackage = `Sistema personalizado ${customKW} kW`;
    }

    const anticipo = Math.round(price * 0.7);
    const resto = price - anticipo;
    const cuota1 = Math.round(resto / 2);
    const cuota2 = resto - cuota1;

    const summaryEl = document.getElementById('agent-summary');
    let discountNote = customKW && customKW >= 25 && customKW <= 60 ? '<br><strong style="color: #0ea5a4;">✓ Descuento adicional 5% aplicado para sistema personalizado</strong>' : '';
    summaryEl.innerHTML = `Gracias ${name}. Cotización: <strong>${chosenPackage}</strong> — ${formatMXN(price)}.<br>Anticipo (70%): <strong>${formatMXN(anticipo)}</strong>. Resto: ${formatMXN(resto)} (2 pagos: ${formatMXN(cuota1)} y ${formatMXN(cuota2)}).${discountNote}`; 

    // If FORMSPREE_ENDPOINT is set, send this lead there as well
    if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.length > 5) {
      fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: fd })
        .then(r => {
          if (!r.ok) console.warn('Formspree response not ok', r.status);
        })
        .catch(err => console.warn('Error posting agent lead', err))
        .finally(() => {
          currentStep = 6;
          showAgent(currentStep);
          console.log('Agent lead collected:', { name, phone, email, address, answers });
          agentLead.reset();
        });
    } else {
      currentStep = 6;
      showAgent(currentStep);
      console.log('Agent lead collected:', { name, phone, email, address, answers });
      agentLead.reset();
    }
  });

  // Close after confirmation
  document.getElementById('agent-close-done')?.addEventListener('click', function () {
    agentModal?.setAttribute('aria-hidden', 'true');
  });

  // CALCULATOR: Solar consumption calculator with WhatsApp integration
  const calculatorForm = document.getElementById('calculator-form');
  const calcResult = document.getElementById('calc-result');
  const resultText = document.getElementById('result-text');
  const whatsappLink = document.getElementById('whatsapp-link');

  const WHATSAPP_NUMBER = '6122138429'; // WhatsApp number for contact
  const HIS_BCS = 5.9; // Horas de Irradiancia Solar en Baja California Sur
  
  // Calculate required kW based on monthly consumption and HIS
  function recommendSystem(consumption) {
    // Formula: kW requerido = Consumo mensual (kWh) / (HIS * 30 días)
    const requiredKW = consumption / (HIS_BCS * 30);
    let recommendation;

    if (requiredKW <= 3.5) {
      recommendation = { kw: '3kW', name: 'Sistema 3 kW', price: 62091, paneles: 6, calc: requiredKW.toFixed(2) };
    } else if (requiredKW <= 4.5) {
      recommendation = { kw: '4kW', name: 'Sistema 4 kW', price: 82982, paneles: 8, calc: requiredKW.toFixed(2) };
    } else if (requiredKW <= 5.5) {
      recommendation = { kw: '5kW', name: 'Sistema 5 kW', price: 103633, paneles: 10, calc: requiredKW.toFixed(2) };
    } else if (requiredKW <= 6.5) {
      recommendation = { kw: '6kW', name: 'Sistema 6 kW', price: 124284, paneles: 12, calc: requiredKW.toFixed(2) };
    } else if (requiredKW <= 7.5) {
      recommendation = { kw: '7kW', name: 'Sistema 7 kW', price: 145207, paneles: 14, calc: requiredKW.toFixed(2) };
    } else {
      recommendation = { kw: '8kW', name: 'Sistema 8 kW', price: 166130, paneles: 16, calc: requiredKW.toFixed(2) };
    }
    return recommendation;
  }

  calculatorForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const consumption = Number(document.getElementById('consumption').value);
    const name = document.getElementById('calc-name').value;
    const recommendation = recommendSystem(consumption);

    const anticipo = Math.round(recommendation.price * 0.7);
    const resto = recommendation.price - anticipo;

    const resultHTML = `
      <strong>${name}</strong>, basado en tu consumo de <strong>${consumption} kWh/mes</strong> y considerando <strong>5.9 HIS</strong> en Baja California Sur:<br><br>
      <strong>${recommendation.name}</strong> (${recommendation.calc} kW calculado) — ${recommendation.paneles} paneles<br>
      Precio: <strong>${formatMXN(recommendation.price)}</strong><br>
      Con 10% descuento incluido.<br><br>
      Plan 70/30:<br>
      • Anticipo: ${formatMXN(anticipo)}<br>
      • Resto: ${formatMXN(resto)} en 2 cuotas
    `;
    resultText.innerHTML = resultHTML;

    // Generate WhatsApp message
    const whatsappMessage = `Hola, soy ${name}. Mi consumo mensual es de ${consumption} kWh/mes. Basado en 5.9 HIS en BCS, me interesa el ${recommendation.name} (${recommendation.paneles} paneles) con precio de ${formatMXN(recommendation.price)} con 10% descuento. Plan 70/30: Anticipo ${formatMXN(anticipo)}, Resto ${formatMXN(resto)} en 2 pagos. ¿Pueden enviarme más información?`;
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    whatsappLink.href = whatsappURL;
    calcResult.style.display = 'block';
    calcResult.scrollIntoView({ behavior: 'smooth' });
  });
});
