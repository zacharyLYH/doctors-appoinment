"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import EditAppointmentsButton from "./edit-upcoming-appointment";
import toast from "react-hot-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface UpcomingApps {
    id: string;
    date: Date;
    time: string;
    description: string;
}

export const columns: ColumnDef<UpcomingApps>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openModal, setOpenModal] = useState(false);
            const handleClick = () => {
                setOpenModal(true);
            };
            const closeModal = () => {
                setOpenModal(false);
            };
            const appointment = row.original;
            const onDelete = async (deleteId: string) => {
                try {
                    const del = await fetch("/api/deleteAppointment", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ deleteId: deleteId }),
                    });
                    const convertJson = await del.json();
                    window.location.assign(`/${convertJson.patientId}`);
                } catch (error) {
                    toast.error("Something went wrong with registering user");
                    console.log(error);
                }
            };
            return (
                <>
                    {openModal && (
                        <EditAppointmentsButton
                            appId={appointment.id}
                            isOpen={openModal}
                            closeModal={closeModal}
                        />
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={handleClick}>
                                Update appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(appointment.id)}
                            >
                                Delete Appointment
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];
