"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathName = usePathname();
    const params = useParams();
    const routes = [
        {
            href: `/${params.patientId}`,
            label: "Dashboard",
            active: pathName === `/${params.patientId}`,
        },
        {
            href: `/${params.patientId}/editProfile`,
            label: "Edit Profile",
            active: pathName === `/${params.patientId}/editProfile`,
        },
        {
            href: `/${params.patientId}/appointments`,
            label: "Make Appointments",
            active: pathName === `/${params.patientId}/appointments`,
        },
        {
            href: `/${params.patientId}/medicalHistory`,
            label: "Medical History",
            active: pathName === `/${params.patientId}/medicalHistory`,
        },
        {
            href: `/${params.patientId}/settings`,
            label: "Settings",
            active: pathName === `/${params.patientId}/settings`,
        },
    ];
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-mdium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white font-bold"
                            : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
