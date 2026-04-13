import "./_LoginForm.scss";
import { FormField } from "../FormField";
import { Button } from "../../ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { queryClient } from "../../service/queryClient";
import { z } from "zod";
import{useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IconEmail from "../../assets/email.svg?react";
import IconPassword from "../../assets/password.svg?react";

type LoginFormProps = {
  onSuccess?: () => void;
  setAuthType: (authType: "login" | "register") => void;
};

const LoginSchema = z.object({
  email: z.string().email("Введите корректную почту"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export const LoginForm = ({ onSuccess, setAuthType }: LoginFormProps) => {

  const { register, handleSubmit, formState: { errors }, setError, clearErrors} = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      onSuccess?.();
    },
    onError() {
      setError("email", { 
        type: "manual", 
        message: "Неверный email или пароль" 
      });
      setError("password", { 
        type: "manual", 
        message: "Неверный email или пароль" 
      });
    },
  });

  const handleFieldChange = () => {
    if (loginMutation.isError) {
      loginMutation.reset();
      clearErrors();
    }
  };

  return (
    <>
      <form
        className="login-form"
        onSubmit={handleSubmit(({ email, password }) => {
          loginMutation.mutate({ email, password });
        })}
      >
        <FormField className={`login-form__field ${errors.email ? "login-form__field--error" : ""}`}>
          <input placeholder="Email" {...register("email", {
               onChange: handleFieldChange,
            })}
          />
          <IconEmail className="login-form__icon"/>
        </FormField>
        <FormField className={`login-form__field ${errors.password ? "login-form__field--error" : ""}`}>
          <input
            type="password"
            placeholder="Пароль"
            {...register("password", {
               onChange: handleFieldChange,
            })}
          />
          <IconPassword className="login-form__icon"/>
        </FormField>

        <Button type="submit" isLoading={loginMutation.isPending}>
          Войти
        </Button>
      </form>

      <Button
        className="login-form__link"
        variant="default"
        size="default"
        onClick={() => setAuthType("register")}
      >
        Регистрация
      </Button>
    </>
  );
};