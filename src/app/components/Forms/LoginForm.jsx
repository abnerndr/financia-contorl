import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";

const schema = z.object({
	email: z.email("Digite um email válido"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export function LoginForm({ isLogin }) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onSubmit = handleSubmit((data) => {
		console.log("Dados enviados:", data);
	});

	return (
		<form onSubmit={onSubmit} className={`absolute top-0 left-0 w-full space-y-5 transition-all duration-500 ${isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
			<div>
				<label className="block text-sm text-gray-400 mb-1">Email</label>
				<Controller control={control} name="email" render={({ field }) => <Input type="email" placeholder="Digite seu email" {...field} errors={errors.email?.message} />} />
				{errors.email && <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">{errors.email.message}</p>}
			</div>

			<div>
				<label className="block text-sm text-gray-400 mb-1">Senha</label>
				<Controller control={control} name="password" render={({ field }) => <Input type="password" placeholder="Digite sua senha" {...field} errors={errors.password?.message} />} />
				{errors.password && <p className="absolute left-0 bottom-[-24px] text-red-500 text-sm">{errors.password.message}</p>}
			</div>

			<button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md text-sm font-medium transition">
				Entrar
			</button>

			<div className="text-center">
				<a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition">
					Esqueceu sua senha?
				</a>
			</div>
		</form>
	);
}
