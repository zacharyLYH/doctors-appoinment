"use client";

import { Button } from "@/components/ui/button";

const DeleteButton = () => {
    const deleteUser = async () => {
        await fetch("/api/deleteUser", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        window.location.assign(`/`);
    };
    return <Button onClick={deleteUser}>Delete this user</Button>;
};

export default DeleteButton;
