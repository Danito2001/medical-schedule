import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BuildingOffice2Icon, CalendarIcon, ClockIcon, HomeIcon } from '@heroicons/react/24/solid'

export default function Navbar() {

    const currentPath = usePathname()

    return (
        <nav className='flex justify-between bg-blue-500 p-4 text-white'>
            <div className='flex space-x-2 items-center'>
                <BuildingOffice2Icon width={24}/>
                <h1 className='font-semibold text-xl'>MedAgenda</h1>
            </div>
            <div className='hidden md:flex lg:flex space-x-2 '>
                <div className='flex space-x-2 bg-white text-blue-500 rounded-lg p-2'>
                    <HomeIcon width={24}/>
                    <Link 
                        className={`hover:underline ${currentPath === '/' ? 'underline' : ''}`}
                        href="/">Inicio
                    </Link>
                </div>
                <div className='flex space-x-2 bg-white text-blue-500 rounded-lg p-2'>
                    <ClockIcon width={24}/>
                    <Link 
                        className={`hover:underline ${currentPath === '/reservation' ? 'underline' : ''}`} 
                        href="/reservation">Mis reservas
                    </Link>
                </div>
                <div className='flex space-x-2 bg-white text-blue-500 rounded-lg p-2'>
                    <CalendarIcon width={24}/>
                    <Link 
                        className={`hover:underline ${currentPath === '/medical_appointment' ? 'underline' : ''}`} 
                        href="/medical_appointment">Reserva de hora
                    </Link>
                </div>
            </div>
        </nav>
    )
}