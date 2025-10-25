import { Outlet } from "react-router-dom";
import { Headset } from "lucide-react";

import hero from "../../assets/hero.png";
import { Footer } from "../../components/footer";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center gap-3 p-4 text-lg font-medium text-slate-800">
        <Headset className="h-5 w-5" />
        <span className="font-semibold">Solving</span>
      </div>

      <div className="flex-1 flex justify-center flex-col md:flex-row antialiased">
        <div className="flex flex-col justify-center items-center mt-0 bg-white md:w-1/2 border-t md:border-t-0 md:border-r border-foreground/5 relative">
          <img
            src={hero}
            alt="Ilustração de suporte"
            className="w-full max-w-[190px] md:max-w-80 object-contain"
          />
        </div>
        <div className="flex flex-col justify-center items-center p-6 md:w-1/2">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}