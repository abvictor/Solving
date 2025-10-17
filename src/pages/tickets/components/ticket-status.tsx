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
        <span className="w-[95px] p-3 h-4 rounded-sm bg-red-300 flex items-center justify-center text-center">
          <p className="font-medium text-muted-foreground text-red-600">
            {ticketStatus[status]}
          </p>
        </span>
      )}

      {status === "CLOSED" && (
        <span className="w-[95px] p-3 h-4 rounded-sm bg-green-400 flex items-center justify-center text-center">
          <p className="font-medium text-muted-foreground text-green-600">
            {ticketStatus[status]}
          </p>
        </span>
      )}

      {status === "IN_PROGRESS" && (
        <span className="w-[95px] p-3 h-4 rounded-sm bg-yellow-400 flex items-center justify-center text-center">
          <p className="font-medium text-muted-foreground text-yellow-100">
            {ticketStatus[status]}
          </p>
        </span>
      )}
    </div>
  );
}