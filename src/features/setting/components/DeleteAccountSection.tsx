import  { useState } from 'react'
import SettingActionRow from './SettingActionRow';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { useTranslation } from 'react-i18next';
import useDeleteAccount from '../hooks/useDeleteAccount';

export default function DeleteAccountSection() {
    const { t } = useTranslation();
    const [wantDeleteAccount, setWantDeleteAccount] = useState<boolean>(false);
    const {isDeletingAccount , handleDeleteAccount} = useDeleteAccount();
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
