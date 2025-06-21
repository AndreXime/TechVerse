const categories = {
    'inteligencia-artificial': {
        name: 'INTELIGÊNCIA ARTIFICIAL',
        link: 'inteligencia-artificial',
    },
    hardware: {
        name: 'HARDWARE',
        link: 'hardware',
    },
    devops: {
        name: 'DEVOPS',
        link: 'devops',
    },
    retrowave: {
        name: 'RETROWAVE',
        link: 'retrowave',
    },
};

const posts: PostType[] = [
    // INTELIGÊNCIA ARTIFICIAL
    {
        id: '1',
        category: categories['inteligencia-artificial'],
        title: 'IA EM SAÚDE: DIAGNÓSTICOS PRECISOS',
        description: 'Como algoritmos de deep learning estão revolucionando a medicina.',
        content: `
      <p>Redes neurais auxiliam diagnósticos médicos.</p>
    `,
        tags: ['Deep Learning', 'Medicina', 'Saúde'],
        author: 'André',
        createdAt: new Date('2025-01-15'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=IA',
        link: 'ia-em-saude-diagnosticos-precisos',
    },
    {
        id: '2',
        category: categories['inteligencia-artificial'],
        title: 'REDES NEURAIS EXPLICÁVEIS',
        description: 'Transparência e confiança em sistemas de IA.',
        content: `
      <p>Entenda decisões de modelos de IA.</p>
    `,
        tags: ['XAI', 'Transparência', 'Machine Learning'],
        author: 'André',
        createdAt: new Date('2025-02-02'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=IA',
        link: 'redes-neurais-explicaveis',
    },
    {
        id: '3',
        category: categories['inteligencia-artificial'],
        title: 'IA E ÉTICA: LIMITES NECESSÁRIOS',
        description: 'Debate sobre vieses e governança em projetos de IA.',
        content: `
      <p>Discuta ética e viés em IA.</p>
    `,
        tags: ['Ética', 'Vieses', 'Governança'],
        author: 'André',
        createdAt: new Date('2025-03-10'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=IA',
        link: 'ia-e-etica-limites-necessarios',
    },
    {
        id: '4',
        category: categories['inteligencia-artificial'],
        title: 'CHATBOTS HUMANIZADOS',
        description: 'O futuro das interações homem-máquina.',
        content: `
      <p>Chatbots com respostas mais naturais.</p>
    `,
        tags: ['NLP', 'Voice Cloning', 'UX'],
        author: 'André',
        createdAt: new Date('2025-04-05'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=IA',
        link: 'chatbots-humanizados',
    },

    // HARDWARE
    {
        id: '5',
        category: categories['hardware'],
        title: 'SSD NVMe DE 8TB: VALE A PENA?',
        description: 'Testamos a nova geração de armazenamento rápido.',
        content: `
      <p>Benchmark de velocidade e capacidade.</p>
    `,
        tags: ['NVMe', 'Armazenamento', 'Benchmark'],
        author: 'André',
        createdAt: new Date('2025-02-20'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/22d3ee?text=Hardware',
        link: 'ssd-nvme-de-8tb-vale-a-pena',
    },
    {
        id: '6',
        category: categories['hardware'],
        title: 'PROCESSADORES RISC‑V EM ALTA',
        description: 'O open‑source que desafia as arquiteturas tradicionais.',
        content: `
      <p>Visão geral de CPUs RISC-V modernas.</p>
    `,
        tags: ['RISC‑V', 'CPU', 'Open Source'],
        author: 'André',
        createdAt: new Date('2025-03-15'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/22d3ee?text=Hardware',
        link: 'processadores-risc-v-em-alta',
    },
    {
        id: '7',
        category: categories['hardware'],
        title: 'MEMÓRIA 3D XPOINT: PRÓXIMA GERAÇÃO',
        description: 'Latência ultrabaixa e durabilidade para data centers.',
        content: `
      <p>Teste de latência e durabilidade.</p>
    `,
        tags: ['3D XPoint', 'Memória', 'Data Center'],
        author: 'André',
        createdAt: new Date('2025-01-30'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/22d3ee?text=Hardware',
        link: 'memoria-3d-xpoint-proxima-geracao',
    },
    {
        id: '8',
        category: categories['hardware'],
        title: 'MONITORES 8K: EXPERIÊNCIA VISUAL TOTAL',
        description: 'Tudo que você precisa saber antes de comprar.',
        content: `
      <p>Principais recursos de displays 8K.</p>
    `,
        tags: ['8K', 'Display', 'Tecnologia'],
        author: 'André',
        createdAt: new Date('2025-04-18'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/22d3ee?text=Hardware',
        link: 'monitores-8k-experiencia-visual-total',
    },

    // DEVOPS
    {
        id: '9',
        category: categories['devops'],
        title: 'GITOPS EM AÇÃO',
        description: 'Fluxos de trabalho que colocam o Git no centro das operações.',
        content: `
      <p>Automatize deploys com Git como fonte.</p>
    `,
        tags: ['GitOps', 'CI/CD', 'Kubernetes'],
        author: 'André',
        createdAt: new Date('2025-03-01'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/8b5cf6?text=DevOps',
        link: 'gitops-em-acao',
    },
    {
        id: '10',
        category: categories['devops'],
        title: 'KUBERNETES VS NOMAD',
        description: 'Comparativo entre as duas principais plataformas de orquestração.',
        content: `
      <p>Comparação de recursos e desempenho.</p>
    `,
        tags: ['Kubernetes', 'Nomad', 'Orquestração'],
        author: 'André',
        createdAt: new Date('2025-02-25'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/8b5cf6?text=DevOps',
        link: 'kubernetes-vs-nomad',
    },
    {
        id: '11',
        category: categories['devops'],
        title: 'CI/CD SEM DOR: MELHORES PRÁTICAS',
        description: 'Dicas para pipelines mais ágeis e confiáveis.',
        content: `
      <p>Templates simples para pipelines robustas.</p>
    `,
        tags: ['CI/CD', 'Automação', 'Pipelines'],
        author: 'André',
        createdAt: new Date('2025-04-01'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/8b5cf6?text=DevOps',
        link: 'ci-cd-sem-dor-melhores-praticas',
    },
    {
        id: '12',
        category: categories['devops'],
        title: 'INFRAESTRUTURA COMO CÓDIGO',
        description: 'Ferramentas e técnicas para versionar seu datacenter.',
        content: `
      <p>IaC: versões e repetibilidade de infra.</p>
    `,
        tags: ['IaC', 'Terraform', 'Ansible'],
        author: 'André',
        createdAt: new Date('2025-03-22'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/8b5cf6?text=DevOps',
        link: 'infraestrutura-como-codigo',
    },

    // RETROWAVE
    {
        id: '13',
        category: categories['retrowave'],
        title: 'AMSTRAD CPC REVIVAL',
        description: 'O ressurgimento desse clássico dos anos 80.',
        content: `
      <p>Software moderno em hardware retrô.</p>
    `,
        tags: ['Amstrad', 'Retro', 'Demoscene'],
        author: 'André',
        createdAt: new Date('2025-02-10'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=Retrowave',
        link: 'amstrad-cpc-revival',
    },
    {
        id: '14',
        category: categories['retrowave'],
        title: 'MÚSICA CHIPTUNE ATUALIZADA',
        description: 'Produtores que misturam sintetizadores vintage e EDM.',
        content: `
      <p>Fusão de sons 8-bit e eletrônicos.</p>
    `,
        tags: ['Chiptune', 'Música', 'EDM'],
        author: 'André',
        createdAt: new Date('2025-04-12'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=Retrowave',
        link: 'musica-chiptune-atualizada',
    },
    {
        id: '15',
        category: categories['retrowave'],
        title: 'FITAS CASSETE DIGITAIS',
        description: 'Quando o analógico encontra o streaming.',
        content: `
      <p>Qualidade vintage em serviços modernos.</p>
    `,
        tags: ['Cassete', 'Vintage', 'Streaming'],
        author: 'André',
        createdAt: new Date('2025-03-05'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=Retrowave',
        link: 'fitas-cassete-digitais',
    },
    {
        id: '16',
        category: categories['retrowave'],
        title: 'ARTE ANSI: BEAUTIFUL TEXT',
        description: 'Galerias e eventos dedicados à arte em caracteres.',
        content: `
      <p>Painéis e demonstrações de arte em ANSI.</p>
    `,
        tags: ['ANSI', 'ASCII Art', 'Retro'],
        author: 'André',
        createdAt: new Date('2025-01-25'),
        imageUrl: 'https://placehold.co/600x400/0d0c1d/ec4899?text=Retrowave',
        link: 'arte-ansi-beautiful-text',
    },
];
export default posts;
