import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../services/transactions";
import {
  summarizeKPIs,
  byMonthSpending,
  categoryBreakdown,
  recentTransactions,
} from "../lib/finance";

import type { Tx } from "../lib/finance";


import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery<Tx[]>(["transactions"], fetchTransactions);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !data) return <p className="p-6 text-red-600">Failed to load.</p>;

  const kpis = summarizeKPIs(data);
  const monthly = byMonthSpending(data, 6); // last 6 months
  const cats = categoryBreakdown(data);
  const recent = recentTransactions(data, 8);

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Total Income" value={kpis.income} />
        <Card title="Total Expenses" value={kpis.expense} />
        <Card title="Net Balance" value={kpis.net} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Monthly Income vs Expense</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" name="Income" />
                <Bar dataKey="expense" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Category Breakdown (Expenses)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {cats.map((_, idx) => (
                    <Cell key={idx} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="border rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Recent Transactions</h3>
        <ul className="divide-y">
          {recent.map((t) => (
            <li key={t.id} className="py-2 flex items-center justify-between">
              <div className="space-x-2">
                <span className={`px-2 py-0.5 rounded text-sm ${t.type === "INCOME" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {t.type}
                </span>
                <span className="font-medium">${Number(t.amount).toFixed(2)}</span>
                <span className="text-gray-500">{t.description || ""}</span>
              </div>
              <div className="text-sm text-gray-500">{t.date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded-2xl p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">${value.toFixed(2)}</div>
    </div>
  );
}
