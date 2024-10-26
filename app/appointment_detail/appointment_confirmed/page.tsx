'use client'

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Swal from "sweetalert2";
import { AppointmentConfirmed } from "@/components/common/AppointmentConfirmed";
import { LoadingComponent } from "@/components/common/Loading";
import { userContext } from "@/context/user.context";

export default function ReservationConfirmed() {
    return (
        <Suspense fallback={<LoadingComponent />}>
            <ReservationConfirmedContent />
        </Suspense>
    );
}

function ReservationConfirmedContent() {
    const { rut } = userContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dateAndTime = searchParams.get('dateAndTime');

    useEffect(() => {
        if (!rut) {
            router.push('/')
            Swal.fire({
                title: "No hay datos",
                icon: "error"
            });
        }
    }, [rut]);

    return (
        <div>
            { 
                (rut) 
                 ? <AppointmentConfirmed date={dateAndTime}/> 
                 : <LoadingComponent/> 
            }
        </div>
    );
}