import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

enum MedicalHistoryType {
    Medication = "Medication",
    Allergy = "Allergy",
    ChronicConditions = "ChronicConditions",
}

export const getAllMedicalHistory = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect("/");
    }
    const entireHistory = await prismadb.medicalHistory_DA.findMany({
        where: {
            patientId: userId,
        },
    });
    const historyItems = entireHistory.map(
        ({ id, medicalHistoryType, value }) => ({
            id,
            medicalHistoryType: medicalHistoryType as MedicalHistoryType,
            value,
        })
    );
    return historyItems;
};
