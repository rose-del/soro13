# Soro 13 - Chat Game
**"Soro 13"**, um jogo de investigação e mistério no formato de um chat interativo. Neste projeto, a história se desenrola através de uma conversa, onde as suas escolhas moldam o destino do protagonista e revelam segredos sombrios.

---

## Sinopse do Jogo

A escuridão do seu quarto é rompida pela luz fria do celular. Na tela, uma imagem que gelou seu sangue: a ficha de sua irmã **Agatha**, com uma foto pálida.  

> "Você viu a foto?", pergunta uma mensagem anônima, ecoando como um sussurro fantasmagórico.

Quem era aquela pessoa? E por que tinha informações sobre sua irmã?  

> "Estou tentando abrir seus olhos", insistia a voz do outro lado da tela.

Você descobre que Agatha nunca contou tudo:  
> "Sua irmã nunca te contou tudo. Nem sobre o hospital. Nem sobre o que fizeram com ela lá."

O orfanato era apenas uma fachada. Fotografias de registros médicos, menções ao **Dr. Verrückt** e "procedimentos" macabros mostram que aquele lugar era um verdadeiro **inferno disfarçado**.  

---

## Arquitetura e Padrões de Projeto

O jogo foi desenvolvido em **JavaScript**, com os seguintes padrões:

- **Singleton**: Gerencia uma única instância global do **JogoEstado**, mantendo mensagens, escolhas e informações da partida.
- **Observer**: Implementado no **EventBus**. Permite comunicação indireta entre componentes via eventos (`mensagemAdicionada`) sem acoplamento rígido.
- **State**: O **GerenciadorState** organiza a lógica do jogo em blocos de diálogo, facilitando a navegação entre cenas.
- **Strategy**: Algumas ações do jogador é encapsulada em funções separadas (“estratégias”), permitindo comportamentos dinâmicos conforme a escolha do usuário.

---

## Como Jogar

O jogo é **front-end puro**, podendo ser executado em qualquer navegador moderno, inclusive no celular.  

### Passo a Passo para Jogar no Celular
1. **Abra essa url no seu navegador:**
[https://rose-del.github.io/soro13/](https://rose-del.github.io/soro13/)

### Passo a Passo para Jogar no PC

1. **Clone o repositório:**

```bash
git clone https://github.com/rose-del/soro13
```

2. **Entre na pasta do projeto:**

```bash
cd soro13
```

3. **Abra o jogo:**
```bash
Clique duas vezes no `index.html` ou execute na IDE VScode com a extensão `live server`.
```

## Vídeo do jogo:
https://github.com/user-attachments/assets/d8505c56-c85f-41ac-a03f-ab7396d9e82e
