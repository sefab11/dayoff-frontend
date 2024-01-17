import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export const SessionContextProvider = ({children}) => {
    const [sessionToken, setSessionToken] = useState(null);
    
    return <SessionContext.Provider value={{
        sessionToken, setSessionToken
    }}>
        {children}
    </SessionContext.Provider>
}

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSessionContext must be used within an SessionContextProvider');
    }
    return context;
}

export default SessionContext;