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

import { TicketCreate } from "./components/ticket-create";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";
import { TicketsTable } from "./components/table";
import { getTickets } from "../../api/get-tickets";
import { Spinner } from "../../components/ui/spinner";
import { Badge } from "../../components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PaginationControll } from "../../components/pagination-controll";


const tableColumns = ["Id", "Título", "Cliente", "Registrado por", "Produto", "Modulo", "Status", "Registrado em", "Ações"]

export function Tickets() {

  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(10);

  const [customerName, setCustomerName] = useState<string>('')
  const [ticketId, setTicketId] = useState<string>("");

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets", currentPage, ticketsPerPage, customerName, ticketId],
    queryFn: () =>
      getTickets({
        page: currentPage,
        take: ticketsPerPage,
        customer_name: customerName,
        ticket_id: Number(ticketId),
      }),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  });

  function handleAlertUser() {
    toast.info("Funcionalidade em desenvolvimento!");
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleTicketsPerPageChange(value: string) {
    setTicketsPerPage(Number(value));
    setCurrentPage(1); 
  }

  function handleSearchTickets(e: React.FormEvent) {
    e.preventDefault();
    setCurrentPage(1);
  }


  function handleNextPage() {
    if (tickets.pagination.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePreviousPage() {
    if (tickets.pagination.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
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
        <form action="">
          <div className="flex items-center gap-2">
            <span>Filtros</span>
            <Input
              placeholder="Id ticket"
              className="max-w-[180px]"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
            />
            <Input
              placeholder="Nome do cliente"
              className="max-w-[250px]"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Select
              value={String(ticketsPerPage)}
              onValueChange={handleTicketsPerPageChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tickets por página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 por página</SelectItem>
                <SelectItem value="10">10 por página</SelectItem>
                <SelectItem value="20">20 por página</SelectItem>
                <SelectItem value="30">30 por página</SelectItem>
              </SelectContent>
            </Select>
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
              onClick={() => handleSearchTickets}
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
        </form>
      </div>
      <div className="w-full flex justify-center mt-8">
        {isLoading ? (
          <Badge className="w-auto gap-2">
            <Spinner className="size-6" />
            Buscando
          </Badge>
        ) : (
          <TicketsTable columns={tableColumns} data={tickets.tickets} />
        )}
      </div>
      <div className="mt-4">
        <PaginationControll
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          currentPage={currentPage}
          hasNextPage={tickets?.pagination?.hasNextPage}
          hasPreviousPage={tickets?.pagination?.hasPreviousPage}
        />
      </div>
    </section>
  );
}
