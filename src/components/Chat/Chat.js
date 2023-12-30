import React, { useContext, useEffect, useState } from 'react'
import "./Chat.css"
import { Context } from '../Context/Context'
import { Navigate } from 'react-router-dom'

export const Chat = () => {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const {login, socket, setLogin} = useContext(Context)

    
    const receiveMessage = (message) => {
        setMessages((state) => [...state, message])
    }

    useEffect(() => {
      
      if (login.estado) {

        socket.on("message", receiveMessage);

        socket.emit('userOnLine', login.usuario)

        socket.on('userOnLine', (usersOnLine) => {
          console.log(usersOnLine);
        })

        return () => {

          socket.off("message", receiveMessage)

        }
      }
  
    }, [login, socket])

    //console.log(users);

    if (!login.estado) {
      return <Navigate to="/"/>;
    }

    const handleInput = (e) => {
        setMessage(e.target.value)
    }

    const form = document.getElementById("form")
  
    const handleSubmit = (e) => {

      e.preventDefault()
      const newMessage = {
        data: message,
        from: "Me"
      }
      setMessages([ ...messages, newMessage])
      socket.emit("message", message)

      form.reset()
  
    }

    const handleClose = () => {

      socket.emit("logout", login.usuario)
      setLogin({
        estado: false,
        usuario: "Usuario no conectado"
    })
      return <Navigate to="/"/>
      
    }
    
  
    return (
      <>
        <p>Usuario {login.usuario} conectado</p>
        
        <button onClick={handleClose}>SALIR DEL CHAT</button>
        <form id='form' onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="write your message..."
            onChange={handleInput}
          />
          <button type='submit'>Send</button>
        </form>
        <ul>
          {
            messages.map((dato, index) => {
              return <li key={index} className={dato.from === "Me" ? "bubble-one" : "bubble-two"}>
                        {dato.from} : {dato.data}
                    </li>
            })
          }
        </ul>
      </>
    );
}
