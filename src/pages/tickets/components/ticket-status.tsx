export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";  

interface TicketStatusProps {
  status: TicketStatus;
}

const ticketStatus: Record<TicketStatus, string> = {
  OPEN: "pendente",
  IN_PROGRESS: "em análise",
  CLOSED: "resolvido",
};

export function TicketStatus({ status }: TicketStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "OPEN" && (
        <span className="w-[110px] gap-1 p-3 h-4 rounded-sm bg-red-400 flex items-center justify-evenly text-center">
          <span className="w-2 h-2 bg-white rounded-lg"></span>
          <p className="font-medium text-muted-foreground text-white">
            {ticketStatus[status]}
          </p>
        </span>
      )}

      {status === "CLOSED" && (
        <span className="w-[110px] gap-1 p-3 h-4 rounded-sm bg-green-400 flex items-center justify-evenly text-center">
          <span className="w-2 h-2 bg-white rounded-lg"></span>
          <p className="font-medium text-muted-foreground text-white">
            {ticketStatus[status]}
          </p>
        </span>
      )}

      {status === "IN_PROGRESS" && (
        <span className="w-[110px] gap-1 p-3 h-4 rounded-sm bg-blue-400 flex items-center justify-evenly text-center">
          <span className="w-2 h-2 bg-white rounded-lg"></span>
          <p className="font-medium text-muted-foreground text-white">
            {ticketStatus[status]}
          </p>
        </span>
      )}
    </div>
  );
}