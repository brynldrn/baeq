import PortfolioScene from '@/components/portfolio/PortfolioScene'
import { getPortfolioProjects } from '@/lib/projects.mjs'

export default async function PortfolioLayout({ children }) {
  const projects = await getPortfolioProjects()
  return <PortfolioScene projects={projects}>{children}</PortfolioScene>
}
