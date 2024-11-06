import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ModalTypes } from '@/types/modal';
import { UserT } from '@/types/user';
import axiosClient from '@/utils/axios.client';


type UserContextType = {
    user: UserT | null;
    setUser: (user: UserT | null) => void;
    rut: string | null;
    setRut: (rut: string | null) => void;
    numberApoinment: number | null;
    setNumberAppointmnent: (numberApoinment: number | null) => void;
    modalKey: ModalTypes | null;
    setModalKey: (key: ModalTypes | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isDataLoading: boolean;
    setIsDataLoading: (isDataLoading: boolean) => void
    isOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    isBottomOpen: boolean
    setIsBottomOpen: (isBottomOpen: boolean) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    rut: null,
    setRut: () => {},
    numberApoinment: null,
    setNumberAppointmnent: () => {},
    modalKey: null,
    setModalKey: () => {},
    isLoading: false,
    setIsLoading: () => {},
    isDataLoading: false,
    setIsDataLoading: () => {},
    isOpen: false,   
    openSidebar: () => {}, 
    closeSidebar: () => {},
    isBottomOpen: false,
    setIsBottomOpen: () => {}
}); 

export function UserProvider({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()

    const [ user, setUser ] = useState<UserT | null>(null);
    const [ rut, setRut ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isDataLoading, setIsDataLoading ] = useState(false);
    const [ numberApoinment, setNumberAppointmnent ] = useState<number | null>(null);
    const [ modalKey, setModalKey ] = useState<ModalTypes | null>(null)
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isBottomOpen, setIsBottomOpen ] = useState(false) 

    const openSidebar = () => { 
        setIsOpen(true) 
    }
    const closeSidebar = () => { setIsOpen(false) }

    useEffect(() => {

        const fetchUser = async () => {
            
            if  (pathname === '/dashboard') {
                try {
                    const response = await axiosClient.get('/session')

                    if (!response.data) {
                        setUser(null)
                        return;
                    }

                    setUser(response.data)
                    setIsLoading(false)
                } catch (error) {
                    console.error("Error fetching user data", error);
                    setUser(null);
                }
            }
        }

        fetchUser()

    }, [])

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            rut,
            setRut,
            numberApoinment,
            setNumberAppointmnent,
            modalKey,
            setModalKey,
            isLoading,
            setIsLoading,
            isDataLoading, 
            setIsDataLoading,
            isOpen,
            openSidebar,
            closeSidebar,
            isBottomOpen, 
            setIsBottomOpen
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const userContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("UserContext is not available");
    }
    return context;
};

