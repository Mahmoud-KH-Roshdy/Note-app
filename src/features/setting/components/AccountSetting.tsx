import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import deleteAccount from "../../auth/services/delete";
import { toast } from "react-hot-toast";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import SettingActionRow from "./SettingActionRow";
import logout from "../../auth/services/signout";


export default function AccountSetting() {
  const navigate = useNavigate();
  const [wantLogout, setWantLogout] = useState<boolean>(false);
  const [wantDeleteAccount, setWantDeleteAccount] = useState<boolean>(false);
  const { mutate: hanldeSignout, isPending:isSignout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success(" Signout Successfully");
      navigate("/login");
    },
    onError: (error) => {
      if (error) toast.error("Faild to Signout from an account");
      console.error(error.cause);
    }
  });

  const { mutate:handleDeleteAccount, isPending: isDeletingAccount } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success(" Deleted Successfully");
      navigate("/sign");
    },
    onError: (error) => {
      if (error) toast.error("Faild to delete an Account");
      console.error(error.cause);
    }
  });
  return (
    <section>
      <h1 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Account</h1>
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <SettingActionRow title="Sign out" description="You'll need to log back in to access your notes" onClick={() => setWantLogout(true)} disabled={isSignout} buttonText=" Sign out" />
        <ConfirmDeleteModal
          isOpen={wantLogout}
          onOpenChange={setWantLogout}
          title={"Logout"}
          confrimText={"Signout"}
          children={"Are you sure you want to logout?"}
          isDeleting={isSignout}
          onConfirm={hanldeSignout}
        />
        <SettingActionRow title="Delete account" description="This will erase your account and all your notes forever" onClick={() => setWantDeleteAccount(true)} disabled={isDeletingAccount} buttonText="Delete" buttonVariant="danger" />
        <ConfirmDeleteModal
          isOpen={wantDeleteAccount}
          onOpenChange={setWantDeleteAccount}
          title={"Logout"}
          confrimText={"Delete Account"}
          children={"Are you sure you want to delete Your profile and all stored notes will be erased forever.?"}
          isDeleting={isDeletingAccount}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </section>
  )
}
