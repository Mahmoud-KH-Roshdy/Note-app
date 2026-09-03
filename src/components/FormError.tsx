import { IoAlertCircle } from "react-icons/io5";

interface FormErrorProps {
    message?: string;
}

export default function FormError({ message }: FormErrorProps) {
    if (!message) return null;

    return (
        <div className="flex items-center gap-1.5 mt-1.5">
            <IoAlertCircle className="text-red-500 shrink-0" size={14} />
            <span className="text-red-500 text-xs font-medium">{message}</span>
        </div>
    );
}