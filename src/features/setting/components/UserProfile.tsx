import { auth } from "../../../services/firebase";


export default function UserProfile() {
        const user = auth.currentUser;

    return (
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <div className="w-14 h-14 rounded-full bg-[#F4F5F7] flex items-center justify-center text-[#D64E51] font-semibold text-lg shrink-0">
                {user?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
                <h1 className="text-sm font-medium text-gray-400">User Profile</h1>
                <span className="text-gray-900 font-medium">{user?.email}</span>
            </div>
        </div>
    )
}
