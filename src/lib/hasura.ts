const HASURA_ADMIN_URL = "https://movie-time-2023.hasura.app/v1/graphql";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
};

function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) {
  return fetch(HASURA_ADMIN_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  }).then((result) => result.json());
}

const operation = `
    query MyQuery {
      users {
        id
        user
        email
      }
      stats {
        favorite
        id
        userId
        videoId
        watched
      }
    }
  `;

export function fetchMyQuery() {
  return fetchGraphQL(operation, "MyQuery", {});
}
