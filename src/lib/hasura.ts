/*
This is an example snippet - you should consider tailoring it
to your service.

Note: we only handle the first operation here
*/

function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
) {
  return fetch("https://movie-time-2023.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "fikGpmD96UiaYEAZKeIDRRB163efpTyLduvE3im62T5C7ojvgiOgkgdupahcAGJu",
    },
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
