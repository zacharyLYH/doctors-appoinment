import { MakeAppointmentForm } from "@/components/make-appointment-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Appointments: React.FC = async () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <Card>
                    <CardHeader>
                        <CardTitle>Make your appointment here!</CardTitle>
                        <CardDescription>
                            You'll be able to modify this appointment at a later
                            date!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MakeAppointmentForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Appointments;
