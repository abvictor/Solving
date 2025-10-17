import { Plus, Search, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { TicketCreate } from "../../components/ticket-create";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";
import { TicketsTable } from "./components/table";
import { getTickets } from "../../api/get-tickets";
import { Spinner } from "../../components/ui/spinner";
import { Badge } from "../../components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const tableColumns = ["Id", "Título", "Cliente", "Registrado por", "Produto", "Modulo", "Status", "Registrado em", "Ações"]

export function Tickets() {

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  });

  function handleAlertUser() {
    toast.info("Funcionalidade em desenvolvimento!");
  }
  
  return (
    <section className="w-full h-full">
      <div className="w-full">
        <h2 className="text-3xl font-bold">Tickets</h2>
        <p className="text-gray-600 mt-2">
          Controle geral dos tickets registrados
        </p>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <span>Filtros</span>
          <Input placeholder="Id ticket" />
          <Input placeholder="Nome do cliente" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OPEN">Aberto</SelectItem>
              <SelectItem value="RESOLVED">Resolvido</SelectItem>
              <SelectItem value="IN_PROGRESS">Em análise</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="bg-zinc-400 hover:bg-zinc-500"
            onClick={handleAlertUser}
          >
            <Search />
            Filtrar resultados
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-500"
            onClick={handleAlertUser}
          >
            <X />
            Remover filtros
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Novo ticket
              </Button>
            </DialogTrigger>
            <TicketCreate />
          </Dialog>
        </div>
      </div>
      <div className="w-full flex justify-center mt-8">
        {isLoading ? (
          <Badge className="w-auto gap-2">
            <Spinner className="size-4" />
            Buscando
          </Badge>
        ) : (
          <TicketsTable columns={tableColumns} data={tickets} />
        )}
      </div>
    </section>
  );
}
