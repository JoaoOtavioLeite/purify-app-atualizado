// Interface for success stories
interface SuccessStory {
  title: string;
  author: string;
  content: string;
  daysClean: number;
  image: string;
  likes: number;
  comments: number;
}

// List of success stories
export const successStories: SuccessStory[] = [
  {
    title: "Encontrando Liberdade Após uma Década de Luta",
    author: "Miguel J.",
    content: `Por mais de dez anos, eu estava preso em um ciclo de dependência que achei que nunca escaparia. O que começou como curiosidade ocasional se tornou um hábito diário que afetou meus relacionamentos, carreira e, mais importante, como eu me via.

    Meu ponto de virada veio quando percebi que tinha perdido momentos importantes com minha família porque estava distraído pela minha dependência. Naquela noite, baixei este aplicativo e me comprometi a mudar.

    As duas primeiras semanas foram as mais difíceis. Os impulsos eram intensos, e eu falhei várias vezes. Mas diferente de antes, não desisti. Usei o recurso de diário para identificar meus gatilhos - principalmente estresse e tédio - e comecei a desenvolver mecanismos de enfrentamento mais saudáveis.

    O exercício físico se tornou minha salvação. Sempre que os impulsos surgiam, eu imediatamente fazia flexões ou saía para correr. Não era apenas sobre distração; as endorfinas realmente ajudavam a substituir o que meu cérebro estava desejando.

    Após 30 dias, notei que minha mente estava mais clara. Meu foco melhorou no trabalho, e eu me senti presente com minha família de uma maneira que não estava há anos. Aos 90 dias, a frequência e intensidade dos impulsos tinham diminuído drasticamente.

    Agora, com mais de 200 dias limpo, ainda tenho lutas ocasionais, mas são administráveis. As correntes da dependência não me definem mais. Se você está apenas começando esta jornada, saiba que fica mais fácil. Seu cérebro vai se curar, e você vai redescobrir partes de si mesmo que pensou estarem perdidas para sempre.`,
    daysClean: 238,
    image: "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg",
    likes: 432,
    comments: 56
  },
  {
    title: "From Shame to Strength",
    author: "David R.",
    content: "My journey to freedom started with confronting the shame I carried. Once I learned to separate my worth from my actions, real change became possible.",
    daysClean: 142,
    image: "https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg",
    likes: 285,
    comments: 39
  },
  {
    title: "How Meditation Changed Everything",
    author: "Sam T.",
    content: "After trying willpower alone for years, I discovered meditation. Learning to observe urges without acting on them transformed my recovery.",
    daysClean: 103,
    image: "https://images.pexels.com/photos/775417/pexels-photo-775417.jpeg",
    likes: 198,
    comments: 27
  },
  {
    title: "My Year of Transformation",
    author: "Alexander K.",
    content: "One full year free from addiction. The person I was a year ago wouldn't recognize who I've become—physically, mentally, and spiritually.",
    daysClean: 365,
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    likes: 521,
    comments: 88
  },
  {
    title: "Starting Over at 40",
    author: "James H.",
    content: "I spent decades thinking I was too far gone to change. At 40, I finally proved myself wrong. It's never too late to reclaim your life.",
    daysClean: 87,
    image: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg",
    likes: 176,
    comments: 23
  },
  {
    title: "The Unexpected Benefits of Recovery",
    author: "Thomas L.",
    content: "I started this journey to break free from addiction, but gained so much more—confidence, authentic relationships, and a sense of purpose.",
    daysClean: 215,
    image: "https://images.pexels.com/photos/1251850/pexels-photo-1251850.jpeg",
    likes: 245,
    comments: 31
  }
];

// Interface for resources
interface Resource {
  title: string;
  description: string;
  type: 'article' | 'video' | 'book';
  link: string;
}

// List of resources
export const resources: Resource[] = [
  {
    title: "Entendendo a Neurociência da Dependência",
    description: "Como a pornografia afeta o sistema de recompensa do seu cérebro e o que acontece durante a recuperação",
    type: "article",
    link: "#"
  },
  {
    title: "Superando a Vergonha e Construindo Autocompaixão",
    description: "Quebrando o ciclo de vergonha que frequentemente perpetua o comportamento aditivo",
    type: "article",
    link: "#"
  },
  {
    title: "O Papel da Dopamina na Dependência e Recuperação",
    description: "Como restaurar a produção natural de dopamina e sensibilidade",
    type: "video",
    link: "#"
  },
  {
    title: "Construindo Intimidade Saudável Após a Dependência",
    description: "Restaurando conexões genuínas em relacionamentos prejudicados pela dependência de pornografia",
    type: "article",
    link: "#"
  },
  {
    title: "Surfando na Urgência: Uma Técnica de Mindfulness para Recuperação",
    description: "Aprenda a observar e superar impulsos em vez de agir sobre eles",
    type: "video",
    link: "#"
  },
  {
    title: "Seu Cérebro na Pornografia: Pornografia na Internet e a Ciência Emergente da Dependência",
    description: "Um olhar abrangente de Gary Wilson sobre os efeitos da pornografia na internet",
    type: "book",
    link: "#"
  }
];