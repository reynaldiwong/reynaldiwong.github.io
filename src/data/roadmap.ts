export const roadmapData = [
  {
    phase: 'Phase 1: Prerequisites',
    description: 'Foundational knowledge required before diving into DevOps.',
    nodes: [
      { name: 'Linux', status: 'planned', link: null },
      { name: 'Networking', status: 'planned', link: null },
      { name: 'Git', status: 'planned', link: null },
    ]
  },
  {
    phase: 'Phase 2: Containerization',
    description: 'Packaging applications for consistency across environments.',
    nodes: [
      { name: 'Docker', status: 'planned', link: null },
    ]
  },
  {
    phase: 'Phase 3: Orchestration',
    description: 'Managing containerized applications at scale.',
    nodes: [
      { name: 'Kubernetes', status: 'in-progress', link: '/blog/what-is-kubernetes' },
    ]
  },
  {
    phase: 'Phase 4: CI/CD',
    description: 'Automating the software delivery process.',
    nodes: [
      { name: 'Jenkins', status: 'planned', link: null },
      { name: 'GitHub Actions', status: 'planned', link: null },
    ]
  },
  {
    phase: 'Phase 5: IaC',
    description: 'Managing infrastructure through code.',
    nodes: [
      { name: 'Terraform', status: 'planned', link: null },
      { name: 'Ansible', status: 'planned', link: null },
    ]
  },
  {
    phase: 'Phase 6: Monitoring',
    description: 'Observing the health and performance of systems.',
    nodes: [
      { name: 'Prometheus', status: 'planned', link: null },
      { name: 'Grafana', status: 'planned', link: null },
    ]
  }
];
