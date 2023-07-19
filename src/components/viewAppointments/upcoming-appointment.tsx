"use client"

import { DataTable } from "@/components/viewAppointments/data-table";
import { columns } from "@/components/viewAppointments/columns";

interface UpcomingApps {
    date: Date;
    time: string;
    description: string;
}

async function getData(): Promise<UpcomingApps[]> {
    const request = await fetch("/api/getUpcomingAppointments");
    return await request.json();
}

const UpcomingAppointment = async () => {
    const upcomingApps = await getData();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={upcomingApps} />
        </div>
    );
};

export default UpcomingAppointment;
