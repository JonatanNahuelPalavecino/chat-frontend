import { createContext, useState } from "react";
import io from "socket.io-client"

const socket = io("http://localhost:8000")

export const Context = createContext()

export const ContextProvider = ({children}) => {

    const [login, setLogin] = useState({
        estado: false,
        usuario: "Usuario no conectado"
    })
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [visibility, setVisibility] = useState(false)

    return(
        <Context.Provider value={{
            setLogin,
            login,
            setEmail,
            email,
            setPass,
            pass,
            setVisibility,
            visibility,
            socket,
        }}>
            {children}
        </Context.Provider>
    )

}