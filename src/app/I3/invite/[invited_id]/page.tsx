"use client";

import { wasInvited } from "@/libs/apis/order/Invite";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";

export default function Invite() {
    const searchParams = useParams();
    const router = useRouter();
    const invitedId = typeof searchParams.invited_id === "string" ? searchParams.invited_id : searchParams.invited_id[0];
    const [isSending, setIsSending] = React.useState<boolean>(true);

    wasInvited(invitedId)
        .then(() => {})
        .catch((err) => {
            enqueueSnackbar(err);
        })
        .finally(() => {
            setIsSending(false);
        });

    if (isSending) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

    router.push("/I3/order/menus");

    return (
        <main>
            自動的にメニュー画面を表示します。
            <br />
            3秒待っても画面が遷移しない場合は、<Link href="/I3/order/menus">こちら</Link>をクリックしてください。
        </main>
    );
}
