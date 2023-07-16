"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import toast from "react-hot-toast";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import BirthDateInput from "./birth-date-input";

const bloodType = [
    { label: "A", value: "a" },
    { label: "B", value: "b" },
    { label: "O", value: "o" },
] as const;

const genderOptions = [
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
    { label: "Non-Binary", value: "nb" },
] as const;

const formSchema = z.object({
    name: z
        .string({ required_error: "Please give your full name." })
        .nonempty(),
    email: z.string().email().nonempty(),
    phone: z
        .string()
        .nonempty()
        .length(10, "Phone number must be 10 digits long"),
    gender: z.string().nonempty(),
    bloodType: z.string().nonempty(),
    weight: z.string().nonempty(),
    height: z.string().nonempty(),
    dateOfBirth: z.date(),
});

export function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch("/api/register", {
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="jsmith@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Gender</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? genderOptions.find(
                                                      (gender) =>
                                                          gender.value ===
                                                          field.value
                                                  )?.label
                                                : "Select Gender"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput />
                                        <CommandEmpty>
                                            No gender found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {genderOptions.map((gender) => (
                                                <CommandItem
                                                    value={gender.value}
                                                    key={gender.value}
                                                    onSelect={(value) => {
                                                        form.setValue(
                                                            "gender",
                                                            value
                                                        );
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            gender.value ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {gender.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight in kg</FormLabel>
                            <FormControl>
                                <Input placeholder="22" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height in meters</FormLabel>
                            <FormControl>
                                <Input placeholder="33" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bloodType"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Blood Type</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? bloodType.find(
                                                      (blood) =>
                                                          blood.value ===
                                                          field.value
                                                  )?.label
                                                : "Select blood"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput />
                                        <CommandEmpty>
                                            No blood type found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {bloodType.map((blood) => (
                                                <CommandItem
                                                    value={blood.value}
                                                    key={blood.value}
                                                    onSelect={(value) => {
                                                        form.setValue(
                                                            "bloodType",
                                                            value
                                                        );
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            blood.value ===
                                                                field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {blood.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of birth</FormLabel>
                            <FormControl>
                                <BirthDateInput
                                    onSelect={(value) => {
                                        form.setValue("dateOfBirth", value!);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Only a valid year works!
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
