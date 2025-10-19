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
    }catch(error: unknown){
        throw error;
    }
}