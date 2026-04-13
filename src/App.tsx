import { useState } from "react";
import { Header } from "./components/Header/Header"
import { Routs } from "./Routs"
import { Footer } from "./components/Footer/Footer"
import { AuthForm } from "./components/AuthForm/AuthForm";
import "../style.scss"


export const App = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <div className="container">
      <Header onLoginClick={() => setIsAuthOpen(true)}/>
      <main className="main">
        <Routs/>
      </main>
      <Footer/>
      {isAuthOpen && (
        <div
          className="modal-overlay"
        >
            <AuthForm onClose={() => setIsAuthOpen(false)}/>
        </div>
      )}
    </div>     
  )
}