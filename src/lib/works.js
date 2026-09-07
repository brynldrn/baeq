import { getProject, getProjects } from './projects.mjs';

export async function getAllWorks() {
  return (await getProjects()).map(({ id }) => {
    return {
      params: {
        id
      }
    }
  });
}

export async function getById(id = null) {
  return { project: await getProject(id) };
}
