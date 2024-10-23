import React from "react";
import {CircularProgress} from "@nextui-org/react";

export default function App() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <CircularProgress label="Cargando..." />
        </div>
    );
}

