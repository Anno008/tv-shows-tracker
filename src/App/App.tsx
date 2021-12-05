import React from "react";

import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import GlobalStyle from "./globalStyles";
import TmDbAttribution from "~/components/TmDbAttribution";
import AppNavigation from "~/navigation/AppNavigation";
import AppThemeProvider from "~/providers/AppThemeProvider";
import UserSessionProvider from "~/providers/UserSessionProvider";
import "react-toastify/dist/ReactToastify.css";

const App = (): JSX.Element => (
  <AppThemeProvider>
    <UserSessionProvider>
      <RecoilRoot>
        <ToastContainer
          theme="light"
          position="top-right"
          style={{ top: "70px" }}
          autoClose={5000}
        />
        <GlobalStyle />
        <AppNavigation />
        <TmDbAttribution />
      </RecoilRoot>
    </UserSessionProvider>
  </AppThemeProvider>
);

export default App;
