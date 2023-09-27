"use client";
import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/layouts/OrderHeader";
import Footer from "@/components/layouts/OrderFooter";
import { Global } from "@emotion/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { User } from "@/libs/types/user";
import { SignIn, SignUp } from "@/libs/apis/order/User";
import { usePathname, useRouter } from "next/navigation";

let DEBUG = true; // TODO: falseにする

export default function Layout({ children }: { children: React.ReactNode }) {
    const [newUser, setNewUser] = React.useState<User | undefined>();
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        const USER_ID: string | null = localStorage.getItem("user-id");
        if (USER_ID) {
            SignIn(USER_ID)
                .then((res) => {
                    setNewUser(res);
                    localStorage.setItem("user-id", res.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            SignUp()
                .then((res) => {
                    setNewUser(res);
                    localStorage.setItem("user-id", res.id);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    if (newUser === undefined) {
        return (
            <ThemeRegistry>
                <main>
                    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </main>
            </ThemeRegistry>
        );
    }

    if (newUser.isOrdered === false && pathname === "/I3/order/completed" && DEBUG === false) {
        router.push("/I3/order/menus");
    }
    if (newUser.isOrdered === true && pathname !== "/I3/order/completed" && DEBUG === false) {
        router.push("/I3/order/completed");
    }

    return (
        <>
            <ThemeRegistry>
                <Global
                    styles={{
                        main: {
                            padding: "20px",
                        },
                    }}
                />
                <Header title={"小林トルネード(I3)"} />
                {children}

                <Footer />
            </ThemeRegistry>
        </>
    );
}
