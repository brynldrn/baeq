const endpoint = 'https://api-ap-northeast-1.graphcms.com/v2/cjqxhy3af88o801dnxok0ru3c/master'

const query = `
  query Projects {
    projects(orderBy: year_DESC) {
      id
      name
      year
      url
      position
      longMd
      imageCap { url }
      gallery { id url }
    }
  }
`

let projectsRequest

export function normalizeProject(project) {
  if (!project?.id) throw new Error('Project ID is required')
  if (!project?.name) throw new Error('Project name is required')

  return {
    id: project.id,
    name: project.name,
    year: project.year ?? '',
    position: project.position ?? '',
    url: project.url ?? '',
    longMd: project.longMd ?? '',
    imageCap: project.imageCap?.url ? { url: project.imageCap.url } : null,
    gallery: Array.isArray(project.gallery) ? project.gallery.filter((image) => image?.url) : [],
  }
}

async function requestProjects() {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  })

  if (!response.ok) throw new Error(`Project request failed with HTTP ${response.status}`)

  const payload = await response.json()

  if (payload.errors?.length) throw new Error(payload.errors[0].message)
  if (!Array.isArray(payload.data?.projects)) throw new Error('Project response is missing projects')

  return payload.data.projects.map(normalizeProject)
}

export function getProjects() {
  projectsRequest ??= requestProjects().catch((error) => {
    projectsRequest = undefined
    throw error
  })

  return projectsRequest
}

export async function getProject(id) {
  if (!id) return null
  return (await getProjects()).find((project) => project.id === id) ?? null
}

export async function getPortfolioProjects() {
  return mergeFeaturedProjects(await getProjects())
}

export async function getPortfolioProject(id) {
  if (!id) return null
  return (await getPortfolioProjects()).find((project) => project.id === id) ?? null
}
import { mergeFeaturedProjects } from './portfolio-projects.mjs'
