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
        const { date, time, description } = body;
        const createAppointment = await prismadb.appointment_DA.create({
            data: {
                patientId: userId,
                date,
                time,
                description,
            },
        });
        return NextResponse.json(createAppointment);
    } catch (error) {
        console.log("APPOINTMENT_POST: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
