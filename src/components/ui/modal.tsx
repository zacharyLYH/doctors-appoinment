"use client";
import React, { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg ">
            <div className="bg-white rounded-lg shadow-lg p-4 ">
                {children}
            </div>
        </div>
    );
};

export default Modal;
