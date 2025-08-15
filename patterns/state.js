function GerenciadorState() {
  const states = {};
  let estadoAtual = null;

  return {
    register: function (nome, handler) {
      states[nome] = handler;
    },
    go: function (nome, payload) {
      estadoAtual = nome;
      if (states[nome]) states[nome](payload);
      EventBus.publish("estadoAlterado", { state: nome, payload });
    },
    estadoAtual: function () {
      return estadoAtual;
    },
  };
}

window.GerenciadorState = GerenciadorState;
