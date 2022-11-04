import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import BaseElements from "../elements/_base";

export const useElements = () => {
  const authContext = useContext(AuthContext);
  const [elements, setElements] = useState(BaseElements);

  useEffect(() => {
    if (authContext && authContext.elements) {
      setElements(authContext.elements);
    }
  }, [authContext]);

  return elements;
};
