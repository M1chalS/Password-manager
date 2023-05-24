import {createContext, useContext, useEffect, useState} from "react";

const CurrentUserContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
})

export const CurrentUserProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);

    const setToken = async (token, user) => {
        _setToken(token);
        setUser(user);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('user');
            setUser(null);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('ACCESS_TOKEN')) {
            setToken(null, null);
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
