"use client";

import { DataTable } from "@/components/previousAppointments/data-table";
import { columns } from "@/components/previousAppointments/columns";

interface PreviousApps {
    date: Date;
    time: string;
    description: string;
}

async function getData(): Promise<PreviousApps[]> {
    const request = await fetch("/api/getPreviousAppointments");
    return await request.json();
}

const PreviousAppointment = async () => {
    const previousApps = await getData();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={previousApps} />
        </div>
    );
};

export default PreviousAppointment;