/**
 * *Onde foi aplicado: Este padrão é utilizado para encapsular diferentes comportamentos (estratégias) que o jogador pode escolher* 
 * Embora o código ainda não tenha todas
 * as estratégias ativadas, a estrutura já está pronta. As estratégias, como `salvarTodos`
 * ou `salvarIrma`, representam as diferentes ações que o jogador pode tomar.
 *
 * *Como foi implementado:*
 * - As estratégias são definidas como funções separadas (`salvarTodos`, `salvarIrma`, etc.).
 * - Elas recebem o `contexto` (o estado do jogo, `JogoEstado`) como parâmetro.
 *   Isso permite que a estratégia modifique o estado do jogo sem ter que saber
 *   como o estado é gerenciado.
 * - O objeto `Strategies` atua como uma interface pública, expondo apenas as
 *   estratégias que podem ser usadas.
 *
 * *Por que foi escolhido: O padrão Strategy foi escolhido para isolar as variáveis finais do jogo. 
 * a ação é encapsulada em uma "estratégia" própria.Isso permite que você adicione ou remova
 * novas escolhas/ações sem precisar modificar o código principal do jogo. O código
 * `handleEscolhas` em `App.js` simplesmente executa a estratégia que está ligada à escolha do
 * jogador.
 */

const Strategies = (function(){
    
    function salvarTodos(contexto){
      contexto.flags.rescueMode = 'todos';
      contexto.mensagens.push({from:'sistema', text:'Você escolheu tentar salvar todos. Tempo será crítico.'});
      EventBus.publish('mensagemAdicionada');
    }
    function salvarIrma(contexto){
      contexto.flags.rescueMode = 'irmã';
      contexto.mensagens.push({from:'sistema', text:'Você escolheu priorizar sua irmã.'});
      EventBus.publish('mensagemAdicionada');
    }
    function queimarTudo(contexto){
      contexto.flags.rescueMode = 'queimar';
      contexto.mensagens.push({from:'sistema', text:'Você escolheu incendiar o local. Isso trará consequências permanentes.'});
      EventBus.publish('mensagemAdicionada');
    }
  
    return {
        salvarTodos, salvarIrma, queimarTudo
    }
  })();
  
  window.Strategies = Strategies;