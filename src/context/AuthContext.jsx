import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  // Show a full-screen loader while Firebase resolves auth state.
  // Without this, the app renders nothing (blank page) during the async check.
  if (user === undefined) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0f1014",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          border: "4px solid #1f80e0",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
