export function LoginForm({isLogin}){
    return (
          <form
            onSubmit={onSubmit} // redireciona
            method="POST"
            className={`absolute top-0 left-0 w-full space-y-5 transition-all duration-500 ${
              isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Digite seu email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Senha</label>
              <input
                type="password"
                name="password"
                placeholder="Digite sua senha"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-medium transition"
            >
              Entrar
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition">
                Esqueceu sua senha?
              </a>
            </div>
          </form>
    )
}