const HASURA_ADMIN_URL = "https://movie-time-2023.hasura.app/v1/graphql";

const headers = {
  "Content-Type": "application/json",
  // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsImtleSI6InNvbWVzdXBlcnNlY3JldGVrZXloZXJlMTIzNHNvbWVzdXBlcnNlY3JldGVrZXloZXJlMTIzNCIsInR5cGUiOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pY2hlbGxlIFBlcmV6IE1vcmFsZXMiLCJpYXQiOjE2ODUxMjcxODgsImV4cCI6MTY4NTIxMzUxMywiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtdXNlci1pZCI6IjIifX0.pBImSFgFcm-1BuCcVKn6EivMEIXhSX5oKLN5ZzV24bs",
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
    }
  `;

export function fetchMyQuery() {
  return fetchGraphQL(operation, "MyQuery", {});
}
