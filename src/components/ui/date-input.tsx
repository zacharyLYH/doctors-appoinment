"use client";
import { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const birthDateSchema = z.date().refine(
    (value) => {
        const currentDate = new Date();
        return value < currentDate;
    },
    {
        message: "Birth date must be in the past",
    }
);

const appointmentDateSchema = z.date().refine(
    (value) => {
        const currentDate = new Date();
        return value >= currentDate;
    },
    {
        message: "The soonest appointment is today",
    }
);

interface DateInputProps {
    onSelect: (date: Date | null) => void;
    initialValue?: Date | null;
    type: string;
}

const DateInput: React.FC<DateInputProps> = ({
    onSelect,
    initialValue,
    type,
}) => {
    const [date, setDate] = useState<Date | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleDateChange = (date: Date | null) => {
        setDate(date);
        setValidationError(null);
        try {
            type === "birthday"
                ? birthDateSchema.parse(date)
                : appointmentDateSchema.parse(date);
            onSelect(date);
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(error.message);
                setValidationError(error.message);
            }
        }
    };
    useEffect(() => {
        if (initialValue) {
            const date = new Date(initialValue);
            setDate(date);
        }
    }, [initialValue]);

    return (
        <div>
            <DatePicker
                selected={date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                scrollableYearDropdown
                placeholderText="Click me"
                className="inline-block bg-white-600 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300 ease-in-out"
                yearDropdownItemNumber={90}
                value={date ? date.toLocaleDateString() : undefined}
            />
            {validationError && <div>{validationError}</div>}
        </div>
    );
};

export default DateInput;
