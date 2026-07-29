import { useMutation } from "@tanstack/react-query";
import logout from "../services/signout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import deleteAccount from "../services/delete";
import { auth } from "../services/firebase";
import { useState } from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function Setting() {
    const navigate = useNavigate();
    const [wantLogout, setWantLogout] = useState<boolean>(false)
    const [wantDeleteAccount, setWantDeleteAccount] = useState<boolean>(false)
    const user = auth.currentUser
    const { mutate: hanldeSignout, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success(" Signout Successfully");
            navigate("/login");
        },
        onError: (error) => {
            if (error) toast.error("Faild to Signout a account");
            console.error(error);
        }
    },
    )
    const { mutate, isPending: deleting } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            toast.success(" Deleted Successfully");
            navigate("/sign");
        },
        onError: (error) => {
            if (error) toast.error("Faild to delete a account");
            console.error(error);
        }
    },
    )
    return (
        <div className=" flex">
            <Sidebar />
            <main>
                <div className="">
                    <button onClick={() => setWantLogout(true)} disabled={isPending}>  signOut </button>
                    <ConfirmDeleteModal isOpen={wantLogout} onOpenChange={setWantLogout} title={"Logout"} confrimText={"Logout"} children={"Are you sure you want to logout?"} isDeleting={isPending} onConfirm={ hanldeSignout} />

                </div>
                <div className="">
                    <button onClick={() => setWantDeleteAccount(true)} disabled={deleting}>  Delete  </button>
                    <ConfirmDeleteModal isOpen={wantDeleteAccount} onOpenChange={setWantDeleteAccount} title={"Logout"} confrimText={"Delete Account"} children={"Are you sure you want to delete Your profile and all stored notes will be erased forever.?"} isDeleting={deleting} onConfirm={ mutate} />
                </div>
                <div>
                    <span>{user?.email}</span>
                </div>
            </main>

        </div>
    )
}
