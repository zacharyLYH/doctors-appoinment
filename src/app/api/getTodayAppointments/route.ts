import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const todaysApps = await prismadb.appointment_DA.findMany({
            where: {
                patientId: userId,
                date: {
                    equals: new Date(),
                },
            },
        });
        return NextResponse.json(todaysApps);
    } catch (error) {
        console.log("GET_TODAYS_APPOINTMENTS: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
