import React, { ReactNode } from "react";

import { render, RenderResult } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import GlobalStyle from "~/App/globalStyles";
import AppThemeProvider from "~/providers/AppThemeProvider";
import UserSessionProvider from "~/providers/UserSessionProvider";

export const renderWithContext = (children: ReactNode): RenderResult => {
  return render(
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
          {children}
        </RecoilRoot>
      </UserSessionProvider>
    </AppThemeProvider>
  );
};
