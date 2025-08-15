const JogoEstado = (function () {
  let instancia;

  function create() {
    return {
      nomeJogador: "Protagonista",
      capitulo: "intro",
      escolhas: {},
      flags: {},
      mensagens: [],
      ending: null,
    };
  }

  return {
    getInstancia: function () {
      if (!instancia) instancia = create();
      return instancia;
    },
    reset: function () {
      instancia = create();
      return instancia;
    },
  };
})();

window.JogoEstado = JogoEstado;
