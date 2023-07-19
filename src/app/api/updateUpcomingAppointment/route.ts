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
        const { id, description, time, date } = body;
        const updatedAppointment = await prismadb.appointment_DA.update({
            where: {
                id,
            },
            data: {
                description,
                time,
                date,
            },
        });
        return NextResponse.json(updatedAppointment);
    } catch (error) {
        console.log("APPOINTMENT_PATCH: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
