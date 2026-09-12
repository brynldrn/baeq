import { notFound } from 'next/navigation'
import ProjectPanel from '@/components/portfolio/ProjectPanel'
import { getPortfolioProject, getPortfolioProjects } from '@/lib/projects.mjs'

export async function generateStaticParams() {
  return (await getPortfolioProjects()).map(({ id }) => ({ id }))
}

export async function generateMetadata({ params }) {
  const project = await getPortfolioProject((await params).id)
  return project ? { title: `${project.name} | Orbital Glass` } : {}
}

export default async function GlassProjectPage({ params }) {
  const project = await getPortfolioProject((await params).id)
  if (!project) notFound()
  return <ProjectPanel project={project} returnPath="/glass" />
}
