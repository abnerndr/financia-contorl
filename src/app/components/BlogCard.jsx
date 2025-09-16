export default function BlogCard({ post }) {
  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl
                        transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Capa com gradiente indigo/violet */}
      <div className="h-40 bg-gradient-to-tr from-indigo-600 to-violet-500 relative">
        <span className="absolute bottom-2 left-2 text-xs bg-white/80 text-indigo-700
                         px-2 py-0.5 rounded-md font-semibold">
          Investimento
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700
                       transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <button
          className="mt-4 inline-block text-indigo-700 font-medium text-sm
                     hover:text-violet-600 transition"
        >
          Ler mais →
        </button>
      </div>
    </article>
  );
}
