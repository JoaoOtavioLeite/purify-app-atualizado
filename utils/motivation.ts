// Array de frases motivacionais
const MOTIVATIONAL_QUOTES = [
  "Cada dia é uma nova oportunidade para crescer mais forte, se desafiar e se superar.",
  "A única pessoa que você deve tentar ser melhor é a pessoa que você foi ontem.",
  "O que está atrás de nós e o que está à nossa frente são pequenos assuntos comparados ao que está dentro de nós.",
  "Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo.",
  "A luta que você enfrenta hoje está desenvolvendo a força que você precisa para amanhã.",
  "Pequenos passos ainda são passos na direção certa.",
  "Seu passado não define seu futuro. Cada momento é um novo começo.",
  "Autodisciplina é escolher entre o que você quer agora e o que você mais quer.",
  "O progresso é impossível sem mudança, e aqueles que não podem mudar suas mentes não podem mudar nada.",
  "Sucesso não é sempre sobre grandeza. É sobre consistência. Trabalho duro consistente leva ao sucesso.",
  "O homem que move uma montanha começa carregando pequenas pedras.",
  "A dor que você sente hoje será a força que você sentirá amanhã.",
  "Caia sete vezes, levante-se oito.",
  "Seu corpo ouve tudo que sua mente diz. Mantenha-se positivo.",
  "Você sobreviveu a 100% dos seus piores dias até agora. Você está indo bem.",
  "A única maneira de fazer um excelente trabalho é amar o que você faz. Se você ainda não encontrou, continue procurando.",
  "O segredo da mudança é focar toda sua energia não em lutar contra o velho, mas em construir o novo.",
  "Não é sobre perfeição. É sobre esforço. E quando você traz esse esforço todos os dias, é aí que a transformação acontece.",
  "Seu futuro é criado pelo que você faz hoje, não amanhã.",
  "Quando você sentir vontade de desistir, lembre-se por que começou.",
  "Sucesso não é final, fracasso não é fatal: é a coragem de continuar que conta.",
  "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora.",
  "Você nunca está velho demais para definir outro objetivo ou sonhar um novo sonho.",
  "Acredite que você pode e você está no meio do caminho.",
  "Não importa o quão devagar você vá, desde que você não pare.",
  "O único limite para nossa realização de amanhã serão nossas dúvidas de hoje.",
  "Faça o que puder, com o que tiver, onde estiver.",
  "Lembra daquele cara que desistiu? Nem ninguém mais.",
  "Desafie-se a ser mais do que você foi ontem.",
  "Sua recuperação vale a pena lutar por ela.",
];

// Array de mensagens de encorajamento específicas para recuperação
const RECOVERY_MESSAGES = [
  "Libertar-se do vício é uma das coisas mais corajosas que você fará.",
  "Recuperação não é sobre perfeição; é sobre progresso. Seja paciente consigo mesmo.",
  "A cada momento que você resiste à tentação, você se torna mais forte que seus desejos.",
  "A liberdade do outro lado da recuperação vale cada momento difícil agora.",
  "Seu cérebro está se reconectando a cada dia de cura. Continue.",
  "Esta jornada transformará não apenas seus hábitos, mas toda sua perspectiva de vida.",
  "Os desejos são temporários, mas o crescimento que você está experimentando é permanente.",
  "Você não está lutando contra o prazer; está lutando por alegria e conexão autênticas.",
  "Verdadeira força não é nunca sentir tentação; é sentir tentação e escolher diferente.",
  "Cada vez que você escolhe saúde sobre hábito, você reconquista um pedaço de si mesmo.",
  "O caminho para a liberdade nem sempre é reto, mas cada passo na direção certa conta.",
  "Você está construindo caminhos neurais de autocontrole que servirão você por toda vida.",
  "Quando você se sentir fraco, lembre-se de todos os momentos em que foi forte.",
  "Seu eu futuro está agradecendo pelas batalhas que você está lutando hoje.",
  "A cura acontece uma escolha, um dia, um momento por vez.",
  "Recuperação não é sobre força de vontade—é sobre criar uma vida onde o vício não faz mais sentido.",
  "Você merece a clareza e paz que vem da liberdade do vício.",
  "As pessoas mais fortes são aquelas que vencem batalhas que ninguém sabe. Você é mais forte do que imagina.",
  "Considere os desafios de hoje como treinamento para as vitórias de amanhã.",
  "Suas lutas não te definem—sua coragem para enfrentá-las sim.",
];

