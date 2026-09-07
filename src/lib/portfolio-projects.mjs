const featured = [
  {
    id: 'daycare-management-platform',
    name: 'Daycare Management Platform',
    year: '2023—Now',
    position: 'Technical Lead',
    summary: 'A real-time school operations platform connecting administrators, teachers, and parents.',
    stack: ['Next.js', 'TypeScript', 'ShadCN', 'Zustand'],
    longMd: 'Led architecture and technical direction for schedules, student records, and real-time messaging across a multi-role education platform.',
    visual: 'system',
  },
  {
    id: 'mikon-web-app-v2',
    name: 'Mikon Web App v2',
    year: '2023',
    position: 'Technical Lead',
    summary: 'A ground-up Next.js rebuild with a new service layer and a faster, clearer product experience.',
    stack: ['Next.js', 'TypeScript', 'REST', 'AWS'],
    longMd: 'Led the frontend rebuild of an enterprise customer portal, introducing a dedicated service layer, stronger performance, and a more maintainable product foundation.',
    visual: 'system',
  },
  {
    match: /whoop/i,
    name: 'WHOOP Year in Review',
    year: '2021',
    position: 'Frontend Developer',
    summary: 'A personalized, data-driven year-in-review experience with generated video.',
    stack: ['Gatsby', 'Prismic', 'GraphQL', 'Remotion'],
    visual: 'image',
  },
  {
    match: /rally/i,
    name: 'Rally.io',
    year: '2021',
    position: 'Frontend Developer',
    summary: 'Two connected Next.js experiences powered by Contentful, GraphQL, and static generation.',
    stack: ['Next.js', 'Contentful', 'GraphQL', 'SSG'],
    visual: 'image',
  },
  {
    id: 'productivity-extension',
    name: 'Internal Productivity Extension',
    year: '2021',
    position: 'Hackathon · 1st Place',
    summary: 'A browser workflow joining time tracking, Jira logging, and Slack in one focused tool.',
    stack: ['React', 'Firebase', 'Jira API', 'Slack API'],
    longMd: 'Built a browser extension that combined internal time tracking, Jira logging, and Slack integration. The project won first place at the company hackathon.',
    visual: 'system',
  },
]

export function mergeFeaturedProjects(cmsProjects) {
  return featured.map(({ match, ...project }) => {
    if (!match) return { ...project, url: '', imageCap: null, gallery: [] }

    const cmsProject = cmsProjects.find(({ name = '' }) => match.test(name))

    return {
      ...cmsProject,
      ...project,
      id: cmsProject?.id ?? project.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replaceAll(/(^-|-$)/g, ''),
      url: cmsProject?.url ?? '',
      longMd: cmsProject?.longMd || project.summary,
      imageCap: cmsProject?.imageCap ?? null,
      gallery: cmsProject?.gallery ?? [],
    }
  })
}
