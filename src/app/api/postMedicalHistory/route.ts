import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const body = await req.json();
        const { additionalNotes, value, medicalHistoryType } = body;
        const createHistory = await prismadb.medicalHistory_DA.create({
            data: {
                patientId: userId,
                additionalNotes,
                value,
                medicalHistoryType,
            },
        });
        return NextResponse.json(createHistory);
    } catch (error) {
        console.log("MEDICAL_HISTORY_POST: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
