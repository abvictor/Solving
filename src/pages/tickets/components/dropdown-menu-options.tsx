import {
  CheckCheck,
  CircleAlert,
  Construction,
  Ellipsis,
  SquarePen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import type { TicketStatus } from "./ticket-status";
import { updateTicketStatus } from "../../../api/update-ticket-status";
import { EditTicketDialog } from "./edit-ticket-dialog";
import { Button } from "../../../components/ui/button";

interface DropdownMenuOptionsProps {
  id: number;
  status: TicketStatus;
}

export function DropdownMenuOptions({ id, status }: DropdownMenuOptionsProps) {
  async function handleUpdateTicketStatus(
    ticketStatus: TicketStatus,
    id: number
  ) {
    await updateTicketStatus({ status: ticketStatus, id });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="cursor-pointer focus:outline-none">
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {status === "OPEN" && (
            <>
              <DropdownMenuItem
                className="data-[highlighted]:bg-slate-200 cursor-pointer"
                onClick={() => handleUpdateTicketStatus("CLOSED", id)}
              >
                Finalizar
                <DropdownMenuShortcut>
                  <CheckCheck />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="data-[highlighted]:bg-slate-200 cursor-pointer"
                onClick={() => handleUpdateTicketStatus("IN_PROGRESS", id)}
              >
                Em análise
                <DropdownMenuShortcut>
                  <Construction />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}

          {status === "IN_PROGRESS" && (
            <>
              <DropdownMenuItem
                className="data-[highlighted]:bg-slate-200 cursor-pointer"
                onClick={() => handleUpdateTicketStatus("CLOSED", id)}
              >
                Finalizar
                <DropdownMenuShortcut>
                  <CheckCheck />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="data-[highlighted]:bg-slate-200 cursor-pointer"
                onClick={() => handleUpdateTicketStatus("OPEN", id)}
              >
                Pendente
                <DropdownMenuShortcut>
                  <CircleAlert />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}

          {status === "CLOSED" && (
            <>
              <DropdownMenuItem
                className="data-[highlighted]:bg-slate-200 cursor-pointer"
                onClick={() => handleUpdateTicketStatus("OPEN", id)}
              >
                Pendente
                <DropdownMenuShortcut>
                  <CircleAlert />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="data-[highlighted]:bg-slate-200 cursor-pointer"
                onClick={() => handleUpdateTicketStatus("IN_PROGRESS", id)}
              >
                Em análise
                <DropdownMenuShortcut>
                  <Construction />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />

          <Button asChild variant="ghost">
            <DialogTrigger>
              <DropdownMenuItem className="cursor-pointer">
                Editar
                <DropdownMenuShortcut>
                  <SquarePen />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DialogTrigger>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTicketDialog id={id} />
    </Dialog>
  );
}
