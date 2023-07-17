import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return new NextResponse("Bad request error", { status: 401 });
        }
        const entireHistory = await prismadb.medicalHistory_DA.findFirst({
            where: {
                patientId: userId,
                id,
            },
        });
        if (!entireHistory) {
            return new NextResponse("Unfound error", { status: 404 });
        }
        const historyItem = {
            id: entireHistory.id,
            medicalHistoryType: entireHistory.medicalHistoryType,
            value: entireHistory.value,
            additionalNotes: entireHistory.additionalNotes,
        };
        return NextResponse.json(historyItem);
    } catch (error) {
        console.log("GET_MEDICAL_HISTORY: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
