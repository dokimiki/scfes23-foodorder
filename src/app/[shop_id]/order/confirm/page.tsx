"use client";
import * as React from "react";
import { css } from "@emotion/react";
import style from "./style.module.scss";
// 注文確認ページ

function Food({}) {
    const foodName = { 1: "トルネードポテト(塩)", 2: "トルネードポテト(コンソメ)" };
    const foodNum = { 1: 3, 2: 2 };
    const foodPrice = { 1: 300, 2: 300 };
    return (
        <p className={style.food}>
            <div>
                <span>{foodName[1]}</span>
                <span>×</span>
                <span>{foodNum[1]}</span>
            </div>
            <div className={style.price}>
                <span>¥</span>
                <span>{foodPrice[1]}</span>
            </div>
        </p>
    );
}

export default function Confirm() {
    return (
        <main className={style.main}>
            <h1>注文内容の最終確認</h1>
            <p className={style.food}>
                <div>
                    <span>トルネードポテト(塩)</span>
                    <span>×</span>
                    <span>3</span>
                </div>
                <div className={style.price}>
                    <span>¥</span>
                    <span>900</span>
                </div>
            </p>
            <p className={style.total_price}>
                <span>合計金額</span>
                <div>
                    <span>¥</span>
                    <span>900</span>
                </div>
            </p>
        </main>
    );
}
