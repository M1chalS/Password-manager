import {createContext, useContext, useEffect, useState} from "react";

const WindowSizeContext = createContext({
    windowWidth: null,
    windowHeight: null,
});

export const WindowSizeProvider = ({children}) => {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (<WindowSizeContext.Provider value={{
        windowWidth: windowSize[0],
        windowHeight: windowSize[1],
    }}>
        {children}
    </WindowSizeContext.Provider>);

}

export const useWindowSizeContext = () => useContext(WindowSizeContext);
