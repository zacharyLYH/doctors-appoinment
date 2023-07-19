"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface UpcomingApps {
    date: Date;
    time: string;
    description: string;
}

export const columns: ColumnDef<UpcomingApps>[] = [
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
];
