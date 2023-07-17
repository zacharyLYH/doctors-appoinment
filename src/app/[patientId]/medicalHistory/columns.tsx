"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditMedicalHistoryButton from "@/components/edit-medical-history-modal";
import { useState } from "react";
import toast from "react-hot-toast";

enum MedicalHistoryType {
    Medication,
    Allergy,
    ChronicConditions,
}

export interface MedicalHistorySummary {
    id: string;
    medicalHistoryType: MedicalHistoryType;
    value: string;
    additionalNotes: string;
}

export const columns: ColumnDef<MedicalHistorySummary>[] = [
    {
        accessorKey: "medicalHistoryType",
        header: "Medical History",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        accessorKey: "additionalNotes",
        header: "Additional Notes",
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
            const rowData = row.original;
            const onDelete = async (deleteId: string) => {
                try {
                    const del = await fetch("/api/deleteMedicalHistory", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ deleteId: deleteId }),
                    });
                    const convertJson = await del.json();
                    window.location.assign(
                        `/${convertJson.patientId}/medicalHistory`
                    );
                } catch (error) {
                    toast.error("Something went wrong with registering user");
                    console.log(error);
                }
            };
            return (
                <>
                    {openModal && (
                        <EditMedicalHistoryButton
                            historyId={rowData.id}
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
                                Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDelete(rowData.id)}
                            >
                                Delete history
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];
