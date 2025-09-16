"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaHome, FaChartLine, FaFileAlt, FaCog } from "react-icons/fa";
import { usePathname } from "next/navigation"; // Para destacar link ativo

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/home", label: "Home", icon: <FaHome /> },
    { href: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
    { href: "/relatorios", label: "Relatórios", icon: <FaFileAlt /> },
    { href: "/config", label: "Configurações", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Botão mobile */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu lateral"
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-violet-700 hover:bg-violet-800 
                   text-white rounded-xl shadow-lg transition-colors duration-200"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-52 md:w-64 
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
          text-gray-200 shadow-2xl flex flex-col p-4 z-40
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Cabeçalho mobile */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu lateral"
            className="p-1 rounded hover:bg-gray-700 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Cabeçalho desktop */}
        <h2 className="hidden md:block text-2xl font-extrabold text-white mb-8">
          MeuApp
        </h2>

        {/* Navegação */}
        <nav className="flex flex-col gap-1">
          {links.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl 
                  transition-all duration-200 group
                  ${active
                    ? "bg-violet-700 text-white shadow-md"
                    : "hover:bg-violet-700/70 hover:text-white"}`}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                <span className="font-medium">{label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
