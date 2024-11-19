"use client";

import { ApolloProvider as ApolloHooksProvider } from "@apollo/client";
import client from "./apolloClient";

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
};

export default ApolloProvider;