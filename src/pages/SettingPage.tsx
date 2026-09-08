import UserProfile from "../features/setting/components/UserProfile";
import NoteSetting from "../features/setting/components/NoteSetting";
import AccountSetting from "../features/setting/components/AccountSetting";
import NavToggleBtn from "../components/NavToggleBtn";
export default function Setting() {
    return (
        <div className="flex h-screen bg-gray-50">
            <main className="flex-1 overflow-y-auto px-6 py-10 sm:px-12">
                <div className="max-w-xl mx-auto space-y-10">
                    <NavToggleBtn className=" fill-[#7B7D7D]  h-auto w-7 cursor-pointer w transition-colors absolute left-1 top-1"/>
                    <UserProfile/>
                    <NoteSetting/>
                    <AccountSetting/>
                </div>
            </main>
        </div>
    );
}