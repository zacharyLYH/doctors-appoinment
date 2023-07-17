import AddMedicalHistoryButton from "@/components/add-medical-history-modal";
import { DataTable } from "@/app/[patientId]/medicalHistory/data-table";
import { MedicalHistorySummary, columns } from "../medicalHistory/columns";
import { getAllMedicalHistory } from "@/actions/get-all-medical-history";

async function getData(): Promise<MedicalHistorySummary[]> {
    const medicalHistory: MedicalHistorySummary[] =
        await getAllMedicalHistory();
    return medicalHistory;
}

const MedicalHistory = async ({
    params,
}: {
    params: { patientId: string };
}) => {
    const data = await getData();
    return (
        <div className="mt-2 max-w-3xl mx-auto p-4 bg-gray-100 rounded-md shadow-lg">
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
