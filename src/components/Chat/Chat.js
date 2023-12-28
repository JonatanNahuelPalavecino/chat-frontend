import React, { useEffect, useState } from 'react'
import io from "socket.io-client"

const socket = io("http://localhost:8000")

export const Chat = () => {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
  
    const handleSubmit = (e) => {

      e.preventDefault()
      const newMessage = {
        data: message,
        from: "Me"
      }
      setMessages([ ...messages, newMessage])
      socket.emit("message", message)
  
    }

    const receiveMessage = (message) => {
        setMessages((state) => [...state, message])
    }
  
    useEffect(() => {
  
        socket.on("message", receiveMessage)

        return () => {
            socket.off("message", receiveMessage)
        }
  
    }, [messages])
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="write your message..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
        <ul>
          {
            messages.map((dato, index) => {
              return <li key={index}>{dato.from} : {dato.data}</li>
            })
          }
        </ul>
      </>
    );
}
