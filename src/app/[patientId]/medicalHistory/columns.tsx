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
import { useEffect, useState } from "react";

enum MedicalHistoryType {
    Medication,
    Allergy,
    ChronicConditions,
}

export interface MedicalHistorySummary {
    id: string;
    medicalHistoryType: MedicalHistoryType;
    value: string;
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
        id: "actions",
        cell: ({ row }) => {
            const [openModal, setOpenModal] = useState(false);
            const handleClick = () => {
                setOpenModal(true);
            };
            const closeModal = () => {
                setOpenModal(false);
            };
            const print = row.original;
            return (
                <>
                    {openModal && (
                        <EditMedicalHistoryButton
                            historyId={print.id}
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
                            <DropdownMenuItem onClick={() => {}}>
                                Delete history
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
    },
];
