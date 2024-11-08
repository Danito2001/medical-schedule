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
		<div className="flex flex-col items-center gap-10 md:flex-row md:justify-center min-h-screen overflow-x-hidden px-4 pt-10">
			<div className="flex flex-col items-center space-y-10">
				<div>
					<h1 className="text-2xl font-bold text-center pb-4">Citas médicas convenientes y personalizadas</h1>
					<span className="pb-8 opacity-85">Reserve citas con los médicos mejor calificados en su área. <br />Obtenga la atención que necesita, según su horario.</span>
				</div>
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
	);
}
