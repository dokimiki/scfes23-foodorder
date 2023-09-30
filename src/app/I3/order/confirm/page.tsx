/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import Bold from "@/components/Bold";
import { getMenuItems } from "@/libs/apis/common/Menus";
import { CartItem, MenuItem } from "@/libs/types/item";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { CartMenu } from "./cartMenu";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { sendCartData } from "@/libs/apis/order/Carts";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode";
import { CouponItemIds, CouponKind } from "@/libs/types/coupon";
import { drawBulkLots, drawInviteLots, getCouponItemIds } from "@/libs/apis/order/Coupon";
import { MAX_CART_ITEM_QUANTITY } from "@/libs/Carts";
import jwtDecode from "jwt-decode";
import { enqueueSnackbar } from "notistack";

export default function Confirm() {
    const [menus, setMenus] = React.useState<MenuItem[]>([]);
    const [isSending, setIsSending] = React.useState<boolean>(false);
    const [cart, setCart] = React.useState<CartItem[]>([]);
    const [isBuyMultiItem, setIsBuyMultiItem] = React.useState<boolean>(false);
    const [qrUrl, setQrUrl] = React.useState<string>("");

    const [isLoadingBulkLot, setIsLoadingBulkLot] = React.useState<boolean>(false);
    const [isLoadingInviteLot, setIsLoadingInviteLot] = React.useState<boolean>(false);
    const [bulkCoupon, setBulkCoupon] = React.useState<CouponKind>("none");
    const [inviteCoupon, setInviteCoupon] = React.useState<CouponKind>("none");
    const [couponItemIds, setCouponItemIds] = React.useState<CouponItemIds>();

    const router = useRouter();
    const { Canvas } = useQRCode();

    function addToCart(id: string) {
        const index = cart.findIndex((e) => e.id === id);
        if (index === -1) {
            setCart([...cart, { id: id, quantity: 1 }]);
        } else {
            const newCart = cart.slice();
            newCart[index].quantity++;
            newCart[index].quantity = Math.min(newCart[index].quantity, MAX_CART_ITEM_QUANTITY);
            setCart(newCart);
        }
    }

    React.useEffect(() => {
        const localStorageCart: CartItem[] = JSON.parse(localStorage.getItem("cart-item") || "[]");
        setCart(localStorageCart);
        setIsBuyMultiItem(localStorageCart.length > 1 || localStorageCart[0].quantity > 1);

        const jwt: string = localStorage.getItem("user-id") || "";
        let token: string;
        try {
            token = (jwtDecode(jwt) as any).sub;
        } catch (e) {
            token = "none";
        }
        setQrUrl("https://ncth-app.jp/I3/invite/" + token);
    }, []);

    React.useEffect(() => {
        getMenuItems()
            .then((res) => {
                if (res.hasOwnProperty("message")) {
                    enqueueSnackbar((res as any).message, { variant: "error" });
                    return;
                }
                setMenus(res);
            })
            .catch((err) => {
                enqueueSnackbar(err, { variant: "error" });
            });
    }, []);

    React.useEffect(() => {
        getCouponItemIds()
            .then((res) => {
                if (res.hasOwnProperty("message")) {
                    enqueueSnackbar((res as any).message, { variant: "error" });
                    return;
                }
                setCouponItemIds(res);
            })
            .catch((err) => {
                enqueueSnackbar(err, { variant: "error" });
            });
    }, []);

    function onConfirm() {
        setIsSending(true);
        sendCartData(cart)
            .then((res) => {
                if (res.hasOwnProperty("message")) {
                    enqueueSnackbar((res as any).message, { variant: "error" });
                    return;
                }
                window.location.reload();
                router.push("/I3/order/completed");
            })
            .catch((err) => {
                enqueueSnackbar(err, { variant: "error" });
            })
            .finally(() => {
                setIsSending(false);
            });
    }

    function onDrawBulkLot() {
        setIsLoadingBulkLot(true);
        drawBulkLots()
            .then((res) => {
                if (res.hasOwnProperty("message")) {
                    enqueueSnackbar((res as any).message, { variant: "error" });
                    return;
                }
                const CouponItemID = couponItemIds?.[res.kind] ?? null;
                if (CouponItemID !== null) {
                    addToCart(CouponItemID);
                }
                setBulkCoupon(res.kind);
            })
            .catch((err) => {
                enqueueSnackbar(err, { variant: "error" });
            })
            .finally(() => {
                setIsLoadingBulkLot(false);
            });
    }

    function onDrawInviteLot() {
        setIsLoadingInviteLot(true);
        drawInviteLots()
            .then((res) => {
                if (res.hasOwnProperty("message")) {
                    enqueueSnackbar((res as any).message, { variant: "error" });
                    return;
                }
                const CouponItemID = couponItemIds?.[res.kind] ?? null;
                if (CouponItemID !== null) {
                    addToCart(CouponItemID);
                }
                setInviteCoupon(res.kind);
            })
            .catch((err) => {
                enqueueSnackbar(err, { variant: "error" });
            })
            .finally(() => {
                setIsLoadingInviteLot(false);
            });
    }

    if (menus.length <= 0 || isSending) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

    return (
        <main>
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                }}
            >
                <Bold>注文確認</Bold>
            </Typography>

            {cart.map((e, i) => (
                <CartMenu cart={e} menus={menus} key={i} />
            ))}

            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ margin: "8px" }}>
                <Typography variant="h4">合計</Typography>
                <Typography variant="h3">
                    ¥{cart.reduce((p, c) => p + (menus.find((e) => e.id === c.id)?.price || 0) * c.quantity, 0).toLocaleString()}
                </Typography>
            </Stack>
            <Divider sx={{ marginBottom: "16px" }} />

            <Stack direction="column">
                <Card sx={{ background: "white", marginY: "8px" }}>
                    <CardContent>
                        <Typography variant="body1">2本以上購入で1回抽選！</Typography>

                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            sx={{
                                background: (() => {
                                    const text = {
                                        none: "linear-gradient(38deg, rgba(255,0,254,1) 20%, rgba(165,62,255,1) 48%, rgba(0,116,255,1) 89%) !important;",
                                        "0": "gray !important;",
                                        "100": "#e75d45 !important;",
                                        "200": "#e75d45 !important;",
                                        "300": "#e75d45 !important;",
                                    };

                                    if (isLoadingBulkLot || !isBuyMultiItem) {
                                        return "";
                                    } else {
                                        return text[bulkCoupon];
                                    }
                                })(),

                                marginTop: "8px",
                            }}
                            onClick={onDrawBulkLot}
                            fullWidth
                            disabled={bulkCoupon !== "none" || isLoadingBulkLot || !isBuyMultiItem}
                        >
                            {isLoadingBulkLot ? (
                                <CircularProgress color="inherit" size={25} />
                            ) : (
                                <Typography variant="body1" sx={{ color: "white" }}>
                                    <Bold>
                                        {(() => {
                                            if (!isBuyMultiItem) {
                                                return "2本以上購入で1回抽選！";
                                            }

                                            const text = {
                                                none: "くじを引く",
                                                "0": "はずれ...",
                                                "100": "あたり！100円引き！",
                                                "200": "あたり！200円引き！",
                                                "300": "あたり！300円引き！",
                                            };
                                            return text[bulkCoupon];
                                        })()}
                                    </Bold>
                                </Typography>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                <Card sx={{ background: "white", marginY: "8px" }}>
                    <CardContent>
                        <Typography variant="body1">
                            QRコードを友達のスマホで読み込んでもらってから「くじを引く」を押して1回抽選！
                        </Typography>

                        <Stack direction="column" alignItems="center">
                            <div
                                css={css`
                                    display: ${inviteCoupon === "none" ? "inherit" : "none"};
                                `}
                            >
                                <Canvas
                                    text={qrUrl}
                                    options={{
                                        errorCorrectionLevel: "L",
                                        scale: 4,
                                        width: 200,
                                        color: {
                                            dark: "#000C",
                                            light: "#FFF0",
                                        },
                                    }}
                                />
                            </div>
                        </Stack>
                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            sx={{
                                background: (() => {
                                    const text = {
                                        none: "linear-gradient(38deg, rgba(255,0,254,1) 20%, rgba(165,62,255,1) 48%, rgba(0,116,255,1) 89%) !important;",
                                        "0": "gray !important;",
                                        "100": "#e75d45 !important;",
                                        "200": "#e75d45 !important;",
                                        "300": "#e75d45 !important;",
                                    };

                                    if (isLoadingInviteLot) {
                                        return "";
                                    } else {
                                        return text[inviteCoupon];
                                    }
                                })(),

                                marginTop: "8px",
                            }}
                            onClick={onDrawInviteLot}
                            fullWidth
                            disabled={inviteCoupon !== "none" || isLoadingInviteLot}
                        >
                            {isLoadingInviteLot ? (
                                <CircularProgress color="inherit" size={25} />
                            ) : (
                                <Typography variant="body1" sx={{ color: "white" }}>
                                    <Bold>
                                        {(() => {
                                            const text = {
                                                none: "くじを引く",
                                                "0": "はずれ...",
                                                "100": "あたり！100円引き！",
                                                "200": "あたり！200円引き！",
                                                "300": "あたり！300円引き！",
                                            };
                                            return text[inviteCoupon];
                                        })()}
                                    </Bold>
                                </Typography>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
                <Button variant="contained" color="inherit" href="/I3/order/menus" size="large">
                    戻る
                </Button>
                <Button variant="contained" onClick={onConfirm} size="large">
                    注文を確定する
                </Button>
            </Stack>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
                ※注文を確定すると、変更をスマホ上から行うことはできません。
                <br />
                もしも注文を変更したい場合は、店員にお声がけください。
            </Typography>
        </main>
    );
}
