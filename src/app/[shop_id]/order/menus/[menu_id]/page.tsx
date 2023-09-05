"use client";
import * as React from "react";
import { css } from "@emotion/react";
import Image from "next/image";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import gray from "@mui/material/colors/grey";

const allergenColor = { Contains: "#ff6347", Contamination: "#ffd700", NotContains: "white" };

function Allergen({
    allergenName,
    imgSrc,
    ContaminationStatus,
}: {
    allergenName: string;
    imgSrc: string;
    ContaminationStatus: "Contains" | "NotContains" | "Contamination";
}) {
    const bgColor = allergenColor[ContaminationStatus];
    return (
        <Stack direction="row" alignItems="center" sx={{ background: bgColor, borderRadius: 2, padding: "2px", minWidth: "130px", margin: 1 }} spacing={1}>
            <Image src={imgSrc} alt={allergenName} width={50} height={50} />
            <Typography variant="h6">{allergenName}</Typography>
        </Stack>
    );
}

export default function MenuDetail() {
    return (
        <main
            css={css`
                margin-bottom: calc(128px + 2em);
            `}
        >
            <Image
                src="/img/menu_tornado.png"
                alt="トルネードポテト"
                width={352}
                height={400}
                css={css`
                    width: 100%;
                    height: 30vmax;
                    background-color: white;
                    object-fit: cover;
                    object-position: 10% 0%;
                `}
            />
            <div
                css={css`
                    padding: 20px;
                `}
            >
                <div>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        トルネードポテト（塩）
                    </Typography>
                    <Typography variant="body1">
                        おいしいポテトです!!トルネードになったところを 見たことがあります。あなたはどうですか？塩味の利い
                        たトルネードポテト、ポテトですね。ぱりぱりうまう まですよ。あなたもおひとついかがですか？みたこと
                        がないようなきがするような新しい新感覚ぽてと
                    </Typography>
                    <Typography variant="h5">アレルゲン</Typography>
                    <Stack
                        spacing={1}
                        sx={{ margin: 2 }}
                        css={css`
                            > * {
                                border-radius: 4px;
                                padding: 0 0.5em;
                            }
                        `}
                    >
                        <Typography variant="h6" sx={{ background: allergenColor["NotContains"] }}>
                            白：ふくまれていない
                        </Typography>
                        <Typography variant="h6" sx={{ background: allergenColor["Contamination"] }}>
                            黄色：調理工程で触れている
                        </Typography>
                        <Typography variant="h6" sx={{ background: allergenColor["Contains"] }}>
                            赤：含まれている
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ margin: 2 }} flexWrap="wrap" justifyContent="space-around">
                        <Allergen allergenName="えび" imgSrc="/img/allergen_ebi.png" ContaminationStatus="Contains" />
                        <Allergen allergenName="かに" imgSrc="/img/allergen_kani.png" ContaminationStatus="NotContains" />
                        <Allergen allergenName="小麦" imgSrc="/img/allergen_komugi.png" ContaminationStatus="Contamination" />
                        <Allergen allergenName="そば" imgSrc="/img/allergen_soba.png" ContaminationStatus="NotContains" />
                        <Allergen allergenName="卵" imgSrc="/img/allergen_tamago.png" ContaminationStatus="Contains" />
                        <Allergen allergenName="ミルク" imgSrc="/img/allergen_milk.png" ContaminationStatus="NotContains" />
                        <Allergen allergenName="落花生" imgSrc="/img/allergen_peanuts.png" ContaminationStatus="NotContains" />
                        <Allergen allergenName="クルミ" imgSrc="/img/allergen_kurumi.png" ContaminationStatus="NotContains" />
                    </Stack>
                </div>
            </div>
            <div
                css={css`
                    width: 100%;
                    position: fixed;
                    bottom: 0;
                    background-color: white;
                `}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: 2 }}>
                    <Stack direction="row" alignItems="baseline">
                        <Typography variant="h5">金額: </Typography>
                        <Typography variant="h6" sx={{ color: "text.secondary" }}>
                            ￥
                        </Typography>
                        <Typography variant="h4">300</Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            background: gray[100],
                            borderRadius: 10,
                        }}
                    >
                        <IconButton aria-label="remove">
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="h5">1</Typography>
                        <IconButton aria-label="add" color="primary">
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Stack>

                <Stack direction="row" justifyContent="space-around" sx={{ margin: 2 }}>
                    <Button variant="outlined" sx={{ color: "black" }}>
                        注文を確定する
                    </Button>
                    <Button variant="contained">カゴへ追加する</Button>
                </Stack>
            </div>
        </main>
    );
}
