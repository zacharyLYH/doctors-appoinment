import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function DELETE(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const body = await req.json();
        const { deleteId } = body;
        const deleted = await prismadb.medicalHistory_DA.deleteMany({
            where: {
                patientId: userId,
                id: deleteId,
            },
        });
        return NextResponse.json(deleted);
    } catch (error) {
        console.log("MEDICAL_HISTORY_DELETE: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
