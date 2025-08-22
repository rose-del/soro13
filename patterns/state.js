/** 
 * *Onde foi aplicado: O padrão State é usado para gerenciar os diferentes "estados" do jogo*
 * que neste caso são os blocos de diálogos e escolhas (como 'intro', 'bloco2A', etc.).
 * O `GerenciadorState` orquestra a transição entre esses estados.
 *
 * *Como foi implementado:*
 * - O `GerenciadorState` mantém um mapa (`states`) onde cada chave é o nome de um estado
 *   e o valor é a função (`handler`) que contém a lógica para aquele estado.
 * - O método `register` é usado para adicionar um novo estado ao mapa.
 * - O método `go` é a chave do padrão. Ele altera o `estadoAtual` para o novo nome
 *   e, em seguida, executa a função de tratamento (handler) correspondente.
 * - O `EventBus` é utilizado aqui para publicar o evento `estadoAlterado`,
 *   informando a outros componentes que a transição de estado ocorreu.
 *
 * *Por que foi escolhido: O padrão State foi escolhido para organizar a complexa lógica de navegação do jogo.* 
 * Em vez de ter uma grande e complicada função `if/else`
 * ou `switch` para gerenciar as transições, cada estado é encapsulado em sua própria
 * função. Isso torna o código mais limpo, fácil de entender e de dar manutenção.
 * Adicionar um novo bloco de diálogo é tão simples quanto registrar um novo estado.
 *
*/

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
