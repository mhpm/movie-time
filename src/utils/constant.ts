export const baseUrl = "https://image.tmdb.org/t/p/original/";

export enum EStatus {
  loading = "loading",
  authenticated = "authenticated",
  unauthenticated = "unauthenticated",
}

export enum ERequestMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}
