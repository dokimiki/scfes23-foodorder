"use client";
import * as React from "react";
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
    const foodTotalPrice = foodNum * foodPrice;
    return (
        <div className={style.food}>
            <p>
                <span>{foodName}</span>
                <span>×</span>
                <span>{foodNum}</span>
            </p>
            <p className={style.price}>
                <span>
                    ¥{foodPrice} × {foodNum} = ¥{foodTotalPrice}
                </span>
            </p>
        </div>
    );
}

export default function Confirm() {
    const foodName = [
        "トルネードポテト(塩)",
        "かば焼きくん",
        "トルネードポテト(コンソメ)",
    ];
    const foodNum = [3, 0, 2]; //商品の数量
    const foodPrice = [300, 10, 300]; //商品の値段
    const sum = foodPrice.map((price, i) => {
        //各商品の合計を配列に格納
        return price * foodNum[i];
    });
    return (
        <main className={style.main}>
            <h1>注文内容の最終確認</h1>
            {foodName.map((name, i) => {
                if (foodNum[i] === 0) {
                    return null;
                } else {
                    return (
                        <Food
                            foodName={name}
                            foodNum={foodNum[i]}
                            foodPrice={foodPrice[i]}
                        />
                    );
                }
            })}

            <div className={style.total_price}>
                <span>合計金額</span>
                <p>
                    <span>¥</span>
                    <span>
                        {sum.reduce((sum, price) => {
                            return sum + price;
                        }, 0)}
                    </span>
                </p>
            </div>
        </main>
    );
}
