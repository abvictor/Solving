import { Link } from "react-router-dom";

export function NotFound(){
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold text-orange-400">
          Página não encontrada
        </h1>
        <p className="text-orange-400">
          Voltar para o <Link to="/">Dashboard</Link>
        </p>
      </div>
    );
}