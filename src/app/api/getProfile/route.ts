import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const patientProfile = await prismadb.patient_DA.findFirst({
            where: {
                patientId: userId
            }
        })
        return NextResponse.json(patientProfile);
    } catch (error) {
        console.log("GET_PROFILE: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}