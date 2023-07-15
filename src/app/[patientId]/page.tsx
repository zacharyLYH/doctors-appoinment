import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

const Hello = async ({ params }: { params: { patientId: string } }) => {
    const patient = await prismadb.patient_DA.findMany({
        where: {
            patientId: params.patientId,
        },
    });
    console.log(patient)
    return <div>Hello</div>;
};

export default Hello;
