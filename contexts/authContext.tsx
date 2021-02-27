import { createContext, useContext, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { AuthContextTypes } from "../hooks/useAuthContext";

export const authStoreContext = createContext<AuthStateTypes>({});

interface AuthStateTypes {
  authState?: AuthContextTypes,
  setAuthState?: Function,
}

export const { Consumer: ContextConsumer, Provider } = authStoreContext;

export const AuthContextProvider = ({ children }: any) => {
  const { authState, setAuthState } = useAuthContext()

  return (
    <Provider value={{ authState, setAuthState }}>
      {children}
    </Provider>
  )
}

export const useAuthContextValue = (): AuthStateTypes => useContext(authStoreContext);