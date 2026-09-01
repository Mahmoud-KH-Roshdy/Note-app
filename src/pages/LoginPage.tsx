import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { login } from "../services/Auth";
import { FirebaseError } from "firebase/app";

interface loginData {
    email: string,
    password: string,
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<loginData>();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const { mutate: handleLogin, isPending: isSubmitting } = useMutation({
        mutationFn: async ({ email, password }: loginData) => {
            return await login(email, password);
        },
        onSuccess: (userCredential) => {
            setUser(userCredential.user);
            toast.success(" Login Successfully");
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
                    toast.error("Incorrect email or password");
                    return;
                }
            }
            toast.error("Something went wrong, please try again");
        }
    });

    function onSubmit(data: loginData) {
        handleLogin(data);
    }

    return (
        <main className="flex min-h-screen w-screen items-center justify-center bg-gray-50 p-4 font-sans">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-200">

                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F5F7] text-[#D64E51] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Login into your account</h1>
                    <p className="text-gray-500 text-sm mt-1.5">Welcome back, login to organize your personal notes</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                        <input
                            type="email"
                            autoComplete="email"
                            className={`w-full rounded-xl bg-gray-50 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#D64E51]'} p-3 text-sm text-gray-900 focus:outline-none transition-all placeholder:text-gray-400`}
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "The email is required to create an account"
                            })}
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1.5 block font-medium">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            className={`w-full rounded-xl bg-gray-50 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#D64E51]'} p-3 text-sm text-gray-900 focus:outline-none transition-all placeholder:text-gray-400`}
                            placeholder="••••••••"
                            {...register("password", {
                                required: "The password is required to create an account",
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
                                Login...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-xs">
                        Create an account?{" "}
                        <span
                            className="text-[#D64E51] font-medium cursor-pointer hover:underline"
                            onClick={() => navigate("/sign")}
                        >
                            Sign up
                        </span>
                    </p>
                </div>

            </div>
        </main>
    );
}