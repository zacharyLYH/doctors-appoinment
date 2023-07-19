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
        const appointment = await prismadb.appointment_DA.findFirst({
            where: {
                patientId: userId,
                id
            },
        });
        if (!appointment) {
            return new NextResponse("Unfound error", { status: 404 });
        }
        // const historyItem = {
        //     id: appointment.id,
        //     date: appointment.date,
        //     time: appointment.time,
        //     description: appointment.description,
        // };
        return NextResponse.json(appointment);
    } catch (error) {
        console.log("GET_UPCOMING_APPOINTMENTS: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};