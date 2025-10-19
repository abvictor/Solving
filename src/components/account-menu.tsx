import { LogOutIcon, NotebookText, User } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Label } from "./ui/label";


export function AccountMenu(){
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 select-none"
            >
              <User />
              Perfil
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col"></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <NotebookText className="w-h h-4 mr-2" />
                <span>Visualizar perfil</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem asChild className="text-rose-500 dark:rose-400">
              <button className="w-full">
                <LogOutIcon className="w-h h-4 mr-2" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    );
}