import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/ui/register-form";

const RegisterUser = () => {
    return (
        <div className="flex items-center justify-center mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Registration</CardTitle>
                    <CardDescription>
                        Before moving on, we need some information about you!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterUser;
