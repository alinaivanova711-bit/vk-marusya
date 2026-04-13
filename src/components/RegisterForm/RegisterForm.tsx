import { FormField } from "../FormField";
import { useMutation } from '@tanstack/react-query';
import { useState, type FC } from 'react';
import { Button } from "../../ui/Button/Button";
import "./_RegisterForm.scss";
import { registerUser } from "../../api/auth";
import {queryClient} from "../../service/queryClient"
import { z } from "zod";
import{useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IconEmail from "../../assets/email.svg?react";
import IconPassword from "../../assets/password.svg?react";
import IconUser from "../../assets/user.svg?react";


type RegisterFormProps = {
  onSuccess?: () => void;
  setAuthType: (authType: "login" | "register") => void;
};

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  surname: z.string().min(2),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type RegisterQueryValues = Omit<RegisterFormValues, 'confirmPassword'>

export const RegisterForm = ({onSuccess, setAuthType}:RegisterFormProps) => {

  
  const{register, handleSubmit, formState:{errors}} = useForm<RegisterFormValues>({
    resolver:zodResolver(RegisterSchema)
  })

  const registerMutation = useMutation({
    mutationFn: ({ email, name, surname, password}: RegisterQueryValues) =>
    registerUser({ email, name, surname, password}),
    onSuccess() {
      queryClient.invalidateQueries({queryKey:["users", "me"]});
      onSuccess?.();
    },
  });

  return( 
    <>
      <h2>Регистрация</h2>
      <form className="register-form" onSubmit={handleSubmit(({email, name, surname, password})=>{
        registerMutation.mutate({email, name, surname, password})
      })}>
      <FormField className={`register-form__field ${errors.email ? "register-form__field--error" : ""}`}>
          <input placeholder="Электронная почта" {...register("email")}/>
          <IconEmail className="register-form__icon"/>
        </FormField>
        <FormField className={`register-form__field ${errors.name ? "register-form__field--error" : ""}`}>
          <input  placeholder="Имя" {...register("name")}/>
          <IconUser className="register-form__icon"/>
        </FormField>
        <FormField className={`register-form__field ${errors.surname ? "register-form__field--error" : ""}`}>
          <input placeholder="Фамилия" {...register("surname")}/>
          <IconUser className="register-form__icon"/>
        </FormField>
        <FormField className={`register-form__field ${errors.password ? "register-form__field--error" : ""}`}>
          <input type="password" placeholder="Пароль" {...register("password")}/>
          <IconPassword className="register-form__icon"/>
        </FormField>
        <FormField className={`register-form__field ${errors.confirmPassword ? "register-form__field--error" : ""}`}>
          <input type="password" placeholder="Подтвердите пароль" {...register("confirmPassword")} />
          <IconPassword className="register-form__icon"/>
        </FormField>
          {registerMutation.error && (
            <span className="error-message">
              {registerMutation.error.message}
            </span>
          )}
          
        <Button type="submit" isLoading={registerMutation.isPending}>
          Создать аккаунт
        </Button>
      </form>
      <Button variant="default" size="default" onClick={() => setAuthType("login")}>У меня уже есть аккаунт</Button>
    </>
  )
};
