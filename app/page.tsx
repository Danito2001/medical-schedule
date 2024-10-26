'use client';

import { useRouter } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";


const features = [
	{ title: 'Reserva y programación en línea' },
	{ title: 'Horarios de citas convenientes' },
	{ title: 'Acceso a los médicos mejor calificados' }
]


export default function Home() {

	const router = useRouter()

	return (
		<div className="flex flex-col items-center justify-center space-y-20 p-4">
			<div className="flex flex-col items-center gap-20 lg:flex-row pt-20">
				<div className="flex flex-col items-center">
					<h1 className="text-3xl font-bold text-center">Citas médicas convenientes y personalizadas</h1>
					<span className="pb-8 opacity-85">Reserve citas con los médicos mejor calificados en su área. <br />Obtenga la atención que necesita, según su horario.</span>
					<Button
						onClick={() => router.push('/medical_consultation/patient_information')} 
						className="bg-blue-500 p-2 text-white rounded-lg w-1/2"
					>
						Agenda tu cita
					</Button>
				</div>
				<div className="space-y-2">
					{features.map((feature, index) => (
						<span
							key={index}
							className="flex"
						>
							<CheckIcon width={20} />
							{feature.title}
						</span>
					))}
				</div>
			</div>
			<div className="flex flex-col items-center space-y-6">
				<div className="flex flex-col items-center">
					<span className="opacity-85">¿Eres un médico profesional? Inicia sesión aquí</span>
					<h2 className="font-bold text-3xl">Conéctate con tu equipo médico</h2>
					<span className="text-center">Inicia sesión para acceder a tu perfil, gestionar citas y ofrecer la mejor atención a tus pacientes. ¡Estamos aquí para apoyarte!</span>
				</div>
				<Button 
				onClick={() => router.push('/auth/login')}
					className="w-1/3 text-white bg-blue-500"
				>
					Iniciar Sesión
				</Button>
			</div>
		</div>
	);
}
