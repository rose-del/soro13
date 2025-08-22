/**
 * *Onde foi aplicado: Este padrão foi aplicado para desacoplar a lógica de eventos do jogo.*
 * O EventBus atua como um hub central para onde os componentes podem "publicar" eventos
 *  e "assinar" para serem notificados quando um evento de seu interesse acontece.
 * 
 * *Como foi implementado: A implementação utiliza uma IIFE (Immediately Invoked Function Expression)*
 * para criar um escopo privado. A variável `topicos` armazena os eventos e seus respectivos
 * ouvintes (funções).
 * - O método `subscribe` permite que um ouvinte se "assine" a um tópico. Se o tópico
 * ainda não existir, ele é criado como um array. O ouvinte é então adicionado a esse array.
 *   Este método retorna uma função de "desinscrição" para facilitar a remoção do ouvinte.
 * - O método `publish` percorre todos os ouvintes de um tópico específico e os executa,
 *   passando os dados do evento.
 *
 * *Por que foi escolhido: O padrão Observer foi escolhido para tornar a aplicação mais modular e menos acoplada.* 
 * Por exemplo, quando o estado do jogo muda ou uma mensagem é adicionada,
 * o `App.js` não precisa saber quem precisa ser notificado (como a função de renderização).
 * Ele simplesmente publica um evento (`estadoAlterado` ou `mensagemAdicionada`), e qualquer
 * componente interessado (como a função `renderizarMensagem`) pode reagir a essa mudança.
 * Isso evita que o `App.js` tenha que gerenciar manualmente todas as dependências,
 * facilitando a adição ou remoção de funcionalidades no futuro.
*/



const EventBus = (function(){
    const topicos = {};

    return {
        subscribe: function(topico, ouvir){
            if(!topicos[topico]) {
                topicos[topico]=[];
            }
            topicos[topico].push(ouvir);

            return() => {
                const idx = topicos[topico].indexOf(ouvir);
                if (idx > -1) {
                    topicos[topico].splice(idx, 1);
                }
            }
        },

        publish: function(topico, dados){
            if(!topicos[topico]) {
                return;
            }
            topicos[topico].forEach(l => { 
                try{
                    l(dados); 
                }catch(e){
                    console.error(e);
                }
            });
        }
    }
})();

window.EventBus = EventBus;