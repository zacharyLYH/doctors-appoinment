import { FaSpinner } from "react-icons/fa";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <FaSpinner className="animate-spin text-5xl text-gray-600" />
        </div>
    );
};

export default Loading;
