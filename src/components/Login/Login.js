import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Context/Context'
import "./Login.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { autenticacion } from '../Firebase/Config';

export const Login = () => {

    const {email, setEmail, pass, setPass, visibility, setVisibility, setLogin, socket} = useContext(Context)
    const type = !visibility ? "password" : "text"

    useEffect(() => {

        socket.connect()

    }, [socket])


    const navigate = useNavigate()

    const peticionDeInicioConEmail = async () => {

        const id = socket.id

        await fetch("http://localhost:8000/login-with-email", {
            method: "POST",
            body: new URLSearchParams({
                email: email,
                pass: pass,
                socketId: id
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                'access-control-allow-origin': "http://localhost:8000/login-with-email",
                //"Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setLogin({
                    estado: true,
                    usuario: data.success
                })
                
                navigate("/chat")
            } else {
                console.log("El usuario no pudo iniciar sesion por un error");
            }
        })
        .catch((err) => {
            console.log("Error en la peticion de inicio de sesion: ", err);
        })
    }

    const conectarUsuarioGoogle = async (mail) => {

        const id = socket.id

        await fetch("http://localhost:8000/login-with-google", {
            method: "POST",
            body: new URLSearchParams({
                email: mail,
                socketId: id
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                'access-control-allow-origin': "http://localhost:8000/login-with-email",
                //"Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setLogin({
                    estado: true,
                    usuario: mail
                })
                navigate("/chat")
            } else {
                console.log("El usuario no pudo iniciar sesion con Google por un error");
            }
        })
        .catch((err) => {
            console.log("Error en la peticion de inicio de sesion con Google: ", err);
        })

    }

    const peticionDeInicioConGoogle = async () => {
    
        const provider = new GoogleAuthProvider();
  
        signInWithPopup(autenticacion, provider)
            .then((data) => {
                conectarUsuarioGoogle(data.user.email)
            })
            .catch((err) => {
                console.log("Error al iniciar con Google: ", err);
        })

    }

    const handleVisibility = () => {
        setVisibility(!visibility)
    }

    const handleLoginWithEmail = (e) => {
        e.preventDefault()
        peticionDeInicioConEmail()
    }

    const handleLoginWithGoogle = (e) => {
        e.preventDefault()
        peticionDeInicioConGoogle()
    }


    return (
        <>
            <section className='login'>
                <p className='login-title'>INICIA SESION PARA CHATEAR</p>
                <form className='login-form'>
                    <div className='login-box'>
                        <label className='login-subtitle'>EMAIL</label>
                        <input 
                            type='text' 
                            placeholder='ingresa tu email'
                            onChange={(e) => setEmail(e.target.value)}
                            className='login-input'
                        />
                    </div>
                    <div className='login-box'>
                        <label className='login-subtitle'>PASSWORD</label>
                        <div className='login-pass'>
                            <input 
                                type={type} 
                                placeholder='ingresa tu email'
                                onChange={(e) => setPass(e.target.value)}
                                className='login-input'
                            />
                            {
                                !visibility
                                ?
                                    <FaEye 
                                        className='login-vis' 
                                        onClick={handleVisibility}
                                    />
                                :
                                    <FaEyeSlash 
                                        className='login-vis' 
                                        onClick={handleVisibility}
                                    />
                            }
                        </div>
                    </div>
                    <div className='login-btns'>
                        <button 
                            className='login-btn' 
                            onClick={handleLoginWithEmail}
                        >
                            INICIAR SESION
                        </button>
                        <button 
                            className='login-btn login-google'
                            onClick={handleLoginWithGoogle}
                        >
                            INICIAR SESION CON <FcGoogle className='icon-google'/>
                        </button>
                        <button className='login-btn' onClick={() => navigate("/sign-in")}>REGISTRATE</button>
                    </div>
                </form>
            </section>
        </>
    )

}
