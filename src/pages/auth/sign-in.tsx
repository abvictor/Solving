import { Button } from "../../components/ui/button";
import { Input } from "../..//components/ui/input";
import { Label } from "../../components/ui/label";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { z } from 'zod'
import { signIn } from "../../api/sign-in";
import { Spinner } from "../../components/ui/spinner";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? ''
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Usuário autenticado com sucesso!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Erro ao autenticar usuário.";
      toast.error(errorMessage);
    },
  });

  async function handleSignIn(data: SignInForm) {
      authenticate({
      email: data.email,
      password: data.password,
    });
  }
  
  async function handleSignInDemo() {
    authenticate({
      email: 'zezinho@email.com',
      password: '1234',
    });
  }



  return (
    <>
      <title>Entrar | Solving</title>
      <div className="w-full flex justify-center p-8">
        <Button asChild className="absolute right-8 top-8" variant="link">
          <Link to="/sign-up" className="">
            Nova empresa
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6 ">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p>Gerencie os chamados dos seus produtos</p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Acessar painel
              {isSubmitting && <Spinner />}
            </Button>

            <Button
              type="button"
              onClick={handleSignInDemo}
              variant="outline"
              disabled={isSubmitting}
            >
              Acessar demo
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
