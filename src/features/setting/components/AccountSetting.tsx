
import { useTranslation } from "react-i18next";
import DeleteAccountSection from "./DeleteAccountSection";
import SignoutSection from "./SignoutSection";


export default function AccountSetting() {
  const {i18n , t} = useTranslation();
    return (
    <section dir={i18n.language == "en" ? "ltl" :"rtl"}>
      <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{t("settings.account.sectionTitle")}</h1>
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <SignoutSection/>
        <DeleteAccountSection/>
      </div>
    </section>
  )
}
