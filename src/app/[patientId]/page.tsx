import DeleteButton from "./deleteButton";
import DashboardPage from "@/components/dashboard";

const Dashboard = async ({ params }: { params: { patientId: string } }) => {
    return (
        <div>
            <DashboardPage />
            <DeleteButton />
        </div>
    );
};

export default Dashboard;
