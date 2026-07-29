import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-100"></div>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/sign" replace />;
    }
    return <>{children}</>;
}