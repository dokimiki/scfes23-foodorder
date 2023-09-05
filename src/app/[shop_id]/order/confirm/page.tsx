"use client";
import * as React from "react";
import { css } from "@emotion/react";
import style from "./style.module.scss";
// 注文確認ページ

function Food({
    foodName,
    foodNum,
    foodPrice,
}: {
    foodName: string;
    foodNum: number;
    foodPrice: number;
}) {
    return (
        <p className={style.food}>
            <div>
                <span>{foodName}</span>
                <span>×</span>
                <span>{foodNum}</span>
            </div>
            <div className={style.price}>
                <span>¥</span>
                <span>{foodPrice}</span>
            </div>
        </p>
    );
}

export default function Confirm() {
    const foodName = ["トルネードポテト(塩)", "トルネードポテト(コンソメ)"];
    const foodNum = [3, 2];
    const foodPrice = [300, 300];
    return (
        <main className={style.main}>
            <h1>注文内容の最終確認</h1>
            {foodName.map((name, i) => {
                return (
                    <Food
                        foodName={name}
                        foodNum={foodNum[i]}
                        foodPrice={foodPrice[i]}
                    />
                );
            })}

            <p className={style.total_price}>
                <span>合計金額</span>
                <div>
                    <span>¥</span>
                    <span>
                        {foodPrice.reduce((sum, price) => {
                            return sum + price;
                        }, 0)}
                    </span>
                </div>
            </p>
        </main>
    );
}
