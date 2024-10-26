import Link from "next/link";
import { usePathname } from "next/navigation";
import { userContext } from "@/context/user.context";
import { BuildingOffice2Icon, CalendarIcon, ClockIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/solid";


export default function Sidebar() {

    const currentPath = usePathname();
    const { isOpen, closeSidebar } = userContext();

    return (
        <nav className={
            `sm:hidden fixed z-50 top-0 right-0 h-[50%] w-64 bg-blue-600 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
        }>

            <div className="flex flex-col justify-center text-center text-[#f5e8c7] space-y-6 py-4 rounded-xl">
                <div className='flex flex-col space-y-6 font-semibold p-4'>
                    <div className='flex '>
                        <XMarkIcon
                            onClick={closeSidebar}
                            className="cursor-pointer" 
                            width={30}
                        />
                        <div className="flex mx-auto">
                            <BuildingOffice2Icon width={24}/>
                            <h1 className='font-semibold text-xl '>MedAgenda</h1>
                        </div>
                    </div>
                    <div className='flex space-x-2 bg-white text-blue-500 rounded-lg p-2'>
                        <HomeIcon onClick={closeSidebar} width={24} />
                        
                        <Link
                            className={`hover:underline ${currentPath === '/' ? 'underline' : ''}`}
                            href="/">Inicio
                        </Link>
                    </div>
                    <div className='flex space-x-2 bg-white text-blue-500 rounded-lg p-2'>
                        <ClockIcon width={24} />
                        <Link
                            onClick={closeSidebar}
                            className={`hover:underline ${currentPath === '/reservation' ? 'underline' : ''}`}
                            href="/reservation">Mis reservas
                        </Link>
                    </div>
                    <div className='flex space-x-2 bg-white text-blue-500 rounded-lg p-2'>
                        <CalendarIcon width={24} />
                        <Link
                            onClick={closeSidebar}
                            className={`hover:underline ${currentPath === '/medical_appointment' ? 'underline' : ''}`}
                            href="/medical_appointment">Reserva de hora
                        </Link>
                    </div>
                </div>
            </div>

        </nav>
    )

}