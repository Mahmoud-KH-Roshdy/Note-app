interface SettingActionRowProps {
    title: string;
    description: string;
    buttonText: string;
    buttonVariant?: "danger" | "neutral"; 
    onClick: () => void;
    disabled?: boolean;
}

export default function SettingActionRow({ title, description, buttonText, buttonVariant = "neutral", onClick, disabled }: SettingActionRowProps) {
    return (
        <div className="flex items-center justify-between px-5 py-4">
            <div>
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </div>
            <button
                onClick={onClick}
                disabled={disabled}
                className={`text-sm font-medium disabled:opacity-50 cursor-pointer transition-colors ${
                    buttonVariant === "danger" ? "text-red-500 hover:text-red-600" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                {buttonText}
            </button>
        </div>
    );
}