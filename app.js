(function(){
    const estado = JogoEstado.getInstancia();
    const sm = GerenciadorState();

    const $mensagens = document.getElementById('mensagens');
    const $escolhas = document.getElementById('escolhas');

    function enviarMensagem(from, text) {
        estado.mensagens.push({from, text});
        EventBus.publish('mensagemAdicionada', {from,text});

        const chatContainer = document.getElementById('chat-container');

        function addMenssagem(text) {
            const msg = document.createElement('div');
            msg.className = 'msg';
            msg.textContent = text;
            document.getElementById('messages').appendChild(msg);

            // força rolagem até a última mensagem
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
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

        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/ficha-agatha.png',
        });
        EventBus.publish('mensagemAdicionada');

        enviarMensagem('them', 'Você viu a foto?');

        showEscolhas([
            {text: 'Quem é você?', next: 'bloco2A'},
            {text: 'Por que você tem isso da minha irmã?', next: 'bloco2B'},
            {text: 'Se for uma ameaça, está perdendo tempo.', next: 'bloco2C'}
        ]);
    });
    
    sm.register('bloco2A', ()=>{
        enviarMensagem('sistema', 'Quem é você?');

        enviarMensagem('them', 'Não importa quem eu sou');
        enviarMensagem('them', 'Mas saiba que não estou te ameaçando. Na verdade estou tentando abrir seus olhos.');

        showEscolhas([
          {text:'Abrir meus olhos pra quê?', next:'bloco3A'},
        ]);
    });
    
    sm.register('bloco2B', ()=>{
        enviarMensagem('sistema', 'Por que você tem isso da minha irmã?');

        enviarMensagem('them', 'Sua irmã nunca te contou tudo. Nem sobre o hospital. Nem sobre o que fizeram com ela lá.');

        showEscolhas([
          {text:'Você está mentindo.', next:'bloco3B'},
          {text:'O que foi que fizeram com ela?', next:'bloco3B'},
          {text: 'E o que você sabe sobre a minha irmã', next: 'bloco3B'}
        ]);
    });

    sm.register('bloco2C', ()=>{
        enviarMensagem('sistema', 'Se for uma ameaça, está perdendo tempo.');

        enviarMensagem('them', 'Não estou te ameaçando. Saiba que na verdade estou tentando abrir seus olhos.');

        showEscolhas([
          {text:'Abrir meus olhos pra quê?', next:'bloco3A'},
        ]);
    });
    
    sm.register('bloco3A', ()=>{
        enviarMensagem('sistema', 'Abrir meus olhos pra quê?');

        enviarMensagem('them', 'Sua irmã nunca te contou tudo. Nem sobre o hospital. Nem sobre o que fizeram com ela lá.');
        showEscolhas([
          {text:'Você está mentindo.', next:'bloco3B'},
          {text:'O que foi que fizeram com ela?', next:'bloco3C'},
          {text: 'E o que você sabe sobre a minha irmã', next: 'bloco3D'}
        ]);
    });
    
    sm.register('bloco3B', ()=>{
        enviarMensagem('sistema', 'Você está mentindo.');

        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/registros.png',
        });
        EventBus.publish('mensagemAdicionada');

        enviarMensagem('them', 'Acredite eu estive lá, no mesmo lugar que a sua irmã estava. Vi coisas que ninguém deveria ver...');
        showEscolhas([
          {text:'Que lugar? A minha irmã está em um orfanato', next:'bloco4A'},
          {text:'Que tipo de procedimentos são esses?', next:'bloco4B'}
        ]);
    });
    
    sm.register('bloco3C', () => {
        enviarMensagem('sistema', 'O que foi que fizeram com ela?');
        
        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/registros.png',
        });
        EventBus.publish('mensagemAdicionada');

        enviarMensagem('them', 'Se quiser respostas, vai ter que me ajudar a procurá-las.');
        enviarMensagem('them', 'Não sei exatamente o que fizeram com a sua irmã nesse lugar, mas sei que foram coisas terríveis.');

        showEscolhas([
            {text:'Que lugar? A minha irmã está em um orfanato', next:'bloco4A'},
            {text:'Que tipo de procedimentos são esses?', next:'bloco4B'}
        ]);
    });

    sm.register('bloco3D', () => {
        enviarMensagem('sistema', 'E o que você sabe sobre a minha irmã');

        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/registros.png',
        });
        EventBus.publish('mensagemAdicionada');

        enviarMensagem('them', 'Se quiser respostas, vai ter que me ajudar a procurá-las.');
        enviarMensagem('them', 'Não sei exatamente o que fizeram com a sua irmã nesse lugar, mas sei que foram coisas terríveis.');

        showEscolhas([
            {text:'Que lugar? A minha irmã está em um orfanato', next:'bloco4A'},
            {text:'Que tipo de procedimentos são esses?', next:'bloco4B'}
            //{text:'Tentar salvar todos (arriscado)', strategy:Strategies.saveAll, next:'confrontation'},
            //{text:'Salvar apenas a irmã', strategy:Strategies.saveSister, next:'confrontation'},
            //{text:'Incendiar o local', strategy:Strategies.burnEverything, next:'confrontation'}
        ]);
    });

    sm.register('bloco4A', ()=>{
        enviarMensagem('sistema', 'Que lugar? A minha irmã está em um orfanato');
        
        enviarMensagem('them', 'Não é bem assim... aquele lugar tem outra face.');
        enviarMensagem('them', 'Olhe no registro de procedimento... o nome "Dr. Verruct" aparece algumas vezes. Você lembra dele?');
        
        showEscolhas([
            {text:'Não pode ser... Esse Dr. Verruct por acaso seria o dono do orfanato?', next:'bloco5A'},
            {text:'Não lembro de nínguem com esse nome', next:'bloco5B'}
        ]);
    });

    sm.register('bloco4B', () => {
        enviarMensagem('sistema', 'Que tipo de procedimentos são esses?');
   
        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/desenho-testes.png',
        });
        EventBus.publish('mensagemAdicionada');

        enviarMensagem('them', 'Olhe no registro de procedimento... o nome "Dr. Verruct" aparece algumas vezes. Você lembra dele?');
        
        showEscolhas([
            {text:'Não pode ser... Esse Dr. Verruct por acaso seria o dono do orfanato?', next:'bloco5A'},
            {text:'Não lembro de nínguem com esse nome', next:'bloco5B'}
        ]);

    });

    sm.register('bloco5A', () => {
        enviarMensagem('sistema', 'Não pode ser... Esse Dr. Verruct por acaso seria o dono do orfanato?');

        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/foto-orfanato.png',
        });
        EventBus.publish('mensagemAdicionada');

        enviarMensagem('them', 'Sim, ele mesmo');
        enviarMensagem('them', 'Esse homem já destruiu muitas vidas.');

        showEscolhas([
            {text: 'Por que está me mandando tudo isso?', next: 'bloco6A'}
        ]);
    });

    sm.register('bloco5B', () => {
        enviarMensagem('sistema', 'Não lembro de nínguem com esse nome');

        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/foto-orfanato.png',
        });
        EventBus.publish('mensagemAdicionada');

        enviarMensagem('them', 'Esse é o mesmo homem que é dono do orfanato onde sua irmã estava...');
        enviarMensagem('them', 'Esse homem já destruiu muitas vidas.');

        showEscolhas([
            {text: 'Por que está me mandando tudo isso?', next: 'bloco6A'}
        ]);
    });

    sm.register('bloco6A', () => {
        enviarMensagem('sistema', 'Por que está me mandando tudo isso?');

        enviarMensagem('them', 'Porque eu quero vingança e só você pode me ajudar');

        showEscolhas([
            {text: 'O que aconteceu com você?', next: 'bloco7A'},
            {text: 'Vingança? Por acaso alguém próximo seu também passou por esse Dr. Verruct?', next: 'bloco7B'}
        ]);
    })
    
    sm.register('bloco7A', () => {
        enviarMensagem('sistema', 'O que aconteceu com você?');

        enviarMensagem('them', 'Não foi comigo mas sim com a minha namorada');
        enviarMensagem('them', 'Eramos todos do mesmo "orfanato" que você e a sua irmã. Eu e a Paty chegamos logo depois de você ter sido adotada... Bom, foi isso que a sua irmã falou para nós a 10 anos atrás');

        showEscolhas([
            {text: 'Sim, quando um casal foi ao orfananto ele ficou interessado em nós duas, mas eles infelizmente só levou uma embora... Quantos anos vocês tinham naquele tempo?', next: 'bloco8A'},
        ]);
    });

    sm.register('bloco7B', () => {
        enviarMensagem('sistema', 'Vingança? Por acaso alguém próximo seu também passou por esse Dr. Verruct?');

        enviarMensagem('them', '')
        showEscolhas([
            {text: 'O que aconteceu com você?', next: 'bloco7A'},
        ]);
    });

    sm.register('bloco8A', () => {
        enviarMensagem('sistema', 'Sim... quando um casal visitou o orfanato, eles demonstraram interesse por nós duas. Mas, no fim, só levaram uma... Quantos anos vocês tinham naquela época mesmo?');

        enviarMensagem('them', 'Nós tínhamos 9 anos quando fomos transferidos para aquele lugar. No começo parecia tudo normal, mas conforme crescemos e atingimos a maioridade, as coisas começaram a mudar.');
        enviarMensagem('them', 'Crianças começaram a desaparecer, à noite se ouviam gritos... E então, um dia, a Paty, minha namorada, simplesmente não voltou mais.');

        showEscolhas([
            {text: 'Sumiu? Como??', next: 'bloco9A'},
            {text: 'Eu sinto muito por isso', next: 'bloco9B'}
        ]);
    });

    sm.register('bloco9A', () => {
        enviarMensagem('sistema', 'Sumiu? Como??');

        enviarMensagem('them', 'Eles… eles diziam que era uma chance.');
        enviarMensagem('them', 'Chamavam algumas meninas do orfanato para "ajudar" no hospital do velho dono. Paty foi uma delas');
        enviarMensagem('them', 'Lembro da felicidade dela… parecia que finalmente teria um propósito, algo além daqueles corredores frios.')
        enviarMensagem('them', 'Mas cada vez que voltava… Voltava diferente.');

        showEscolhas([
            {text: '(não dizer nada)', next: 'bloco9C'},
            {text: 'Eu sinto muito por isso', next: 'bloco9B'}
        ]);
    });
    
    sm.register('bloco9B', () => {
        enviarMensagem('sistema', 'Eu sinto muito por isso');

        enviarMensagem('them', 'Eles… eles diziam que era uma chance.');
        enviarMensagem('them', 'Chamavam algumas meninas do orfanato para "ajudar" no hospital do velho dono. Paty foi uma delas');
        enviarMensagem('them', 'Lembro da felicidade dela… parecia que finalmente teria um propósito, algo além daqueles corredores frios.')
        enviarMensagem('them', 'Mas cada vez que voltava… Voltava diferente.');

        showEscolhas([
            {text: 'Diferente como?', next: 'bloco10A'},
            {text: 'O que houve com ela', next: 'bloco10B'}
        ]);
    });

    sm.register('bloco9C', () => {
        enviarMensagem('sistema', '');

        enviarMensagem('them', 'Eles… eles diziam que era uma chance.');
        enviarMensagem('them', 'Chamavam algumas meninas do orfanato para "ajudar" no hospital do velho dono. Paty foi uma delas');
        enviarMensagem('them', 'Lembro da felicidade dela… parecia que finalmente teria um propósito, algo além daqueles corredores frios.')
        enviarMensagem('them', 'Mas cada vez que voltava… Voltava diferente.');

        showEscolhas([
            {text: 'Diferente como?', next: 'bloco10A'},
            {text: 'O que houve com ela', next: 'bloco10B'}
        ]);
    });

    sm.register('bloco10A', () => {
        enviarMensagem('sistema', 'Diferente como?');

        enviarMensagem('them', 'O olhar dela… se tornou vazio. Como se estivesse presa em algum lugar que eu não podia alcançar.');
        enviarMensagem('them', 'Até que um dia ela simplesmente não voltou.');

        showEscolhas([
            {text: 'E como você sabe que o responsável foi o Dr. Verruct?', next: '11A'}
        ]);
    });

    sm.register('bloco10B', () => {
        enviarMensagem('sistema', 'O que houve com ela');

        enviarMensagem('them', 'Ela simplesmente não voltou.');
        enviarMensagem('them', 'Eu a vi sumindo pouco a poucoO olhar dela… se tornou vazio. Como se estivesse presa em algum lugar que eu não podia alcançar.');
        enviarMensagem('them', 'O olhar dela… se tornou vazio. Como se estivesse presa em algum lugar que eu não podia alcançar.');
        

        showEscolhas([
            {text: 'E como você sabe que o responsável foi o Dr. Verruct?', next: 'bloco11A'}
        ]);
    });

    sm.register('bloco11A', () => {
        enviarMensagem('sistema', 'E como você sabe que o responsável foi o Dr. Verruct?');

        enviarMensagem('them', 'Porque eu fui procurar ela, fui atrás dela');
        enviarMensagem('them', 'Não acreditei quando me disseram que ela fugiu com outro homem');
        

        showEscolhas([
            {text: 'O que foi que você achou?', next: '11B'}
        ]);
    });

    sm.register('bloco11B', () => {
        enviarMensagem('sistema', 'O que foi que você achou?');

        estado.mensagens.push({
            from: 'them',
            type: 'image',
            src: './public/image/foto-atofinal.png',
        });
        EventBus.publish('mensagemAdicionada');
    });

    // Aqui iniciamos o jogo
    sm.go(estado.capitulo);
    renderizarMensagem();
    
})();