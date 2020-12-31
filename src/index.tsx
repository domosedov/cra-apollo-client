import React from "react";
import ReactDOM from "react-dom";
import "focus-visible";
import "./tailwind.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorModeProvider } from "./components/ColorModeProvider";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

const typeDefs = gql`
  extend type Query {
    isAdmin: Boolean!
  }
`;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isAdmin: {
            read() {
              return true;
            },
          },
          someText: {
            read() {
              return "Some text";
            },
          },
        },
      },
    },
  }),
  typeDefs,
  connectToDevTools: true,
});

export const isAdminVar = makeVar(false);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
