import { useTranslation } from "react-i18next";
import SettingActionRow from "./SettingActionRow";


export default function GeneralSetting() {
    const {  i18n } = useTranslation();
    const toggleLang = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
    };
    return (
        <section>
            <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Account</h1>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                <SettingActionRow title="اللغة" description="اللغة ال انت عايزها؟" buttonText={i18n.language === "en" ? "English" : "العربية"} onClick={toggleLang} />
            </div>
        </section>
    )
}
