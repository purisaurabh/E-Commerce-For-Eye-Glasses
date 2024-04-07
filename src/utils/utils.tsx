import { toast } from "react-toastify";

export const notify = (type: string, message: string, delay: any) => {
    if (type === "success") {
        toast.success(message, {
            position: "bottom-center",
            delay,
        });
    } else if (type === "error") {
        toast.error(message, {
            position: "bottom-center",
            delay,
        });
    } else if (type === "warn") {
        toast.warn(message, {
            position: "bottom-center",
            delay,
        });
    } else {
        toast.info(message, {
            position: "bottom-center",
            delay,
        });
    }
};