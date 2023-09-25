/** @jsxImportSource @emotion/react */
import * as React from "react";
import Stepper from "@/components/Stepper";
import { CartItem, MenuItem } from "@/libs/types/item";
import { Global, css } from "@emotion/react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

export default function OrderDrawerContent({
    menus,
    cart,
    addToCart,
    removeFromCart,
    onOrder,
    drawerBleeding,
}: {
    menus: MenuItem[];
    cart: CartItem[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
    onOrder: () => void;
    drawerBleeding: number;
}) {
    let total = cart.reduce((amount, e) => {
        return amount + (menus.find((menu) => menu.id === e.id)?.price ?? 0) * e.quantity;
    }, 0);
    return (
        <>
            <Box
                sx={{
                    background: "#fff",
                    position: "absolute",
                    top: -drawerBleeding,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: "visible",
                    right: 0,
                    left: 0,
                }}
            >
                <Puller />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="baseline" sx={{ marginLeft: 2 }}>
                        <Badge
                            badgeContent={cart.reduce((quantity, e) => {
                                return quantity + e.quantity;
                            }, 0)}
                            color="error"
                            sx={{ marginRight: 2 }}
                        >
                            <ShoppingCartIcon sx={{ marginBottom: "0.2em" }} />
                        </Badge>
                        <Typography variant="h6" sx={{ color: "text.secondary" }}>
                            ￥
                        </Typography>
                        <Typography variant="h4">{total.toLocaleString()}</Typography>
                    </Stack>
                    <Button variant="contained" sx={{ margin: 2, pointerEvents: "all" }} onClick={onOrder} disabled={cart.length <= 0}>
                        {cart.length <= 0 ? "カートが空です" : "注文する"}
                    </Button>
                </Stack>
            </Box>
            <Box
                sx={{
                    px: 2,
                    pb: 2,
                    height: "100%",
                    overflow: "auto",
                    background: "#fff",
                }}
            >
                <CartItemTable menus={menus} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} total={total} />
            </Box>
        </>
    );
}

function CartItemTable({
    menus,
    cart,
    addToCart,
    removeFromCart,
    total,
}: {
    menus: MenuItem[];
    cart: CartItem[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
    total: number;
}) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ minWidth: "30vw" }}>
                            商品
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "100px" }}>
                            個数
                        </TableCell>
                        <TableCell align="right" sx={{ minWidth: "6rem" }}>
                            金額
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Global
                        styles={{
                            ".cart-item-table-row-hidden": {
                                transitionDelay: "2s",
                                transitionProperty: "display",
                                display: "none !important",
                            },
                        }}
                    />
                    {React.useMemo(
                        () =>
                            menus.map((e, i) => {
                                const cartData = cart.find((cartItem) => cartItem.id === e.id);
                                return (
                                    <TableRow key={i} className={(cartData?.quantity ?? 0) > 0 ? "" : " cart-item-table-row-hidden"}>
                                        <TableCell align="center">{e.name}</TableCell>
                                        <TableCell align="center">
                                            <span
                                                css={css`
                                                    margin: 0 auto;
                                                    display: inline-table;
                                                `}
                                            >
                                                <Stepper
                                                    num={cartData?.quantity ?? 0}
                                                    size="small"
                                                    onClickAdd={() => addToCart(e.id)}
                                                    onClickRemove={() => removeFromCart(e.id)}
                                                />
                                            </span>
                                        </TableCell>
                                        <TableCell align="right">¥&nbsp;{(e.price * (cartData?.quantity ?? 0)).toLocaleString()}</TableCell>
                                    </TableRow>
                                );
                            }),
                        [menus, cart, addToCart, removeFromCart]
                    )}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell align="right">
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                カート合計:
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                ¥&nbsp;{total.toLocaleString()}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
