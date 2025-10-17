import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

import type { TicketStatus } from "./ticket-status";
import { updateTicketStatus } from "../../../api/update-ticket-status";
import { toast } from "sonner";

interface DropdownMenuOptionsProps {
  id: number;
  status: TicketStatus;
}

export function DropdownMenuOptions({ id, status }: DropdownMenuOptionsProps) {

  async function handleUpdateTicketStatus(ticketStatus: string, id: number){
    await updateTicketStatus({ status: ticketStatus, id });
  }

  function handleAlertUser(){
    toast.info('Funcionalidade em desenvolvimento!')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === "OPEN" && (
          <>
            <DropdownMenuItem
              className="data-[highlighted]:bg-green-300"
              onClick={() => handleUpdateTicketStatus("CLOSED", id)}
            >
              Finalizar
            </DropdownMenuItem>

            <DropdownMenuItem
              className="data-[highlighted]:bg-yellow-300"
              onClick={() => handleUpdateTicketStatus("IN_PROGRESS", id)}
            >
              Analisando
            </DropdownMenuItem>
          </>
        )}

        {status === "CLOSED" && (
          <DropdownMenuItem
            className="data-[highlighted]:bg-red-300"
            onClick={() => handleUpdateTicketStatus("OPEN", id)}
          >
            Abrir
          </DropdownMenuItem>
        )}

        {status === "IN_PROGRESS" && (
          <DropdownMenuItem
            className="data-[highlighted]:bg-green-300"
            onClick={() => handleUpdateTicketStatus("CLOSED", id)}
          >
            Finalizar
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleAlertUser}>
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}