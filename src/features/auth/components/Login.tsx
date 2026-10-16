import { useTranslation } from 'react-i18next';
import useLogin from '../hooks/useLogin';
import AuthLayout from './AuthLayout';

export default function Login() {
    const { handleSubmit, onSubmit, register, navigate, errors, isSubmitting } = useLogin()
    const { t ,i18n } = useTranslation();
    return (
        <AuthLayout
            title={t("auth.login.title")}
            subtitle={t("auth.login.subtitle")}
            footerText={t("auth.login.noAccount")}
            footerLinkText={t("auth.login.signUpLink")}
            navgaiteFn={() => navigate("/sign")}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir={i18n.language == "en" ? "ltl":"rtl"} >
                <div>
                    <label className={` block text-sm font-medium text-gray-700 mb-2 ${i18n.language == "en" ?  `text-left`:`text-right`}` }>{t("auth.labels.email")}</label>
                    <input
                        type="email"
                        autoComplete="email"
                        className={`w-full rounded-xl bg-gray-50 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#D64E51]'} p-3 text-sm text-gray-900 focus:outline-none transition-all placeholder:text-gray-400`}
                        placeholder={t("auth.placeholders.email")}
                        {...register("email", {
                            required: t("auth.validation.emailRequired")
                        })}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1.5 block font-medium">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("auth.labels.password")}</label>
                    <input
                        type="password"
                        autoComplete="current-password"
                        className={`w-full rounded-xl bg-gray-50 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#D64E51]'} p-3 text-sm text-gray-900 focus:outline-none transition-all placeholder:text-gray-400`}
                        placeholder="••••••••"
                        {...register("password", {
                            required: t("auth.validation.passwordRequired"),
                        })}
                    />
                    {errors.password && <span className="text-red-500 text-xs mt-1.5 block font-medium">{errors.password.message}</span>}
                </div>

                <button
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-[#D64E51] p-3 text-sm font-semibold text-white hover:bg-[#c23e41] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                            {t("auth.login.submitting")}
                        </>
                    ) : (
                        t("auth.login.submitBtn"))}
                </button>
            </form>
        </AuthLayout>
    );
}
