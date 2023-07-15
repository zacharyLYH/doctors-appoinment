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
        const {
            name,
            email,
            phone,
            gender,
            bloodType,
            weight,
            height,
            dateOfBirth,
        } = body;
        const newPatient = await prismadb.patient_DA.create({
            data: {
                patientId: userId!,
                name,
                email,
                phone,
                gender,
                bloodType,
                weight,
                height,
                dateOfBirth,
            },
        });
        return NextResponse.json(newPatient);
    } catch (error) {
        console.log("REGISTER_POST: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
