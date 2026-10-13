import  { useState } from 'react'
import SettingActionRow from './SettingActionRow';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import deleteAccount from '../../auth/services/delete';
import { toast } from 'react-hot-toast';

export default function DeleteAccountSection() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [wantDeleteAccount, setWantDeleteAccount] = useState<boolean>(false);
    const { mutate: handleDeleteAccount, isPending: isDeletingAccount } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            toast.success(t("settings.account.signOutSuccess"));
            navigate("/sign");
        },
        onError: (error) => {
            if (error)
                toast.error(t("settings.account.signOutError"));
            console.error(error);
        }
    });
    return (
        <>
            <SettingActionRow
                title={t("settings.account.deleteAccountTitle")}
                description={t("settings.account.deleteAccountDescription")}
                onClick={() => setWantDeleteAccount(true)}
                disabled={isDeletingAccount}
                buttonText={t("settings.account.deleteAccountBtn")}
                buttonVariant="danger"
            />
            <ConfirmDeleteModal
                isOpen={wantDeleteAccount}
                onOpenChange={setWantDeleteAccount}
                title={t("modals.deleteAccount.title")}
                confirmText={t("modals.deleteAccount.confirm")}
                isDeleting={isDeletingAccount}
                onConfirm={handleDeleteAccount}
            >
                {t("modals.deleteAccount.message")}
            </ConfirmDeleteModal>
        </>
    )
}
