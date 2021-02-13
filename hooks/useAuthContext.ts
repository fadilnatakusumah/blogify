import { useEffect, useState } from "react"
import { getCookie, getLocalStorage } from "../api/auth";
export interface AuthContextTypes {
  user?: any,
  token?: string
}

export const useAuthContext = () => {
  useEffect(() => {
    const user = getLocalStorage('user');
    const token = getCookie('token');
    if (user && token) {
      setAuthState({ user: JSON.parse(user), token });
    }
  }, [])

  const [authState, setAuthState] = useState<AuthContextTypes>({
    user: null,
    token: '',
  });

  return {
    authState,
    setAuthState
  }
}