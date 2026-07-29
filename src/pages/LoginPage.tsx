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
        <main className="flex min-h-screen w-screen items-center justify-center bg-slate-950 p-4 font-sans text-white">

            <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-800/80">

                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 mb-3 border border-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-100">Login into your account</h1>
                    <p className="text-slate-400 text-sm mt-1.5">Welcome back login to organize your personal notes</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                        <input
                            type="email"
                            className={`w-full rounded-xl bg-slate-850 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-slate-500'} p-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-500`}
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "The email is required to create an account"
                            })}
                        />
                        {errors.email && <span className="text-red-400 text-xs mt-1.5 block font-medium">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            className={`w-full rounded-xl bg-slate-850 border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-slate-500'} p-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-500`}
                            placeholder="••••••••"
                            {...register("password", {
                                required: "The password is required to create an account"
                            })}
                        />
                        {errors.password && <span className="text-red-400 text-xs mt-1.5 block font-medium">{errors.password.message}</span>}
                    </div>

                    <button
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-slate-100 p-3 text-sm font-semibold text-slate-950 hover:bg-slate-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/20"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-slate-950"></div>
                                Login...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-slate-400 text-xs">
                        Create an account?{" "}
                        <span
                            className="text-white font-medium cursor-pointer hover:underline"
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