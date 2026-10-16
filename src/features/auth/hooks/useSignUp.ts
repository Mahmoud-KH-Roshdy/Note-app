import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { signUp } from "../services/Auth";
import { useTranslation } from "react-i18next";
interface SignUpData {
    email: string,
    password: string,
}
function useSignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { t } = useTranslation();
    const { mutate: handleSignUp, isPending: isSubmitting } = useMutation({
        mutationFn: async ({ email, password }: SignUpData) => {
            return await signUp(email, password);
        },
        onSuccess: (userCredential) => {
            setUser(userCredential.user);
            toast.success(t("auth.signUp.successToast"));
            navigate("/", { replace: true });
        },
        onError: (error: unknown) => {
            console.error("Sign up error", error);

            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    toast.error(t("auth.signUp.errors.emailInUse"));
                    return;
                }
                if (error.code === "auth/weak-password") {
                    toast.error(t("auth.signUp.errors.weakPassword"));
                    return;
                }
                if (error.code === "auth/invalid-email") {
                    toast.error(t("auth.signUp.errors.invalidEmail"));
                    return;
                }
            }
            toast.error(t("auth.signUp.errors.generic"));
        }
    });

    function onSubmit(data: SignUpData) {
        handleSignUp(data);
    }
    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        navigate
    }
}

export default useSignUp
