(function(){
    const estado = JogoEstado.getInstancia();
    const sm = GerenciadorState();

    const $mensagens = document.getElementById('mensagens');
    const $escolhas = document.getElementById('escolhas');

    function enviarMensagem(from, text) {
        estado.mensagens.push({from, text});
        EventBus.publish('mensagemAdicionada', {from,text});
    }

    function renderizarMensagem() {
        $mensagens.innerHTML = '';
        estado.mensagens.forEach(m => {
            const div = document.createElement('div');
            div.className = 'msg ' + (m.from === 'me' ? 'me' : (m.from === 'sistema' ? 'sistema' : 'them'));
    
            if (m.type === 'text' || !m.type) {
                div.textContent = (m.from === 'me' ? 'Você: ' : '') + m.text;
            } 
            else if (m.type === 'image') {
                const img = document.createElement('img');
                img.src = m.src;
                img.alt = 'imagem';
                img.className = 'msg-img';
                div.appendChild(img);
            } 
            else if (m.type === 'video') {
                const video = document.createElement('video');
                video.src = m.src;
                video.controls = true;   
                video.autoplay = m.autoplay || false; 
                video.muted = m.muted || false;
                video.loop = m.loop || false;
                video.className = 'msg-video';
                div.appendChild(video);
            }
    
            $mensagens.appendChild(div);
        });
    
        $mensagens.scrollTop = $mensagens.scrollHeight;
    }
    
    function handleEscolhas(escolha){
        if(escolha.strategy){
          escolha.strategy(estado);
        }
        if(escolha.next) sm.go(escolha.next, {escolha});
      }

    function showEscolhas(escolhas) {
        $escolhas.innerHTML = '';
        escolhas.forEach((c, idx) => {
            const btn = document.createElement('button');
            btn.className = 'escolhas-btn';
            btn.textContent = c.text;
            btn.onclick = ()=>{handleEscolhas(c);}
            $escolhas.appendChild(btn);
        })
    }

    EventBus.subscribe('mensagemAdicionada', renderizarMensagem);
    EventBus.subscribe('estadoAlterado', (e) => {
        console.log("Estado mudou: ", e.estado);
    });

    sm.register('intro', ()=>{

        /**estado.mensagens.push({
            from: 'them',
            type: 'video',
            src: '',
            autoplay: true,
            muted: true
        });
        EventBus.publish('mensagemAdicionada');**/

        enviarMensagem('them', '(ligação cortada por gritos...)');
        enviarMensagem('sistema', 'No dia seguinte você encontra uma mensagem anônima com fichas médicas de Villa Hope.');
        showEscolhas([
          {text:'Ir até o Hospital St. Mary', next:'stMary'},
          {text:'Pesquisar Villa Hope na Biblioteca', next:'library'},
          {text:'Conversar com Ethan Cross', next:'ethan'}
        ]);
      });
    
    sm.register('stMary', ()=>{
        enviarMensagem('them', 'No St. Mary os registros parecem adulterados.');
        enviarMensagem('sistema', 'Você encontra pistas que sugerem transferência para Villa Hope há 1 ano.');
        showEscolhas([
          {text:'Ir à Biblioteca Municipal', next:'library'},
          {text:'Procurar ex-pacientes', next:'expatient'}
        ]);
    });
    
    sm.register('library', ()=>{
        enviarMensagem('them', 'O bibliotecário: "Ward nunca foi preso. Ele sumiu depois do incêndio."');
        enviarMensagem('sistema', 'Você encontra fotos recentes da sua irmã datadas de 3 dias atrás.');
        showEscolhas([
          {text:'Investigar área industrial abandonada', next:'industrial'},
          {text:'Falar com Ethan', next:'ethan'}
        ]);
    });
    
    sm.register('expatient', ()=>{
        enviarMensagem('them', 'Um ex-paciente sussurra sobre "A Sala da Metamorfose".');
        showEscolhas([
          {text:'Ir para a área industrial', next:'industrial'},
          {text:'Voltar ao St. Mary', next:'stMary'}
        ]);
    });
    
    sm.register('ethan', ()=>{
        enviarMensagem('them', 'Ethan: "Minha namorada Clara desapareceu também. Eu tenho contatos que apontam para um laboratório na área industrial."');
        showEscolhas([
          {text:'Ir para a área industrial', next:'industrial'},
          {text:'Revisar as fotos da irmã', next:'library'}
        ]);
    });
    
    // Clímax: área industrial com decisões importantes
    sm.register('industrial', () => {
        enviarMensagem('them', 'Você chegou ao laboratório improvisado. Sons abafados, frascos e seringas por toda parte.');
        enviarMensagem('them', 'A irmã aparece, alternando lucidez e agressividade. Ward está lá.');
        showEscolhas([
            {text:'Tentar salvar todos (arriscado)', strategy:Strategies.saveAll, next:'confrontation'},
            {text:'Salvar apenas a irmã', strategy:Strategies.saveSister, next:'confrontation'},
            {text:'Incendiar o local', strategy:Strategies.burnEverything, next:'confrontation'}
            ]);
    });
    
    // 🔹 Aqui iniciamos o jogo
    sm.go(estado.capitulo);
    renderizarMensagem();
    
})();