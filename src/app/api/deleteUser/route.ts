import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function DELETE(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const deleted = await prismadb.patient_DA.deleteMany({
            where: {
                patientId: userId,
            },
        });
        return NextResponse.json(deleted);
    } catch (error) {
        console.log("REGISTER_POST: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
