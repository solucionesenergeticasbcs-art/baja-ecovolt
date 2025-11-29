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
  const openAgentBtns = document.querySelectorAll('#open-agent, #open-agent-2');
  const agentModal = document.getElementById('sales-agent');
  const closeAgent = document.getElementById('close-agent');
  const startQualify = document.getElementById('start-qualify');
  const agentState = document.getElementById('agent-state');
  const agentSteps = agentState ? Array.from(agentState.querySelectorAll('.agent-step')) : [];
  let currentStep = 0;
  const answers = [];

  function showAgent(step) {
    agentModal?.setAttribute('aria-hidden', 'false');
    agentSteps.forEach(s => (s.style.display = 'none'));
    const target = agentSteps.find(s => Number(s.dataset.step) === step);
    if (target) target.style.display = 'block';
  }

  openAgentBtns.forEach(b => b?.addEventListener('click', () => { showAgent(1); currentStep = 1; }));
  closeAgent?.addEventListener('click', () => agentModal?.setAttribute('aria-hidden', 'true'));

  // Start qualification
  startQualify?.addEventListener('click', function () {
    answers.length = 0;
    currentStep = 2;
    showAgent(currentStep);
  });

  // Handle question buttons
  agentState?.addEventListener('click', function (e) {
    const qbtn = e.target.closest('.qbtn');
    if (!qbtn) return;
    answers.push(qbtn.dataset.answer || qbtn.textContent.trim());
    if (currentStep < 4) {
      currentStep += 1;
      showAgent(currentStep);
    } else {
      // move to lead capture
      currentStep = 5;
      showAgent(currentStep);
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

    // Prepare a short summary
    const chosenPackage = packageSelect.options[packageSelect.selectedIndex]?.text || 'Paquete no seleccionado';
    const price = Number(packageSelect.options[packageSelect.selectedIndex]?.dataset.price || 0);
    const anticipo = Math.round(price * 0.7);
    const resto = price - anticipo;
    const cuota1 = Math.round(resto / 2);
    const cuota2 = resto - cuota1;

    const summaryEl = document.getElementById('agent-summary');
    summaryEl.innerHTML = `Gracias ${name}. Cotización: <strong>${chosenPackage}</strong> — ${formatMXN(price)}.<br>Anticipo (70%): <strong>${formatMXN(anticipo)}</strong>. Resto: ${formatMXN(resto)} (2 pagos: ${formatMXN(cuota1)} y ${formatMXN(cuota2)}).`; 

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
});
