"use client";

import React, { useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import DateInput from "../ui/date-input";

const formSchema = z.object({
    id: z.string(),
    description: z.string().nonempty(),
    time: z.string().refine(
        (time) => {
            // Check if time is in the HH:mm format and between 00:00 and 23:59
            const match = time.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
            return Boolean(match);
        },
        {
            message:
                "Invalid time format. Expected format is HH:mm in 24-hour time.",
        }
    ),
    date: z.date(),
});

const getAnAppointment = async (id: string) => {
    const history = await fetch(`/api/getOneAppointment?id=${id}`);
    return await history.json();
};

interface EditAppointmentsButtonProps {
    isOpen: boolean;
    appId: string;
    closeModal: () => void;
}

const EditAppointmentsButton: React.FC<EditAppointmentsButtonProps> = ({
    appId,
    isOpen,
    closeModal,
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getAnAppointment(appId);
                form.reset(profileData); // Set the fetched data as default values
            } catch (error) {
                console.error("Error fetching patient profile:", error);
            }
        };
        fetchData();
    }, [form]);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const updateUpcomingAppointment = await fetch(
                "/api/updateUpcomingAppointment",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const convertJson = await updateUpcomingAppointment.json();
            window.location.assign(`/${convertJson.patientId}`);
        } catch (error) {
            toast.error("Something went wrong with updating appointment");
            console.log(error);
        }
    }
    return (
        <div>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Update medical profile</CardTitle>
                            <CardDescription>
                                Keep your profile up to date!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <FormField
                                        control={form.control}
                                        name="time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Time</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="23:59"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <FormDescription>
                                                    Date time must be in 24 hour
                                                    format (HH:mm)
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Experiencing a fever, mild flu..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <FormDescription>
                                                    Tell us what&apos;s up!
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <DateInput
                                                        onSelect={(value) => {
                                                            form.setValue(
                                                                "date",
                                                                value!
                                                            );
                                                        }}
                                                        initialValue={
                                                            field.value
                                                        }
                                                        type="appointment"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <FormDescription>
                                                    When would you like this
                                                    appointment?
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </Modal>
            )}
        </div>
    );
};

export default EditAppointmentsButton;
