/**
 * *Onde foi aplicado: Este padrão foi aplicado para gerenciar o estado central do jogo.*
 * O `JogoEstado` representa todas as informações relevantes do jogo em um único lugar,
 * como o nome do jogador, o capítulo atual, escolhas feitas, etc.
 * 
 * *Como foi implementado: A implementação utiliza uma IIFE para criar um escopo fechado.*
 * - A variável `instancia` é privada e só pode ser acessada através da função `getInstancia`.
 * - O método `getInstancia` verifica se a `instancia` já existe. Se não, ele a cria. 
 * Isso garante que, não importa quantas vezes a função seja chamada, ela sempre 
 * retornará a mesma e única instância do estado do jogo.
 * - O método `reset` foi adicionado para permitir que o estado seja reiniciado,
 * o que seria útil para começar um novo jogo.
 * 
 * *Por que foi escolhido: O padrão Singleton foi escolhido porque o estado do jogo é um recurso global e único.*
 * - Não faz sentido ter múltiplas instâncias do estado do jogo
 * coexistindo. 
 * - Ao garantir que existe apenas uma instância, evitamos inconsistências
 * e facilitamos o acesso a informações globais de qualquer parte da aplicação.
 */

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
