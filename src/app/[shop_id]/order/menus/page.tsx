"use client";
// メニュー一覧ページ
import React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import style from "./style.module.css";

import Stack from '@mui/material/Stack';

import Link from "next/link";//仮置き



export default function Menus() {
    return (
        <main>
            <Link href="/I3/order/menus/[menu_id].tsx">メニュー詳細（仮置き）</Link>
            <h1>メニュー一覧</h1>
            <p>hello react</p>

            <div className={style.position}>
                <div className={style.display}>
                    <div className={style.display}>
                        <p className={style.price}>¥</p>
                        <h2 className={style.price}>490</h2>
                    </div>
                    <div className={style.display}>
                        <Stack >
                         <Button className={style.quant_button}>－</Button>
                        </Stack>    
                        <a className={style.quant_button}>－</a>
                        <p className={style.quant_p}>0</p>
                    <a className={style.quant_button}>＋</a>
                    </div>
                </div>
                <div className={style.display}>
                    <a className={style.button}>注文を確定する</a>
                    <a className={style.button}>カゴへ追加する</a>
                </div>
            </div>
        </main>
    );
}
