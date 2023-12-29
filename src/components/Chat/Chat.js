import React, { useContext, useEffect, useState } from 'react'
import io from "socket.io-client"
import "./Chat.css"
import { Context } from '../Context/Context'
import { Navigate } from 'react-router-dom'

const socket = io("http://localhost:8000")

export const Chat = () => {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const {login} = useContext(Context)
    
    const receiveMessage = (message) => {
        setMessages((state) => [...state, message])
    }

    useEffect(() => {

      socket.on("message", receiveMessage);

      return () => {
          socket.off("message", receiveMessage)
      }
  
    }, [messages])

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
    
  
    return (
      <>
        <p>Usuario {login.usuario} conectado</p>
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
