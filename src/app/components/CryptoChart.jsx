"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const topCryptos = [
  "bitcoin",
  "ethereum",
  "solana",
  "cardano",
  "dogecoin",
  "ripple",
  "polygon",
  "litecoin",
  "tron",
  "avalanche",
];

const getLastNDays = (n = 21) => {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(`${d.getDate()}/${d.getMonth() + 1}`);
  }
  return days;
};

export default function CryptoChart() {
  const [prices, setPrices] = useState({});
  const [selected, setSelected] = useState("bitcoin");
  const days = getLastNDays(21);

  const fetchPrices = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selected}/market_chart?vs_currency=usd&days=21`
      );
      const data = await res.json();
      const dailyPrices = data.prices.map(p => p[1]).slice(-21);
      setPrices(prev => ({ ...prev, [selected]: dailyPrices }));
    } catch (err) {
      console.error("Erro ao buscar preços:", err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [selected]);

  const chartData =
    prices[selected]?.map((v, i) => ({ date: days[i], value: v })) || [];

  return (
    <section className="bg-gray-50 shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
        {selected.charAt(0).toUpperCase() + selected.slice(1)} (Últimas 3 semanas)
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Lista de criptos */}
        <ul className="md:w-1/4 flex md:flex-col flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
          {topCryptos.map(name => (
            <li key={name}>
              <button
                onClick={() => setSelected(name)}
                className={`px-4 py-2 rounded-lg font-medium transition 
                  ${
                    selected === name
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Gráfico com scroll horizontal */}
        <div className="md:w-3/4 overflow-x-auto">
          <div style={{ minWidth: "800px", height: "320px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6B7280", fontWeight: 500 }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={value => `$${value.toLocaleString()}`}
                  tick={{ fill: "#6B7280", fontWeight: 500 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                />
                <Tooltip
                  formatter={value => [`$${value.toLocaleString()}`, "Preço"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                    padding: "10px 14px",
                    fontWeight: 600,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#colorValue)"
                  activeDot={{ r: 6 }}
                  dot={{ r: 3, fill: "#6366F1", stroke: "#4F46E5", strokeWidth: 1 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
