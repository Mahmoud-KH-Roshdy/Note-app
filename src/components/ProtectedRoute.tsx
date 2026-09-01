import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#eee] border-t-[#D64E51] animate-spin" />
                    <span className="text-sm text-gray-400">Loading...</span>
                </div>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/sign" replace />;
    }
    return <>{children}</>;
}