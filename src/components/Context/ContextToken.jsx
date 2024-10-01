import { createContext, useState,useEffect } from "react";
import PropTypes from "prop-types";

export const ContextToken = createContext();

export default function ContextTokenProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
const userToken = localStorage.getItem("token")
setToken(userToken)
  }, [])


  return (
    <ContextToken.Provider value={{ token, setToken }}>
      {children}
    </ContextToken.Provider>
  );
}

ContextTokenProvider.propTypes = {
  children: PropTypes.node.isRequired
};
