import { createContext, useContext, useState } from 'react';

interface ContextValues {
  message: string | undefined;
  alert: (message: string) => void;
}

// @ts-ignore
const SnackBarContext = createContext<ContextValues>();

function SnackBarProvider({ children }) {
  const [message, setMessage] = useState<string>();

  const value: ContextValues = {
    alert: message => {
      setMessage(message);
    },
    message,
  };

  return (
    <SnackBarContext.Provider value={value}>
      {children}
    </SnackBarContext.Provider>
  );
}

const useSnackBarStore = () => useContext(SnackBarContext);

export { useSnackBarStore, SnackBarProvider };
