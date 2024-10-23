'use client';

import { store } from "@/store/store";
import { Navbar } from "../Navbar"
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from 'react-redux'
import { usePathname } from "next/navigation";
import { UserProvider } from "@/context/user.context";

export default function UserLayout({ children }: { children: React.ReactNode }) {

    const path = usePathname()

    return (
        <div>
            {
                (!path.includes('/dashboard') && !path.includes('auth'))
                    ? <Navbar />
                    : null
            }
            <Provider store={store}>
                <NextUIProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                </NextUIProvider>
            </Provider>
        </div>
    )
}