import {createContext, useContext, useEffect, useState} from "react";

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
            setUser(null);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('ACCESS_TOKEN')) {
            setToken(null);
        }

    }, []);

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
