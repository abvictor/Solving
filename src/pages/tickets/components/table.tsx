import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { DropdownMenuOptions } from "./dropdown-menu-options";

import { TicketStatus } from "./ticket-status";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  created_at: string;
  updated_at: string;
  module: {
    id: string;
    version: string | null;
    product_id: string;
    name: string;
  };
  registered_by: {
    id: string;
    role: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
  };
  product: {
    name: string;
  }
  solved_by: string | null;
}

interface TicketsTableProps {
  columns: string[];
  data?: Ticket[];
}

export function TicketsTable({ data, columns }: TicketsTableProps) {
  const noContentMessage = data?.length === 0 ? "Sem chamados registrados." : null;
  
  return (
    <Table>
      {noContentMessage && <TableCaption>{noContentMessage}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.id}</TableCell>
            <TableCell>{ticket.title}</TableCell>
            <TableCell>{ticket.customer.name}</TableCell>
            <TableCell>{ticket.registered_by.name}</TableCell>
            <TableCell>{ticket.product.name}</TableCell>
            <TableCell>{ticket.module.name}</TableCell>
            <TableCell>
              <TicketStatus status={ticket.status} />
            </TableCell>
            <TableCell>
              {new Date(ticket.created_at).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              <DropdownMenuOptions id={ticket.id} status={ticket.status}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}