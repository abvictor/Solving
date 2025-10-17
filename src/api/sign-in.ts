import { api } from '../lib/axios'

export interface SignInBody {
    email: string;
    password: string;
}

export async function signIn({ email, password }: SignInBody){
    try{
      const response = await api.post("/login", {
        email,
        password,
      });       

      console.log(response)
    }catch(error: unknown){
        throw error;
    }
}