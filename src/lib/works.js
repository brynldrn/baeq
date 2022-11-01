import { gql } from '@apollo/client';
import client from '../../apollo-client';

export async function getAllWorks() {
  const { data } = await client.query({
    query: gql`
      {
        projects(orderBy: year_DESC) {
          id
        }
      }
    `
  });

  return data.projects.map(({ id }) => {
    return {
      params: {
        id
      }
    }
  });
}

export async function getById(id = null) {
  const { data } = await client.query({
    query: gql`
      query Project($id: ID) {
          project(where: { id: $id }) {
          id,
          name,
          year,
          imageCap {
            url
          },
          longMd,
          gallery {
            id
          }
        }
      }
    `,
    variables: {
      id
    }
  });

  return data;
}
