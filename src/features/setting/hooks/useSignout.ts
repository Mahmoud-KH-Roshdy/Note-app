import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import logout from "../../auth/services/signout";
import { toast } from "react-hot-toast";

function useSignout() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutate: hanldeSignout, isPending: isSignout } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success(t("settings.account.signOutSuccess"));
            navigate("/login");
        },
        onError: (error) => {
            if (error) toast.error(t("settings.account.signOutError"));
            console.error(error.cause);
        }
    });
    return {
        hanldeSignout ,
        isSignout
    }
}

export default useSignout
