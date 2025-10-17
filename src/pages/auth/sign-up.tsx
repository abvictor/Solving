import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { z } from 'zod'

const signUpForm = z.object({
  name: z.string().min(5, {message: "O nome deve conter ao menos 5 caracteres"}),
  email: z.string().email(),
  password: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();
  

  // async function handleSignIn(data: SignUpForm) {
  //   toast.success("Empresa cadastrada com sucesso!", {
  //     action: {
  //       label: "Acessar painel",
  //       onClick: () => navigate(`/sign-in?email=${data.email}?password=${data.password}`),
  //     },
  //   });
  // }

  async function handleSignUp(){
    toast.info("Função em desenvolvimento, utilize a demo!!")
    navigate('/sign-in')
  }

  return (
    <>
      <title>Cadastro | Solving</title>
      <div className="w-full flex justify-center p-8">
        <Button asChild className="absolute right-8 top-8" variant="link">
          <Link to="/sign-in" className="">
            Acessar com login
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6 ">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p>Crie uma conta para a sua empresa e comece a acompanhar</p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome da sua empresa</Label>
              <Input id="name" type="name" {...register("name")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Confirme a senha</Label>
              <Input id="manager" type="password" {...register("password")} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Acessar painel
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a className="underline underline-offset-1" href="#">
                Termos de serviço e políticas de privacidade.
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
