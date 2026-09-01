import * as AlertDialog from '@radix-ui/react-alert-dialog';
import type { ReactNode } from 'react';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isDeleting?: boolean;
    children?: ReactNode,
    confrimText: string,
    title:string ,
}

export default function ConfirmDeleteModal({
    isOpen,
    onOpenChange,
    onConfirm,
    isDeleting,
    children,
    confrimText,
    title,
}: ConfirmDeleteModalProps) {
    return (
        <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
                <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-2xl transition-all focus:outline-none">

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
                                Cancel
                            </button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Action asChild>
                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="rounded-xl  cursor-pointer bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                                {isDeleting ? "Deleting..." : confrimText}
                            </button>
                        </AlertDialog.Action>
                    </div>

                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}