function clearContainer(containerId) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}

function createCard(containerId, content, className = 'card') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const card = document.createElement('div');
  card.className = className;
  card.innerHTML = content;
  container.appendChild(card);
}

async function getBanks() {
  try {
    const res = await fetch('/banks');
    if (!res.ok) throw new Error('Error en la respuesta');
    const data = await res.json();

    clearContainer('banksContainer');

    if (!data || data.length === 0) {
      createCard('banksContainer', 'No se encontraron bancos.', 'card-bank');
      return;
    }

    data.forEach(bank => {
      createCard(
        'banksContainer',
        `<strong>${bank.name}</strong><br>ID: ${bank.id}<br>Código: ${bank.code}`,
        'card-bank'
      );
    });

  } catch (err) {
    clearContainer('banksContainer');
    createCard('banksContainer', 'Error al obtener bancos.', 'card-bank');
    console.error(err);
  }
}

async function createPayment() {
  const amount = document.getElementById('amountInput').value;
  const currency = document.getElementById('currencyInput').value.toUpperCase();
  const subject = document.getElementById('subjectInput').value;

  if (!amount || !currency || !subject) {
    alert('Completa todos los campos para crear el pago');
    return;
  }

  try {
    const res = await fetch('/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Number(amount), currency, subject })
    });
    const data = await res.json();

    if (data.error) {
      alert('Error creando el pago: ' + data.error);
      return;
    }

    // Crear tarjeta verde con info del pago creado
    const container = document.getElementById('paymentContainer');
    const card = document.createElement('div');
    card.className = 'card card-payment-post';
    card.innerHTML = `
      <h3>Pago Creado</h3>
      <p><strong>ID:</strong> ${data.payment_id}</p>
      <p><strong>Monto:</strong> ${amount} ${currency}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <a href="${data.payment_url}" target="_blank">Ver Pago</a>
    `;
    container.prepend(card);

    // Limpia inputs
    document.getElementById('amountInput').value = '';
    document.getElementById('currencyInput').value = '';
    document.getElementById('subjectInput').value = '';

  } catch (err) {
    alert('Error al crear el pago');
  }
}

async function getPaymentDetail() {
  const id = document.getElementById('paymentIdInput').value;
  if (!id) return alert('Ingresa un ID de pago');

  try {
    const res = await fetch(`/payments/${id}`);
    const data = await res.json();

    if (data.error) {
      alert('Error al obtener detalle: ' + data.error);
      return;
    }

    const container = document.getElementById('paymentContainer');
    const card = document.createElement('div');
    card.className = 'card card-payment-post';
    card.innerHTML = `
      <h3>Detalle del Pago</h3>
      <p><strong>ID:</strong> ${data.payment_id}</p>
      <p><strong>Monto:</strong> ${data.amount} ${data.currency}</p>
      <p><strong>Asunto:</strong> ${data.subject}</p>
      <p><strong>Estado:</strong> ${data.status}</p>
      <a href="${data.payment_url}" target="_blank">Ver Pago</a>
    `;
    container.prepend(card);

  } catch (err) {
    alert('Error al obtener el detalle del pago');
  }
}


async function deletePayment() {
  const id = document.getElementById('paymentIdInput').value;
  if (!id) {
    createCard('paymentContainer', 'Ingresa un ID de pago.', 'card-payment-delete');
    return;
  }
  try {
    const res = await fetch(`/delete-payment/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();

    createCard(
      'paymentContainer',
      `<strong>Pago eliminado</strong><br>ID: ${id}`,
      'card-payment-delete'
    );

  } catch (err) {
    createCard('paymentContainer', 'Error al eliminar el pago.', 'card-payment-delete');
  }
}
