import {createContext, useContext, useState} from "react";
import {Toast} from "react-bootstrap";

const CurrentUserContext = createContext({
    setInfo: () => {
    },
    info: null,
});

export const InfoToastProvider = ({children}) => {
    const [info, setInfo] = useState("");

    return <CurrentUserContext.Provider value={{
        setInfo,
    }}>
        <div className="sticky-top" style={{zIndex: 1500, height: 0, top: 10 }}>
            <div className="position-absolute" style={{ left: 10 }}>
                <Toast onClose={() => setInfo("")}
                       show={!!info} delay={4000} autohide>
                    <Toast.Header closeButton={false}>
                        <strong>Info</strong>
                    </Toast.Header>
                    <Toast.Body>{info}</Toast.Body>
                </Toast>
            </div>
        </div>
        {children}
    </CurrentUserContext.Provider>;
}
export const useInfoToastContext = () => useContext(CurrentUserContext);
