import { ChartCard } from "./chart-card";
import { Ticket } from "lucide-react";

interface TicketData {
  id: number;
  title: string;
  created_at: string;
}

interface RecentTicketsProps {
  tickets: TicketData[];
  maxItems?: number;
}

export function RecentTickets({ tickets, maxItems = 5 }: RecentTicketsProps) {

  const displayTickets: TicketData[] = tickets.slice(0, maxItems);

  return (
    <ChartCard title="Tickets Recentes">
      <div className="space-y-3">
        {displayTickets.length === 0 ? (
          <p className=" text-sm">Nenhum ticket no período</p>
        ) : (
          displayTickets.map((ticket: TicketData) => (
            <div
              key={ticket.id}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 hover:text-slate-700 rounded-lg transition-colors"
            >
              <div className="bg-blue-100 p-2 rounded">
                <Ticket className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {ticket.title}
                </p>
                <p className="text-xs mt-1">
                  {new Date(ticket.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </ChartCard>
  );
}
