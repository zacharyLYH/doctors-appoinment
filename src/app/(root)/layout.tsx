import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const hasAccount = await prismadb.patient_DA.findFirst({
        where: {
            patientId: userId
        }
    })
    if(hasAccount){
        redirect(`/${userId}`)
    }
    return <>{children}</>
}