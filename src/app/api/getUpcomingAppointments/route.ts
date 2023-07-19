import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const entireHistory = await prismadb.appointment_DA.findMany({
            where: {
                patientId: userId,
                date: {
                    gt: new Date(),
                },
            },
        });
        return NextResponse.json(entireHistory);
    } catch (error) {
        console.log("GET_UPCOMING_APPOINTMENTS: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
