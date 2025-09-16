import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(1, "Deve conter o nome"),
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export function RegisterForm({ isLogin }) {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
    // aqui você pode redirecionar ou chamar API
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`absolute top-0 left-0 w-full space-y-5 transition-all duration-500 ${
        isLogin ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      {/* Nome */}
      <div className="relative">
        <label className="block text-sm text-gray-400 mb-1">Nome</label>
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => (
            <input
              placeholder="Seu nome"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 transition ${
                form.formState.errors.name
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              {...field}
            />
          )}
        />
        {form.formState.errors.name && (
          <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="relative">
        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <input
              type="email"
              placeholder="Digite seu email"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 transition ${
                form.formState.errors.email
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              {...field}
            />
          )}
        />
        {form.formState.errors.email && (
          <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Senha */}
      <div className="relative">
        <label className="block text-sm text-gray-400 mb-1">Senha</label>
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <input
              type="password"
              placeholder="Digite sua senha"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 transition ${
                form.formState.errors.password
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
              {...field}
            />
          )}
        />
        {form.formState.errors.password && (
          <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-medium transition"
      >
        Registrar
      </button>
    </form>
  );
}