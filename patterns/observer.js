
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