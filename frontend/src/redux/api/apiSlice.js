import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// path from where we fetch the data
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  // the endpoint is where we fetch the data from and perfrom some operatios (crud - post,get,put and delete) since there are multiple operations we use users.js to define them (also builder parameters is passed to endpoints to build crud query) - we have use apiSlice.injectEndpoints for this and them pass out url method body(data) ... mutations is for change/update , query is for fetching/get
  endpoints: () => ({}),
});
