import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const entireHistory = await prismadb.medicalHistory_DA.findMany({
            where: {
                patientId: userId,
            },
        });
        const historyItems = entireHistory.map(
            ({ id, medicalHistoryType, value, additionalNotes }) => ({
                id,
                medicalHistoryType,
                value,
                additionalNotes
            })
        );
        return NextResponse.json(historyItems);
    } catch (error) {
        console.log("GET_PROFILE: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};