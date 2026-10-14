import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import deleteAccount from "../../auth/services/delete";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function useDeleteAccount() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { mutate: handleDeleteAccount, isPending: isDeletingAccount } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            toast.success(t("settings.account.deleteAccountSuccess"));
            navigate("/sign");
        },
        onError: (error) => {
            if (error)
                toast.error(t("settings.account.deleteAccountError"));
            console.error(error);
        }
    });
    return {
        handleDeleteAccount,
        isDeletingAccount,
    }
}

export default useDeleteAccount
