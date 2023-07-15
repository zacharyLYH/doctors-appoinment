"use client";
import { useState } from "react";
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

interface BirthDateInputProps {
    onSelect: (date: Date | null) => void;
}

const BirthDateInput: React.FC<BirthDateInputProps> = ({ onSelect }) => {
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleBirthDateChange = (date: Date | null) => {
        setBirthDate(date);
        setValidationError(null);
        try {
            birthDateSchema.parse(date);
            onSelect(date);
        } catch (error) {
            if (error instanceof ZodError) {
                setValidationError(error.message);
            }
        }
    };

    return (
        <div>
            <DatePicker
                selected={birthDate}
                onChange={handleBirthDateChange}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                scrollableYearDropdown
                placeholderText="Click me"
                className="inline-block bg-white-600 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300 ease-in-out"
            />
            {validationError && <div>{validationError}</div>}
        </div>
    );
};

export default BirthDateInput;
