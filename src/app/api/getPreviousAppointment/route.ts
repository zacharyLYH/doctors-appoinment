import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const previousApps = await prismadb.appointment_DA.findMany({
            where: {
                patientId: userId,
                date: {
                    lt: new Date(),
                },
            },
        });
        return NextResponse.json(previousApps);
    } catch (error) {
        console.log("GET_PREVIOUS_APPOINTMENTS: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
