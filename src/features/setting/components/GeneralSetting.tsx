import { useTranslation } from "react-i18next";
import SettingActionRow from "./SettingActionRow";

export default function GeneralSetting() {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
    };
    return (
        <section dir={i18n.language == "en" ? "ltl" : "rtl"}>
            <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {t("settings.general.sectionTitle")}
            </h1>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                <SettingActionRow
                    title={t("settings.general.languageTitle")}
                    description={t("settings.general.languageDescription")}
                    buttonText={t("settings.general.currentLanguage")}
                    onClick={toggleLang}
                />
            </div>
        </section>
    );
}