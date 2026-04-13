import { useState } from "react";
import type {FC} from 'react'
import { RegisterForm } from ".";
import { FinishRegister } from "./FinishRegister";
import "./_RegisterForm.scss"

type Props = {
    setAuthType: (authType: "login" | "register") => void;
}

export const RegisterLayout: FC<Props> = ({ setAuthType }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  

  if (isCompleted) {
    return <FinishRegister setAuthType={setAuthType}/>
  } else {
    return <RegisterForm setAuthType={setAuthType} onSuccess={() => setIsCompleted(true)}/>
  }
}