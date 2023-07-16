import { MainNav } from "@/components/main-nav";
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
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4"></div>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
}
