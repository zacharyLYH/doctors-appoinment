"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import DateInput from "./ui/date-input";

const formSchema = z.object({
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

export function MakeAppointmentForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch("/api/postAppointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const convertJson = await response.json();
            window.location.assign(`/${convertJson.patientId}`);
        } catch (error) {
            toast.error("Something went wrong with registering user");
            console.log(error);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                                <Input placeholder="23:59" {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Date time must be in 24 hour format (HH:mm)
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
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
                                        form.setValue("date", value!);
                                    }}
                                    initialValue={field.value}
                                    type="appointment"
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                When would you like this appointment?
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
