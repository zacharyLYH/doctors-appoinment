import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    return (
        <>
            <div>
                {children}
            </div>
        </>
    );
}
