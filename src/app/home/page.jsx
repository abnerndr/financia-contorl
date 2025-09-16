"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import CryptoChart from "../components/CryptoChart";

export default function HomePage() {
  const posts = Array.from({ length: 60 }, (_, i) => ({
    title: `Investimento ${i + 1}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel velit vel nulla facilisis tincidunt. Sed feugiat mi a orci tincidunt, nec sollicitudin massa tincidunt.",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 px-4 md:px-12 py-10 md:ml-64">
        {/* Hero */}
        <section className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Blog de <span className="text-indigo-700">Investimentos</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Dicas, análises e insights para você investir melhor.
          </p>
        </section>

        {/* ======== NOVO BLOCO: Gráfico Top 10 Criptos ======== */}
        <CryptoChart />

        {/* Grid de posts */}
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-12">
          {currentPosts.map((post, i) => (
            <BlogCard key={i} post={post} />
          ))}
        </section>

        {/* Paginação */}
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
