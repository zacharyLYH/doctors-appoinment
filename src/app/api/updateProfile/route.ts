import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        const body = await req.json();
        const {
            id,
            name,
            email,
            phone,
            gender,
            bloodType,
            weight,
            height,
            dateOfBirth,
        } = body;
        const updatedProfile = await prismadb.patient_DA.update({
            where: {
                id
            },
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
        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.log("UPDATE_PROFILE_PATCH: ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}