"use client";

import React, { useEffect } from "react";
import Modal from "./ui/modal";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";

enum MedicalHistoryType {
    Medication = "Medication",
    Allergy = "Allergy",
    ChronicConditions = "ChronicConditions",
}

const formschema = z.object({
    id: z.string(),
    additionalNotes: z.string().min(3),
    value: z.string().min(1),
    medicalHistoryType: z.enum([
        MedicalHistoryType.Medication as "Medication",
        MedicalHistoryType.Allergy as "Allergy",
        MedicalHistoryType.ChronicConditions as "ChronicConditions",
    ]),
});

const medicalHistory = async (id: string) => {
    const history = await fetch(`/api/getOneMedicalHistory?id=${id}`);
    return await history.json();
};

interface EditMedicalHistoryButtonProps {
    isOpen: boolean;
    historyId: string;
    closeModal: () => void;
}

const EditMedicalHistoryButton: React.FC<EditMedicalHistoryButtonProps> = ({
    historyId,
    isOpen,
    closeModal,
}) => {
    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {},
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await medicalHistory(historyId);
                form.reset(profileData); // Set the fetched data as default values
            } catch (error) {
                console.error("Error fetching patient profile:", error);
            }
        };
        fetchData();
    }, [form]);
    async function onSubmit(values: z.infer<typeof formschema>) {
        try {
            const createMedicalHistory = await fetch(
                "/api/updateMedicalHistory",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const convertJson = await createMedicalHistory.json();
            window.location.assign(`/${convertJson.patientId}/medicalHistory`);
        } catch (error) {
            toast.error("Something went wrong with registering user");
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
                                    className="w-2/3 space-y-6"
                                >
                                    <FormField
                                        control={form.control}
                                        name="medicalHistoryType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Medical History Type
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder={
                                                                    field.value
                                                                }
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Allergy">
                                                            Allergy
                                                        </SelectItem>
                                                        <SelectItem value="Medication">
                                                            Medication
                                                        </SelectItem>
                                                        <SelectItem value="ChronicConditions">
                                                            Chrnonic Conditions
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="value"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Value</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Penicilin"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="additionalNotes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Additional Notes
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us more..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-between">
                                        <Button
                                            variant="outline"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </Button>
                                        <Button>Update</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </Modal>
            )}
        </div>
    );
};

export default EditMedicalHistoryButton;
