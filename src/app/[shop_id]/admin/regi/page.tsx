"use client";
import * as React from "react";
import { css } from "@emotion/react";
import { Badge, Button, Card, CardMedia, Paper, Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stepper from "@/components/Stepper";
import { enqueueSnackbar } from "notistack";
// レジのページ

export default function Regi() {
    type item = {
        id: number;
        number: number;
    };

    const [itemSelects, setItemSelects] = React.useState([
        { id: 1, number: 1 },
        { id: 2, number: 1 },
        { id: 3, number: 1 },
        { id: 4, number: 0 },
        { id: 5, number: 0 },
        { id: 6, number: 0 },
        { id: 7, number: 0 },
        { id: 8, number: 0 },
        { id: 9, number: 0 },
        { id: 10, number: 0 },
    ] as item[]);

    function addItem(itemIndex: number) {
        let newItemSelects = itemSelects.slice();

        newItemSelects[itemIndex].number++;

        if (newItemSelects[itemIndex].number > 5) {
            enqueueSnackbar("これ以上増やせません", { variant: "error" });
            newItemSelects[itemIndex].number = 5;
        }

        setItemSelects(newItemSelects);
    }

    function removeItem(itemIndex: number) {
        let newItemSelects = itemSelects.slice();

        newItemSelects[itemIndex].number--;

        if (newItemSelects[itemIndex].number < 0) {
            enqueueSnackbar("これ以上減らせません。", { variant: "error" });
            newItemSelects[itemIndex].number = 0;
        }

        setItemSelects(newItemSelects);
    }

    function deleteItem(itemIndex: number) {
        let newItemSelects = itemSelects.slice();

        newItemSelects[itemIndex].number = 0;
        setItemSelects(newItemSelects);

        enqueueSnackbar("会計からアイテムを削除しました。", { variant: "info" });
    }

    function ItemPaper({
        img,
        title,
        price,
        num,
        itemIndex,
    }: {
        img: string;
        title: string;
        price: number;
        num: number;
        itemIndex: number;
    }) {
        return (
            <Button onClick={() => addItem(itemIndex)} sx={{ margin: 2, padding: 0 }}>
                <Badge
                    badgeContent={num}
                    color="primary"
                    css={css`
                        & > .MuiBadge-badge {
                            width: 30px;
                            height: 30px;
                            border-radius: 15px;
                            font-size: 17px;
                            font-weight: 400;
                        }
                    `}
                >
                    <Card sx={{ width: 200 }}>
                        <CardMedia sx={{ height: 160 }} image={img} />
                        <Stack sx={{ padding: "16px" }}>
                            <Typography gutterBottom variant="body2" fontWeight="500" align="left">
                                {title}
                            </Typography>
                            <Stack direction="row" alignItems="baseline">
                                <Typography variant="body2" fontWeight="400">
                                    売価:&nbsp;
                                </Typography>
                                <Typography variant="h6" fontWeight="500">
                                    ¥{price}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Card>
                </Badge>
            </Button>
        );
    }

    const sideBarWidth = 350;

    return (
        <main>
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", height: "100vh" }}>
                <Stack
                    sx={{ margin: 2, width: `calc(100% - ${sideBarWidth}px)` }}
                    direction="row"
                    flexWrap="wrap"
                    alignContent="flex-start"
                    justifyContent="flex-start"
                >
                    {itemSelects.map((e, i) => {
                        return (
                            <ItemPaper
                                img={"https://images.unsplash.com/photo-1552845683-cfefc701e423?w=1887&q=80"}
                                title={"トルネードポテト(塩)" + e.id}
                                price={120}
                                num={e.number}
                                itemIndex={i}
                                key={i}
                            />
                        );
                    })}
                </Stack>
                <Stack
                    sx={{
                        position: "fixed",
                        right: 0,
                        height: "100%",
                        overflowY: "scroll",
                        background: (theme) => {
                            return theme.palette.primary.main;
                        },
                        padding: 2,
                        width: `${sideBarWidth}px`,
                    }}
                >
                    <div>
                        {itemSelects.map((e, i) => {
                            const title = "トルネードポテト(塩)" + e.id;
                            const price = 120;
                            return (
                                <Paper
                                    key={i}
                                    sx={{
                                        transition:
                                            "max-height 2s cubic-bezier(0.2, 0.3, 0.8, 0.7)" +
                                            ", margin-bottom 0.2s ease-out" +
                                            (e.number > 0 ? "" : " 2.2s"),
                                        overflow: "hidden",
                                        height: "auto",
                                        maxHeight: e.number > 0 ? "100vh" : "0px",
                                        marginBottom: e.number > 0 ? 2 : 0,
                                    }}
                                >
                                    <Typography variant="h6">{title}</Typography>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: 1 }}>
                                        <Stack direction="row" alignItems="flex-end">
                                            <Typography variant="subtitle1">合計:&nbsp;</Typography>
                                            <Typography variant="h5">¥{price * e.number}</Typography>
                                        </Stack>
                                        <Stack direction="row">
                                            <IconButton aria-label="delete" onClick={() => deleteItem(i)}>
                                                <DeleteIcon fontSize="small" color="error" />
                                            </IconButton>
                                            <Stepper
                                                num={e.number}
                                                onClickAdd={() => addItem(i)}
                                                onClickRemove={() => removeItem(i)}
                                                size="small"
                                            />
                                        </Stack>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </div>
                </Stack>
            </Stack>
        </main>
    );
}
