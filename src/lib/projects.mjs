import projectData from '../data/projects.json' with { type: 'json' }

export function normalizeProject(project) {
  if (!project?.id) throw new Error('Project ID is required')
  if (!project?.name) throw new Error('Project name is required')

  return {
    ...project,
    year: String(project.year ?? ''),
    position: project.position ?? '',
    url: project.url ?? '',
    summary: project.summary ?? '',
    tech: project.tech ?? '',
    stack: Array.isArray(project.stack) ? project.stack : [],
    longMd: project.longMd ?? '',
    siteLogo: project.siteLogo?.url ? { ...project.siteLogo } : null,
    imageCap: project.imageCap?.url ? { ...project.imageCap } : null,
    gallery: Array.isArray(project.gallery) ? project.gallery.filter((image) => image?.url) : [],
  }
}

const projects = projectData.map(normalizeProject)

export async function getProjects() {
  return projects
}

export async function getProject(id) {
  if (!id) return null
  return (await getProjects()).find((project) => project.id === id) ?? null
}

export async function getPortfolioProjects() {
  return getProjects()
}

export async function getPortfolioProject(id) {
  if (!id) return null
  return (await getPortfolioProjects()).find((project) => project.id === id) ?? null
}
