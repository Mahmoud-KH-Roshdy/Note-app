import  { useState } from 'react'
import SettingActionRow from './SettingActionRow';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { useTranslation } from 'react-i18next';
import useSignout from '../hooks/useSignout';

export default function SignoutSection() {
    const { t } = useTranslation();
    const [wantLogout, setWantLogout] = useState<boolean>(false);
    const {isSignout , hanldeSignout} = useSignout()
    return (
        <>
            <SettingActionRow
                title={t("settings.account.signOutTitle")}
                description={t("settings.account.signOutDescription")}
                onClick={() => setWantLogout(true)}
                disabled={isSignout}
                buttonText={t("settings.account.signOutBtn")}
            />
            <ConfirmDeleteModal
                isOpen={wantLogout}
                onOpenChange={setWantLogout}
                title={t("modals.signOut.title")}
                confirmText={t("modals.signOut.confirm")}
                isDeleting={isSignout}
                onConfirm={hanldeSignout}
            >
                {t("modals.signOut.message")}
            </ConfirmDeleteModal>
        </>
    )
}
