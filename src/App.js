import { Chat } from "./components/Chat/Chat.js"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ContextProvider } from "./components/Context/Context.js";
import { SignIn } from "./components/SignIn/SignIn.js";
import { Login } from "./components/Login/Login.js";


function App() {

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
    </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
