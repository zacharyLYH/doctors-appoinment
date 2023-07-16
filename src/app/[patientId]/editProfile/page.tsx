import { EditProfileForm } from "@/components/editProfile-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const EditProfile = () => {
    return (
        <div className="flex items-center justify-center mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                        Don&apos;t forget to hit SUBMIT when you&apos;re done!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EditProfileForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProfile;
