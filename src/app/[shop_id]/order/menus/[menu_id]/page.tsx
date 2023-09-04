"use client";
import * as React from "react";
import { css } from "@emotion/react";
import Image from "next/image";

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// メニュー詳細ページ
import style from "./style.module.css";

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
        <p
            css={css`
                background-color: ${bgColor};
            `}
        >
            <Image src={imgSrc} alt={allergenName} width={50} height={50} />
            <span>{allergenName}</span>
        </p>
    );
}

export default function MenuDetail() {
    return (
        <main className={style.main}>
            <span className={style.tornado}>
                <Image src="/img/menu_tornado.png" alt="トルネードポテト" width={300} height={300} />
            </span>
            <div className={style.position}>
                <h1>トルネードポテト（塩）</h1>
                <p>
                    おいしいポテトです!!トルネードになったところを 見たことがあります。あなたはどうですか？塩味の利い
                    たトルネードポテト、ポテトですね。ぱりぱりうまう まですよ。あなたもおひとついかがですか？みたこと
                    がないようなきがするような新しい新感覚ぽてと
                </p>
                <div className={style.allergy}>
                    <h2>アレルゲン</h2>
                    <p
                        css={css`
                            background-color: ${allergenColor["NotContains"]};
                        `}
                    >
                        白：ふくまれていない
                    </p>
                    <p
                        css={css`
                            background-color: ${allergenColor["Contamination"]};
                        `}
                    >
                        黄色：調理工程で触れている
                    </p>
                    <p
                        css={css`
                            background-color: ${allergenColor["Contains"]};
                        `}
                    >
                        赤：含まれている
                    </p>
                </div>
                <div className={style.container}>
                    <Allergen allergenName="えび" imgSrc="/img/allergen_ebi.png" ContaminationStatus="Contains" />
                    <Allergen allergenName="かに" imgSrc="/img/allergen_kani.png" ContaminationStatus="NotContains" />
                    <Allergen allergenName="小麦" imgSrc="/img/allergen_komugi.png" ContaminationStatus="Contamination" />
                    <Allergen allergenName="そば" imgSrc="/img/allergen_soba.png" ContaminationStatus="NotContains" />
                    <Allergen allergenName="卵" imgSrc="/img/allergen_tamago.png" ContaminationStatus="Contains" />
                    <Allergen allergenName="ミルク" imgSrc="/img/allergen_milk.png" ContaminationStatus="NotContains" />
                    <Allergen allergenName="落花生" imgSrc="/img/allergen_peanuts.png" ContaminationStatus="NotContains" />
                    <Allergen allergenName="クルミ" imgSrc="/img/allergen_kurumi.png" ContaminationStatus="NotContains" />
                </div>
            </div>

            <div className={style.footer_position}>
                <div className={style.footer_container}>
                    <div className={style.price}>
                            <p>¥</p>
                            <h2>490</h2>
                    </div>
                        <div className={style.count}>
                                <Stack>
                                    <span>
                                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                        <Fab color="primary" aria-label="add">
                                            <p>＋</p>
                                            </Fab>
                                        </Box>                          
                                        <h2>0</h2>   
                                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                        <Fab color="primary" aria-label="add">
                                            <p>ー</p>
                                            </Fab>
                                        </Box>
                                    </span>
                                </Stack>
                        </div>
                </div>

                <div className={style.button}>
                    <Stack><span><Button variant="outlined"><p>注文を確定する</p></Button></span></Stack>
                    <Stack><span><Button variant="outlined"><p>カゴへ追加する</p></Button></span></Stack>
                </div>
            </div>
        </main>
    );
}
