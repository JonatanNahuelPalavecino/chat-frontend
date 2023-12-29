import { createContext, useState } from "react";


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
            visibility
        }}>
            {children}
        </Context.Provider>
    )

}