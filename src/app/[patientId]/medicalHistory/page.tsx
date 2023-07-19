"use client";

import AddMedicalHistoryButton from "@/components/add-medical-history-modal";
import { DataTable } from "@/app/[patientId]/medicalHistory/data-table";
import { MedicalHistorySummary, columns } from "../medicalHistory/columns";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const MedicalHistory = async ({
    params,
}: {
    params: { patientId: string };
}) => {
    const [data, setData] = useState<MedicalHistorySummary[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetched = await fetch("/api/getAllMedicalHistory");
            const jsonData = await fetched.json();
            setData(jsonData);
            console.log(jsonData);
        };
        fetchData();
    }, []);
    return (
        <div
            className={cn(
                "mt-2 max-w-5xl mx-auto p-4 rounded-lg shadow-lg",
                useTheme().theme === "light" && "bg-gray-100"
            )}
        >
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Medical History</h2>
                <div className="md:ml-auto">
                    <AddMedicalHistoryButton />
                </div>
            </div>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default MedicalHistory;
