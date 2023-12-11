import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

interface AuthContextValue {
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  signedIn: false,
  setSignedIn: () => {},
  loading: true
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
