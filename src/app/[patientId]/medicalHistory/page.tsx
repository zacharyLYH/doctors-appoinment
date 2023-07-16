import AddMedicalHistoryButton from "@/components/add-medical-history-modal";
import DisplayMedicalHistory from "@/components/display-medical-history";
import { Separator } from "@/components/ui/separator";

const MedicalHistory = async ({
    params,
}: {
    params: { patientId: string };
}) => {
    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-md shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Medical History</h2>
                <div className="md:ml-auto">
                    <AddMedicalHistoryButton />
                </div>
            </div>
            <DisplayMedicalHistory />
            <Separator className="my-4" />
        </div>
    );
};

export default MedicalHistory;
