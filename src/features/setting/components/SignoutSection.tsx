import  { useState } from 'react'
import SettingActionRow from './SettingActionRow';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import logout from '../../auth/services/signout';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function SignoutSection() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [wantLogout, setWantLogout] = useState<boolean>(false);
    const { mutate: hanldeSignout, isPending: isSignout } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success(" Signout Successfully");
            navigate("/login");
        },
        onError: (error) => {
            if (error) toast.error("Faild to Signout from an account");
            console.error(error.cause);
        }
    });
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
