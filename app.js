const sm = GerenciadorState();
sm.register('A', ()=> console.log('Entrei em A'));
sm.register('B', ()=> console.log('Entrei em B'));

EventBus.subscribe('estadoAlterado', e => console.log('Observer:', e.state));

sm.go('A'); // -> "Entrei em A", "Observer: A"
sm.go('B'); // -> "Entrei em B", "Observer: B"
console.log('Atual:', sm.estadoAtual()); // -> "B"

const s = JogoEstado.getInstancia();

const off = EventBus.subscribe('mensagemAdicionada', () => {
  console.log('Renderizar!', s.mensagens.at(-1));
});

// Executar estratégias
Strategies.salvarTodos(s);
console.assert(s.flags.rescueMode === 'todos');

Strategies.salvarIrma(s);
console.assert(s.flags.rescueMode === 'irmã');

Strategies.queimarTudo(s);
console.assert(s.flags.rescueMode === 'queimar');

off();
