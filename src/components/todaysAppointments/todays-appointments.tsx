"use client";

import { DataTable } from "@/components/todaysAppointments/data-table";
import { columns } from "@/components/todaysAppointments/columns";

interface TodaysAppointments {
    date: Date;
    time: string;
    description: string;
}

async function getData(): Promise<TodaysAppointments[]> {
    const request = await fetch("/api/getTodayAppointments");
    console.log(request)
    return await request.json();
}

const TodaysAppointment = async () => {
    const todaysApps = await getData();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={todaysApps} />
        </div>
    );
};

export default TodaysAppointment;