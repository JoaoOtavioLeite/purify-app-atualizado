// Define tipos de desafios
export interface Challenge {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  benefit: string;
  type: 'mental' | 'physical' | 'social' | 'biblical';
  duration: string;
  requiredStreak: number;
  verse?: string; // Versículo bíblico opcional
}

// Lista de desafios
export const challenges: Challenge[] = [
  {
    id: 'daily-bible-reading',
    title: 'Leitura Bíblica Diária',
    shortDescription: 'Fortaleça sua fé através da Palavra de Deus',
    description: 'Reserve 15 minutos para ler um capítulo da Bíblia. Reflita sobre a mensagem e como ela se aplica à sua vida e sua jornada de recuperação.',
    benefit: 'A leitura diária da Bíblia fortalece sua fé, oferece orientação espiritual e ajuda a manter o foco em seu compromisso com a pureza.',
    type: 'biblical',
    duration: '15 minutos',
    requiredStreak: 0,
    verse: 'Salmos 119:11 - Guardei no coração as tuas palavras para não pecar contra ti.'
  },
  {
    id: 'morning-prayer',
    title: 'Oração Matinal',
    shortDescription: 'Comece seu dia em comunhão com Deus',
    description: 'Dedique os primeiros momentos do seu dia à oração. Agradeça, confesse, peça orientação e force espiritual para o dia.',
    benefit: 'A oração matinal estabelece uma conexão espiritual forte para o dia, fortalecendo sua resistência contra tentações.',
    type: 'biblical',
    duration: '10 minutos',
    requiredStreak: 0,
    verse: '1 Tessalonicenses 5:17 - Orem continuamente.'
  },
  {
    id: 'scripture-memorization',
    title: 'Memorização de Versículos',
    shortDescription: 'Arme-se com a Palavra de Deus',
    description: 'Escolha um versículo específico sobre pureza ou autocontrole e dedique-se a memorizá-lo. Repita-o durante o dia, especialmente em momentos de tentação.',
    benefit: 'Ter versículos memorizados fornece uma ferramenta poderosa para combater pensamentos negativos e tentações no momento em que surgem.',
    type: 'biblical',
    duration: '5-10 minutos',
    requiredStreak: 3,
    verse: '2 Timóteo 2:22 - Fuja dos desejos malignos da juventude e siga a justiça, a fé, o amor e a paz.'
  },
  {
    id: 'worship-time',
    title: 'Momento de Adoração',
    shortDescription: 'Conecte-se com Deus através do louvor',
    description: 'Separe um tempo para ouvir e cantar louvores. Foque nas letras e permita que seu coração se conecte com Deus através da música.',
    benefit: 'A adoração ajuda a mudar o foco dos desejos terrenos para as coisas espirituais, além de elevar seu espírito.',
    type: 'biblical',
    duration: '15 minutos',
    requiredStreak: 5,
    verse: 'Salmos 95:1 - Venham, cantemos ao Senhor com alegria.'
  },
  {
    id: 'accountability-partner',
    title: 'Parceria Espiritual',
    shortDescription: 'Encontre força no companheirismo cristão',
    description: 'Conecte-se com um irmão na fé para compartilhar sua jornada, orar juntos e manter-se mutuamente responsáveis.',
    benefit: 'O apoio espiritual mútuo fortalece sua caminhada e oferece suporte nos momentos difíceis.',
    type: 'biblical',
    duration: '20 minutos',
    requiredStreak: 7,
    verse: 'Eclesiastes 4:9-10 - É melhor ter companhia do que estar sozinho, porque maior é a recompensa do trabalho de duas pessoas.'
  },
  {
    id: 'trigger-journal',
    title: 'Identifique Seus Gatilhos',
    shortDescription: 'Reconheça padrões que levam à recaída',
    description: 'Reserve 10 minutos para anotar situações, emoções e horários do dia em que você se sente mais vulnerável à tentação. Seja específico e honesto consigo mesmo.',
    benefit: 'Consciência é o primeiro passo para a mudança. Ao identificar seus gatilhos específicos, você pode desenvolver estratégias direcionadas para evitá-los ou responder diferentemente quando ocorrerem.',
    type: 'mental',
    duration: '10 minutos',
    requiredStreak: 0
  },
  {
    id: 'screen-free-hour',
    title: 'Hora Livre de Telas',
    shortDescription: 'Crie distância saudável das tentações digitais',
    description: 'Escolha uma hora antes de dormir para se desconectar completamente de todas as telas (celular, computador, TV). Em vez disso, leia um livro, escreva no diário, medite ou dedique-se a um hobby.',
    benefit: 'O tempo noturno em frente às telas é frequentemente quando a força de vontade está mais baixa. Esta prática não só remove a tentação imediata, mas melhora a qualidade do sono, o que fortalece a força de vontade no dia seguinte.',
    type: 'mental',
    duration: '1 hora',
    requiredStreak: 3
  },
  {
    id: 'pushups-urge',
    title: 'Flexões Durante Impulsos',
    shortDescription: 'Canalize energia indesejada em força física',
    description: 'Quando sentir um impulso forte, imediatamente faça 10-15 flexões ou outro exercício breve e intenso. Concentre-se completamente na sua forma e respiração.',
    benefit: 'Esta técnica redireciona a energia sexual para o esforço físico, mudando seu estado físico e ambiente. O exercício também libera endorfinas, proporcionando um impulso natural de bem-estar.',
    type: 'physical',
    duration: '1 minuto',
    requiredStreak: 3
  },
  {
    id: 'deep-breathing',
    title: 'Meditação de Controle de Impulsos',
    shortDescription: 'Aprenda a suportar impulsos sem agir sobre eles',
    description: 'Quando surgir um impulso, sente-se quieto e observe-o sem julgamento. Respire profundamente, focando na sensação do impulso, sabendo que ele atingirá um pico e depois diminuirá como uma onda.',
    benefit: 'Esta técnica de mindfulness ensina que impulsos são sensações temporárias que passarão independentemente de você agir sobre eles ou não. Desenvolve a capacidade mental de experimentar desconforto sem buscar alívio imediato.',
    type: 'mental',
    duration: '5 minutos',
    requiredStreak: 7
  },
  {
    id: 'nature-walk',
    title: 'Caminhada Consciente na Natureza',
    shortDescription: 'Conecte-se com o mundo natural',
    description: 'Faça uma caminhada de 20 minutos em um ambiente natural, focando completamente em seu entorno. Observe cores, sons, cheiros e texturas. Deixe seu celular em casa ou no modo avião.',
    benefit: 'A exposição à natureza reduz hormônios do estresse e aumenta neurotransmissores do bem-estar. Esta prática também ajuda a quebrar ciclos de ruminação e padrões de pensamento negativos que podem levar à recaída.',
    type: 'physical',
    duration: '20 minutos',
    requiredStreak: 7
  },
  {
    id: 'gratitude-practice',
    title: 'Prática de Gratidão Noturna',
    shortDescription: 'Foque nos aspectos positivos da sua vida',
    description: 'Antes de dormir, escreva três coisas específicas pelas quais você é grato hoje. Podem ser simples (uma boa refeição) ou profundas (um relacionamento de apoio).',
    benefit: 'A gratidão muda o foco do que você está "perdendo" para a abundância que já existe em sua vida. A prática regular reconecta o cérebro para positividade e contentamento em vez de desejo e falta.',
    type: 'mental',
    duration: '5 minutos',
    requiredStreak: 10
  },
  {
    id: 'accountability-call',
    title: 'Check-in com Parceiro de Responsabilidade',
    shortDescription: 'Compartilhe sua jornada com alguém de confiança',
    description: 'Entre em contato com um amigo ou familiar de confiança e pergunte se eles estariam dispostos a ser seu parceiro de responsabilidade. Agende um horário regular para conversar sobre seu progresso e desafios.',
    benefit: 'Responsabilidade externa aumenta dramaticamente as taxas de sucesso na mudança de comportamento. Compartilhar sua jornada também reduz a vergonha, que é um gatilho comum para recaída.',
    type: 'social',
    duration: '15 minutos',
    requiredStreak: 14
  },
  {
    id: 'hobby-development',
    title: 'Redescubra um Hobby',
    shortDescription: 'Invista tempo em atividades significativas',
    description: 'Dedique 30 minutos a um hobby que você costumava gostar ou sempre quis tentar. Escolha algo que exija foco e proporcione uma sensação de realização.',
    benefit: 'Desenvolver paixões e habilidades fornece fontes saudáveis de dopamina e significado que podem substituir a estimulação artificial do vício. Hobbies também preenchem o tempo que poderia ser vulnerável à tentação.',
    type: 'mental',
    duration: '30 minutos',
    requiredStreak: 14
  },
  {
    id: 'sleep-routine',
    title: 'Otimize Sua Rotina de Sono',
    shortDescription: 'Melhore a recuperação através de um sono melhor',
    description: 'Crie um horário de sono consistente: vá dormir e acorde no mesmo horário, mesmo nos fins de semana. Remova eletrônicos do quarto e mantenha o ambiente fresco e escuro.',
    benefit: 'Sono de qualidade é essencial para força de vontade, regulação emocional e cura dos caminhos cerebrais afetados pelo vício. Sono ruim está fortemente correlacionado com recaída.',
    type: 'physical',
    duration: 'Contínuo',
    requiredStreak: 21
  },
  {
    id: 'dopamine-fast',
    title: 'Mini Jejum de Dopamina',
    shortDescription: 'Redefina o sistema de recompensa do seu cérebro',
    description: 'Por um dia, minimize todas as fontes de estimulação artificial: redes sociais, notícias, jogos, comida não saudável, etc. Em vez disso, envolva-se em atividades simples como caminhar, ler ou conversar.',
    benefit: 'Esta prática ajuda a redefinir a sensibilidade à dopamina, tornando você mais responsivo a prazeres naturais. Quebra o ciclo de buscar constantemente estimulação mais forte.',
    type: 'mental',
    duration: '1 dia',
    requiredStreak: 30
  }
];