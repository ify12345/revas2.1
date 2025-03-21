import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastProps = {
  msg: string;
  type: "success" | "error";
};

export const showToast = ({ msg, type }: ToastProps) => {
  const config = {
    position: "top-right" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light" as const,
    transition: Bounce,
  };

  if (type === "success") {
    toast.success(msg, config);
  } else if (type === "error") {
    toast.error(msg, config);
  }
};
