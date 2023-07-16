

import { getAllMedicalHistory } from "@/actions/get-all-medical-history";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

enum MedicalHistoryType {
    Medication,
    Allergy,
    ChronicConditions,
}

interface MedicalHistorySummary {
    id: string;
    medicalHistoryType: MedicalHistoryType;
    value: string;
}

const DisplayMedicalHistory = async () => {
    const medicalHistory: MedicalHistorySummary[] =
        await getAllMedicalHistory();
    const handleViewDetails = (id: string) => {};
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-4">
                <Table className="mt-8">
                    <TableCaption>
                        A list of your medical history facts.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead className="text-right">
                                Details
                            </TableHead>
                            <TableHead></TableHead>{" "}
                            {/* Add an empty table head for the button column */}
                        </TableRow>
                    </TableHeader>
                    {medicalHistory!.map((his) => (
                        <TableBody key={his.id}>
                            {" "}
                            {/* Add a unique key for each table row */}
                            <TableRow>
                                <TableCell className="font-medium">
                                    {his.medicalHistoryType}
                                </TableCell>
                                <TableCell className="text-right">
                                    {his.value}
                                </TableCell>
                                <TableCell>
                                    {/* <button
                                        className="text-blue-500"
                                        onClick={() =>
                                            handleViewDetails(his.id)
                                        }
                                    >
                                        View More Details
                                    </button> */}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default DisplayMedicalHistory;
