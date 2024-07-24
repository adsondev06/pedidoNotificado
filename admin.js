document.addEventListener('DOMContentLoaded', () => {
  const pedidosDiv = document.getElementById('pedidos');

  function gerarSenha() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  function atualizarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidosDiv.innerHTML = '';
    pedidos.forEach(pedido => {
      const pedidoDiv = document.createElement('div');
      pedidoDiv.classList.add('pedido');
      pedidoDiv.innerHTML = `
        <span>${pedido.nome} - ${pedido.item}</span>
        <span>Senha: ${pedido.senha || 'Não gerada'}</span>
        <button onclick="aceitarPedido(${pedido.id})">${pedido.senha ? 'Notificar Cliente' : 'Aceitar'}</button>
      `;
      pedidosDiv.appendChild(pedidoDiv);
    });
  }

  window.aceitarPedido = function(id) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
      pedido.senha = gerarSenha();
      pedido.timer = 10 * 60 * 1000; // 10 minutos
      localStorage.setItem('pedidos', JSON.stringify(pedidos));

      // Enviar senha para a tela de compra
      localStorage.setItem('senhaPedido', pedido.senha);

      atualizarPedidos();
    }
  };

  atualizarPedidos();
  setInterval(atualizarPedidos, 5000);
});
