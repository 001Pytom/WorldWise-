import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "faatihat",
  email: "fatihat@example.com",
  password: "fatihat",
  avatar: "https://avatars.githubusercontent.com/u/105353034?v=4",
};

function AuthProvider({ children }) {
  const initialState = { user: null, isAuthenticated: false };
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        };
      case "logOut":
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };

      default:
        throw new Error("Unkown Action");
    }
  }

  function login(email, password) {
    // normally here is where you should have the Api ca;
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logOut() {
    dispatch({ type: "logOut" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authentication was used outside the Auth Provider");

  return context;
}

export { AuthProvider, useAuth };
