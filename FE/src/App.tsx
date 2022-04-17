import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/appRouter";
import client from "./utils/apollo";
import store from "./redux/store";
import { Provider } from "react-redux";
import ReactLoading from "react-loading";

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppRouter></AppRouter>
      </ApolloProvider>
    </Provider>
  );
};
export default App;