// Mensagens motivacionais diárias com versículos bíblicos
export const getDailyMotivation = (): string => {
  const motivations = [
    {
      verse: "Posso todas as coisas naquele que me fortalece.",
      reference: "Filipenses 4:13"
    },
    {
      verse: "O Senhor é a minha força e o meu escudo; nele o meu coração confia, e dele recebo ajuda.",
      reference: "Salmos 28:7"
    },
    {
      verse: "Mas os que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam.",
      reference: "Isaías 40:31"
    },
    {
      verse: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel.",
      reference: "Isaías 41:10"
    },
    {
      verse: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
      reference: "Salmos 37:5"
    },
    {
      verse: "Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação.",
      reference: "2 Timóteo 1:7"
    },
    {
      verse: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a fortaleza da minha vida; de quem me recearei?",
      reference: "Salmos 27:1"
    },
    {
      verse: "Tudo posso naquele que me fortalece.",
      reference: "Filipenses 4:13"
    },
    {
      verse: "Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.",
      reference: "Josué 1:9"
    },
    {
      verse: "Mas eu te digo: ame os seus inimigos e ore por aqueles que te perseguem.",
      reference: "Mateus 5:44"
    },
    {
      verse: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.",
      reference: "Provérbios 3:5"
    },
    {
      verse: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
      reference: "Jeremias 29:11"
    },
    {
      verse: "O Senhor é o meu pastor; nada me faltará.",
      reference: "Salmos 23:1"
    },
    {
      verse: "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas.",
      reference: "Mateus 6:33"
    },
    {
      verse: "Combati o bom combate, acabei a carreira, guardei a fé.",
      reference: "2 Timóteo 4:7"
    }
  ];
  
  const motivation = motivations[Math.floor(Math.random() * motivations.length)];
  return `"${motivation.verse}"\n\n${motivation.reference}`;
};

// Mensagens específicas baseadas na sequência de dias
export const getStreakMotivation = (streak: number): string => {
  if (streak === 0) {
    return "Hoje é um novo começo. Cada recomeço te torna mais forte e mais sábio.";
  } else if (streak === 1) {
    return "Primeiro dia conquistado! O primeiro passo é sempre o mais importante.";
  } else if (streak < 7) {
    return "Continue firme! Os primeiros dias são cruciais para construir um novo hábito.";
  } else if (streak === 7) {
    return "Uma semana completa! Seu cérebro já está começando a criar novos padrões saudáveis.";
  } else if (streak < 14) {
    return "Mais de uma semana de vitórias! Sua determinação está fazendo a diferença.";
  } else if (streak === 14) {
    return "Duas semanas de liberdade! Seus novos hábitos estão se fortalecendo a cada dia.";
  } else if (streak < 30) {
    return "Você está criando uma nova história para sua vida. Continue nesse caminho!";
  } else if (streak === 30) {
    return "Um mês completo! Esta é uma conquista incrível que merece ser celebrada.";
  } else if (streak < 60) {
    return "Mais de um mês de vitórias! Você está provando que a mudança é possível.";
  } else if (streak === 60) {
    return "Dois meses de liberdade! Seus novos hábitos estão se tornando sua segunda natureza.";
  } else if (streak < 90) {
    return "Sua jornada é inspiradora! Continue construindo esse legado de superação.";
  } else if (streak === 90) {
    return "90 dias! Esta é uma conquista extraordinária que poucos alcançam. Você é excepcional!";
  } else {
    return "Você não está apenas se recuperando, está se transformando. Sua história inspira outros!";
  }
};

// Mensagens para momentos de recaída
export const getRelapseMessage = (): string => {
  const messages = [
    "Lembre-se: uma recaída não é o fim da jornada, é parte do processo de aprendizado.",
    "Você não perdeu todo seu progresso. O que importa é levantar e continuar.",
    "Cada recomeço te torna mais forte. Use essa experiência para crescer.",
    "Não deixe que um momento de fraqueza defina sua jornada inteira.",
    "Você é mais forte que seus erros. Levante-se e recomece com mais sabedoria."
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};