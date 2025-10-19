import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../api/fetch-dashboard-data";
import { RecentTickets } from "./components/recent-tickets";
import { ChartCard } from "./components/chart-card";
import { Package, Ticket, TrendingUp } from "lucide-react";
import { StatsCard } from "./components/graph-card";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TicketData {
  id: number;
  title: string;
  created_at: string;
}

interface Module {
  moduleName: string;
  ticketCount: number;
}

interface Product {
  productName: string;
  modules: Module[];
}

interface DashboardResponse {
  mounthTickets?: TicketData[];
  totalMounthTickets?: number;
  ticketsPerProductModule?: Product[];
}

interface ChartDataPoint {
  name: string;
  tickets: number;
  product?: string;
}

interface DailyDataPoint {
  date: string;
  tickets: number;
}

const COLORS: string[] = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export function Dashboard(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<DashboardResponse[] | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const data: DashboardResponse[] = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Erro ao carregar dados</div>
      </div>
    );
  }

  const tickets: TicketData[] = dashboardData[0]?.mounthTickets || [];
  const totalTickets: number = dashboardData[1]?.totalMounthTickets || 0;
  const ticketsPerProduct: Product[] = dashboardData[2]?.ticketsPerProductModule || [];

  const productData: ChartDataPoint[] = ticketsPerProduct
    .map((product) => ({
      name: product.productName,
      tickets: product.modules.reduce((sum, mod) => sum + mod.ticketCount, 0),
    }))
    .filter((p) => p.tickets > 0);

  const moduleData: ChartDataPoint[] = ticketsPerProduct.flatMap((product) =>
    product.modules.filter((mod) => mod.ticketCount > 0)
      .map((mod) => ({
        name: mod.moduleName,
        tickets: mod.ticketCount,
        product: product.productName,
      }))
    );

  const ticketsByDay = tickets.reduce<Record<string, number>>((acc, ticket) => {
    const date: string = new Date(ticket.created_at).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "short",
      }
    );
     acc[date] = (acc[date] || 0) + 1;
     return acc;
    }, {});

  const dailyData: DailyDataPoint[] = Object.entries(ticketsByDay).map(
    ([date, count]) => ({ date, tickets: count as number})
  );

  return (
    <main className="min-h-screen p-2">
      <div className="max-w-16xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="mt-2">
            Visão geral dos tickets do service desk
          </p>
        </div>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard
            title="Total de Tickets (Mês)"
            value={totalTickets}
            icon={Ticket}
          />
          <StatsCard
            title="Produtos com Tickets"
            value={productData.length}
            icon={Package}
          />
          <StatsCard
            title="Módulos Afetados"
            value={moduleData.length}
            icon={TrendingUp}
          />
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {productData.length > 0 && (
            <ChartCard title="Tickets por Produto">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      name,
                      percent,
                    }: {
                      name: string;
                      percent: number;
                    }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="tickets"
                  >
                    {productData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {moduleData.length > 0 && (
            <ChartCard title="Tickets por Módulo">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moduleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tickets" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dailyData.length > 0 && (
            <ChartCard title="Tickets ao Longo do Tempo">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tickets" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          <RecentTickets tickets={tickets} />
        </section>
      </div>
    </main>
  );
}
