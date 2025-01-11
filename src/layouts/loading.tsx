import Lottie from "lottie-react";
import loading2 from "../assets/loading.json";

const Loading = () => {

    return (
        <div className="h-svh w-full fixed top-0 backdrop-blur-3xlleft-0 flex justify-center items-center z-10">
            <Lottie animationData={loading2} loop={true} className="w-36" />
        </div>

    );
};

export default Loading;
