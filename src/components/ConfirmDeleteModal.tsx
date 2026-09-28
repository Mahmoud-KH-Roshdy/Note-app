import * as AlertDialog from '@radix-ui/react-alert-dialog';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isDeleting?: boolean;
    children?: ReactNode,
    confirmText: string,
    title:string ,
}

export default function ConfirmDeleteModal({
    isOpen,
    onOpenChange,
    onConfirm,
    isDeleting,
    children,
    confirmText,
    title,
}: ConfirmDeleteModalProps) {
        const {  i18n } = useTranslation();
    return (
        <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed  inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
                <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-2xl transition-all focus:outline-none " dir={i18n.language === "en" ? "ltl" : "rtl"}>

                    <AlertDialog.Title className="text-lg font-bold text-gray-900">
                        {title}
                    </AlertDialog.Title>

                    <AlertDialog.Description className="mt-2 text-sm text-gray-600">
                        {children}
                    </AlertDialog.Description>

                    <div className="mt-6 flex justify-end gap-3">
                        <AlertDialog.Cancel asChild>
                            <button
                                type="button"
                                className="rounded-xl  cursor-pointer bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                {i18n.language === "en" ? "Cancel" : "الغاء"}
                            </button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="rounded-xl  cursor-pointer bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                                {isDeleting ? i18n.language === "en" ? "Deleting..." : "...حذف"
                                : confirmText}
                            </button>
                        </AlertDialog.Action>
                    </div>

                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}