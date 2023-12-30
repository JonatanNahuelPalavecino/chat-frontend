import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Context/Context'
import "./SignIn.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


export const SignIn = () => {

    const {email, setEmail, pass, setPass, visibility, setVisibility} = useContext(Context)
    const type = !visibility ? "password" : "text"

    const navigate = useNavigate()

    const peticionDeRegistro = async () => {


        await fetch("http://localhost:8000/signin-with-email", {
            method: "POST",
            body: new URLSearchParams({
                email: email,
                pass: pass,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                'access-control-allow-origin': "http://localhost:8000/signin-with-email",
                //"Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                navigate("/")
            } else {
                console.log("El usuario no se pudo registrar por un error");
            }
        })
        .catch((err) => {
            console.log("Error en la peticion de registro de usuario: ", err);
        })
    }

    const handleVisibility = () => {
        setVisibility(!visibility)
    }

    const handleLoginWithEmail = (e) => {
        e.preventDefault()
        peticionDeRegistro()
        
    }


    return (
        <>
            <section className='signin'>
                <p className='signin-title'>REGISTRATE PARA CHATEAR</p>
                <form className='signin-form'>
                    <div className='signin-box'>
                        <label className='signin-subtitle'>EMAIL</label>
                        <input 
                            type='text' 
                            placeholder='ingresa tu email'
                            onChange={(e) => setEmail(e.target.value)}
                            className='signin-input'
                        />
                    </div>
                    <div className='signin-box'>
                        <label className='signin-subtitle'>PASSWORD</label>
                        <div className='signin-pass'>
                            <input 
                                type={type} 
                                placeholder='ingresa tu email'
                                onChange={(e) => setPass(e.target.value)}
                                className='signin-input'
                            />
                            {
                                !visibility
                                ?
                                    <FaEye 
                                        className='signin-vis' 
                                        onClick={handleVisibility}
                                    />
                                :
                                    <FaEyeSlash 
                                        className='signin-vis' 
                                        onClick={handleVisibility}
                                    />
                            }
                        </div>
                    </div>
                    <div className='signin-btns'>
                        <button className='signin-btn' onClick={handleLoginWithEmail}>REGISTRATE</button>
                        <button className='signin-btn signin-google'>REGISTRATE CON <FcGoogle className='icon-google'/></button>
                        <button className='signin-btn' onClick={() => navigate("/")}>INICIAR SESION</button>
                    </div>
                </form>
            </section>
        </>
    )
}
