const cancelarInscricao = EventBus.subscribe("teste", (dados) => {
    console.log("Recebi dados:", dados);
});

EventBus.publish("teste", { mensagem: "Jesus é o caminho, a verdade e a vida!" });

cancelarInscricao();

// Serve para publicar de novo para ver se o ouvinte já não responde mais
EventBus.publish("teste", { mensagem: "Você deveria ver isso" });
