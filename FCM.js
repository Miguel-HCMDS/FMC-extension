const horarioSelect = document.getElementById("horarioSelect")
const p1Select = document.getElementById("p1Select");
const servicoSelect = document.getElementById("servicoSelect");
const portfolioSelect = document.getElementById("portfolioSelect");
const p2Select = document.getElementById("p2Select");
const textBox = document.getElementById("textBox");

const horariotexts = {
  Dia: {
    start: "{pre}\nBom dia,",
  },
  Tarde: {
    start: "{pre}\nBoa tarde,",
  },
  Noite: {
    start: "{pre}\nBoa noite,",
  }
};

const p1texts = {
  profissional: {
    start: " me chamo Miguel Henrique e me interessei pelo projeto, {b}tenho as habilidades necessárias{/b} para a criação. Possuo experiência na área e estou sempre buscando entregar qualidade, com atenção aos detalhes e cuidado no resultado final. Estou disponivel para contribuir  com o desenvolvimento",
  },
  amigavel: {
    start: " Tudo certo? Dei uma olhada na descrição do projeto e acredito que {b}posso ajudar{/b}. Vou contribuir com minhas habilidades e colaborar para que a solução atenda bem às necessidades propostas para o desenvolvimento",
  },
  desleixado: {
    start: " Dei uma lida na sua proposta e acho que consigo entregar um {b}projeto de qualidade{/b} de forma tranquila e organizada. Quero colaborar com tudo que posso na confecção",
  }
};

const servicoTexts = {
  logo: {
  start: " da sua logo.\n\n"
  },
  logotipo: {
  start: " do seu logotipo.\n\n"
  },
  ilustracao: {
  start: " da sua ilustração.\n\n",
  },
  banner: {
  start: " do seus banners.\n\n",
  },
  postagens: {
  start: " das suas postagens.\n\n",
  },
  modelo3d: {
  start: " do seu modelo 3D.\n\n",
  },
  animacao: {
  start: " da sua animação.\n\n",
  },
  motion: {
  start: " do seu motion.\n\n",
  },
  app: {
  start: " do design do app.\n\n",
  },
  website: {
  start: " do design do website.\n\n",
  },
  uiux: {
  start: " do seu UI/UX.\n\n",
  },
  spritesheet: {
  start: " de seus sprites.\n\n",
  }
};

const portfolioTexts = {
  tudo: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/miguelhenrique62/moodboards\n{/q}\n\n",
  },
  logo2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553233/Logos\n{/q}\n\n"
  },
  logotipo2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553233/Logos\n{/q}\n\n"
  },
  ilustracao2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553217/Ilustracoes\n{/q}\n\n",
  },
  banner2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553225/Publicidade\n{/q}\n\n",
  },
  postagens2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553225/Publicidade\n{/q}\n\n",
  },
  modelo3d2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553257/Trabalhos-3D\n{/q}\n\n",
  },
  animacao2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223560277/Animacoes\n{/q}\n\n",
  },
  motion2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nno tenho nada\n\n{/q}\n\n",
  },
  app2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553237/Websites-Apps\n{/q}\n\n",
  },
  website2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553237/Websites-Apps\n\n{/q}\n\n",
  },
  uiux2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nhttps://www.behance.net/moodboard/223553237/Websites-Apps\n{/q}\n\n",
  },
  spritesheet2: {
  start: "{q}\n{b}Alguns exemplos do meu trabalho:{/b}\n\nno tenho\n\n{/q}\n\n",
  }
};

const p2texts = {
  Certo: {
    start: "Você já é familiar com briefing? Caso não seja, estou disponível a qualquer momento, caso queira tirar suas dúvidas sobre o processo. Caso acabe por decidir pela minha proposta, espero que possamos trabalhar bem juntos.\n{/pre}"},

  Educado: {
    start: "Fico por aqui caso queira tirar dúvidas sobre o meu processo. Espero que possamos trabalhar juntos. Você já ouviu falar sobre briefing?\n{/pre}"},

  Desleixado: {
    start: "Você é familiar com briefing? Qualquer coisa, estou aqui, é só mandar uma mensagem. Aguardo sua resposta para podermos dar início ao projeto.\n{/pre}"},
};

function updateText() {
  const horario = horariotexts[horarioSelect.value];
  const p1 = p1texts[p1Select.value];
  const servico = servicoTexts[servicoSelect.value];
  const p2 = p2texts[p2Select.value];
  const portfolio = portfolioTexts[portfolioSelect.value];

  if (!horario || !p1 || !servico || !portfolio || !p2) {
  textBox.value = "";
  return;
}

  textBox.value = horario.start + p1.start + servico.start + portfolio.start + p2.start;
}

horarioSelect.addEventListener("change", updateText)
p1Select.addEventListener("change", updateText);
servicoSelect.addEventListener("change", updateText);
portfolioSelect.addEventListener("change", updateText);
p2Select.addEventListener("change", updateText);