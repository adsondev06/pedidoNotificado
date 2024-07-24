document.addEventListener('DOMContentLoaded', () => {
  const pedidoForm = document.getElementById('pedido-form');
  const confirmacao = document.getElementById('confirmacao');
  const senhaSpan = document.getElementById('senha');
  const timerSpan = document.getElementById('timer');

  let timerInterval;

  function iniciarTimer(duration) {
    let timer = duration / 1000;
    timerInterval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      timerSpan.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (--timer < 0) {
        clearInterval(timerInterval);
        timerSpan.textContent = 'Tempo esgotado!';
      }
    }, 1000);
  }

  function exibirConfirmacao(senha) {
    if (confirmacao && senhaSpan && timerSpan) {
      senhaSpan.textContent = senha;
      confirmacao.style.display = 'block';
      iniciarTimer(10 * 60 * 1000); // 10 minutos
    }
  }

  if (pedidoForm) {
    pedidoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(pedidoForm);
      const nome = formData.get('nome');
      const item = formData.get('item');
      const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
      const id = pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1;

      pedidos.push({ id, nome, item, senha: null, timer: null });
      localStorage.setItem('pedidos', JSON.stringify(pedidos));

      pedidoForm.reset();
    });
  }

  function verificarPedidoConfirmado() {
    const senhaPedido = localStorage.getItem('senhaPedido');
    if (senhaPedido) {
      exibirConfirmacao(senhaPedido);
      localStorage.removeItem('senhaPedido');
    }
  }

  setInterval(verificarPedidoConfirmado, 3000); // Verifica a cada 3 segundos
});
