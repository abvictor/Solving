import { ChartArea, ClipboardList } from "lucide-react";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";


export function Header(){
    return (
      <div className="border-b">
        <div className="flex h-16 items-center gap-6 px-6">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/dashboard">
             <ChartArea className="h-6 w-6" />
              Dashboard
            </NavLink>
            <NavLink to="/tickets">
              <ClipboardList className="h-6 w-6" />
              Tickets
            </NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
}