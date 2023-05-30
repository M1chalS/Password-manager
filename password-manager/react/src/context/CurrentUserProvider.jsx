import {createContext, useContext, useEffect, useState} from "react";

const CurrentUserContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const CurrentUserProvider = ({children}) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem('USER')) || null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);

    const setToken = async (token, user) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
            setUser(user);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
            setUser(null);
        }
    }

    const setUser = (user) => {
        _setUser(user);

        if(user) {
            localStorage.setItem('USER', JSON.stringify(user));
        } else {
            localStorage.removeItem('USER');
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
