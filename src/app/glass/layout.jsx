import PortfolioScene from '@/components/portfolio/PortfolioScene'
import { getPortfolioProjects } from '@/lib/projects.mjs'
import '@/components/portfolio/portfolio.css'

export default async function GlassLayout({ children }) {
  const projects = await getPortfolioProjects()
  return <PortfolioScene projects={projects} basePath="/glass">{children}</PortfolioScene>
}
