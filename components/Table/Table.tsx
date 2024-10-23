'use client';

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";
import { LoadingComponent } from "../common/Loading";
import { formattedTime } from "@/helpers/formattedItems";

interface Patient {
    id: number;
    rut: string;
    name: string;
    lastName: string;
    email: string;
    previsionId: number;
}

interface Props {
    status: string;
    patient: Patient;
    numberAppointment: number;
    dateAndTime: Date;
}

const App = React.memo(({ patients, isLoading }: { patients?: Props[], isLoading?: boolean }) => {

    if (!Array.isArray(patients)) return null;

    const newData = patients.map(({ patient, numberAppointment, status, dateAndTime }) => {
        const date = new Date(dateAndTime);
        const formattedDate = date.toLocaleDateString('es-ES');
        const time = formattedTime(date);

        const formattedStatus = status === 'pending'
            ? 'pendiente'
            : status === 'disabled'
                ? 'expirado'
                : 'confirmado';

        return {
            ...patient,
            numberAppointment: numberAppointment,
            status: formattedStatus,
            dateAppointment: formattedDate,
            time: time,
        };
    });

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(newData.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return newData.slice(start, end);
    }, [page, newData]);

    return (
        <Table
            aria-label="Example table with client side pagination"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px] border border-blue-500",
                th: "bg-blue-500 text-white",
            }}>
            <TableHeader>
                <TableColumn key="id">Id</TableColumn>
                <TableColumn key="numberAppointment">Numero de cita</TableColumn>
                <TableColumn key="status">Estado</TableColumn>
                <TableColumn key="dateAppointment">Fecha</TableColumn>
                <TableColumn key="time">Hora</TableColumn>
                <TableColumn key="rut">Rut</TableColumn>
                <TableColumn key="name">Nombres</TableColumn>
                <TableColumn key="lastName">Apellidos</TableColumn>
            </TableHeader>
            <TableBody
                emptyContent={<h1>No existen datos</h1>}
                isLoading={isLoading}
                loadingContent={<LoadingComponent />}
                items={items}
            >
                {
                    items.map((item, index) => (
                        <TableRow key={index}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
});

export default App;
