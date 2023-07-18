import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState(() => {
        const storedUserName = localStorage.getItem("userName");
        return storedUserName || null;
    });

    const login = (userName) => {
        localStorage.setItem("userName", userName);
        setUserName(userName);
    };

    const logout = () => {
        localStorage.removeItem("userName");
        setUserName(null);
    };

    return (
        <AuthContext.Provider value={{ userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const { userName, login, logout } = useContext(AuthContext);
    return { userName, login, logout };
};
