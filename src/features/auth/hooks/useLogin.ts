import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { login } from "../services/Auth";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface loginData {
    email: string,
    password: string,
}
export default function useLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm<loginData>();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { t } = useTranslation();
    const { mutate: handleLogin, isPending: isSubmitting } = useMutation({
        mutationFn: async ({ email, password }: loginData) => {
            return await login(email, password);
        },
        onSuccess: (userCredential) => {
            setUser(userCredential.user);
            toast.success(t("auth.login.successToast"));
            navigate("/", { replace: true });
        },
        onError: (error: unknown) => {
            console.error("Login error", error);
            if (error instanceof FirebaseError) {
                if (
                    error.code === "auth/invalid-credential" ||
                    error.code === "auth/user-not-found" ||
                    error.code === "auth/wrong-password"
                ) {
                    toast.error(t("auth.login.errors.invalidCredential"));
                    return;
                }
            }
            toast.error(t("auth.login.errors.generic"));
        }
    });

    function onSubmit(data: loginData) {
        handleLogin(data);
    }

    return {
        handleSubmit,
        onSubmit,
        register,
        navigate,
        errors,
        isSubmitting
    }
}
