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
          setUsers(usersOnLine);
        })

        return () => {

          socket.off("message", receiveMessage)

        }
      }
  
    }, [login, socket])

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
    
    //console.log(users);
  
    return (
      <>
        <main className='chat'>

          <div className='chat-box one'>

            <p className='chat-title'>CHAT</p>

            <div className='chat-user'>
              <p className='chat-subtitle'>Usuario {login.usuario} conectado</p>
              <button className='chat-btn exit' onClick={handleClose}>SALIR DEL CHAT</button>
            </div>

          </div>

          <div className='chat-box two'>

            <div className='chat-container'>
              <ul className='chat-messages'>
                {
                  messages.map((dato, index) => {
                    return (
                      <li 
                        key={index} 
                        className={dato.from === "Me" ? "bubble-one" : "bubble-two"}
                      >
                        {dato.from} : {dato.data}
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <form id='form' className='chat-form' onSubmit={handleSubmit}>
              <input 
              className='chat-input'
                type="text" 
                placeholder="write your message..."
                onChange={handleInput}
              />
              <button 
                className='chat-btn send' 
                type='submit'
              >
                ENVIAR
              </button>
            </form>

          </div>

          <div className='chat-box three'>
            <p>Usuarios conectados:</p>
            <ul>     
              {
                users.map((user, index) => {
                  return (
                    <li 
                      key={index}
                    >
                      {user.usuario}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </main>
      </>
    );
}
