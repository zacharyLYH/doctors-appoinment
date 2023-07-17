import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        const body = await req.json();
        const { id, additionalNotes, value, medicalHistoryType } = body;
        const updatedHistory = await prismadb.medicalHistory_DA.update({
            where: {
                id,
            },
            data: {
                additionalNotes,
                value,
                medicalHistoryType,
            },
        });
        return NextResponse.json(updatedHistory);
    } catch (error) {
        console.log("MEDICAL_HISTORY_PATCH: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
