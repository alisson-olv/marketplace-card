import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotifyToastProps {
  message: string;
  type: "info" | "success" | "warning" | "error" | "default";
}

export default function NotifyToast({ message, type }: NotifyToastProps) {
  toast(message, {
    closeOnClick: true,
    autoClose: 2000,
    position: "bottom-left",
    type: type,
  });
}
