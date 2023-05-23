import {createContext, useContext, useState} from "react";

const CurrentUserContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
})

export const CurrentUserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <CurrentUserContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);
