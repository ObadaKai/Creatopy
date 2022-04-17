import { createHttpLink, from, ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";

const linkHttp = createHttpLink({ uri: "http://localhost:8000/graphql" });
const errorLink = onError(({ graphQLErrors, networkError }) => {
  toast(networkError ? `${networkError} for calling Graphql` : "Error Occured while calling Graphql endpoint");
  console.error(graphQLErrors);
});
const link = from([errorLink, linkHttp]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default client;
