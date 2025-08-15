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