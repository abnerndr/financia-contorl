import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";

const registerSchema = z.object({
	name: z.string().min(1, "Deve conter o nome"),
	email: z.email("Digite um email válido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export function RegisterForm({ isLogin }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onSubmit = handleSubmit((data) => {
		console.log("Dados enviados:", data);
	});

	return (
		<form onSubmit={onSubmit} className={`absolute top-0 left-0 w-full space-y-5 transition-all duration-500 ${isLogin ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
			{/* Nome */}
			<div className="relative">
				<label className="block text-sm text-gray-400 mb-1">Nome</label>
				<Controller control={control} name="name" render={({ field }) => <Input {...field} placeholder="Seu nome" errors={errors.name?.message} />} />
				{errors.name && <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">{errors.name?.message}</p>}
			</div>

			{/* Email */}
			<div className="relative">
				<label className="block text-sm text-gray-400 mb-1">Email</label>
				<Controller control={control} name="email" render={({ field }) => <Input {...field} type="email" placeholder="E-mail" errors={errors.email?.message} />} />
				{errors.email && <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">{errors.email?.message}</p>}
			</div>

			{/* Senha */}
			<div className="relative">
				<label className="block text-sm text-gray-400 mb-1">Senha</label>
				<Controller control={control} name="password" render={({ field }) => <Input {...field} type="password" placeholder="Senha" errors={errors.password?.message} />} />
				{errors.password && <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">{errors.password?.message}</p>}
			</div>

			{/* Botão */}
			<button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-medium transition">
				Registrar
			</button>
		</form>
	);
}
