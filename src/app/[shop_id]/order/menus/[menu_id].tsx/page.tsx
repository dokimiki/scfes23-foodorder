"use client";
import Image from "next/image";
// メニュー詳細ページ
import style from "./style.module.css";

function Allergen({
    allergenName,
    imgSrc,
    ContaminationStatus,
}: {
    allergenName: string;
    imgSrc: string;
    ContaminationStatus: "Contains" | "NotContains" | "Contamination";
}) {
    const bgColor = ContaminationStatus === "Contains" ? style.red : ContaminationStatus === "Contamination" ? style.yellow : style.white;
    return (
        <p className={bgColor}>
            <Image src={imgSrc} alt={allergenName} width={50} height={50} />
            <span>{allergenName}</span>
        </p>
    );
}

export default function MenuDetail() {
    return (
        <main className={style.main}>
            <span className={style.tornado}>
                <img src="/img/menu_tornado.png" alt="トルネードポテト" />
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
                    <p className={style.white}>白：ふくまれていない</p>
                    <p className={style.yellow}>黄色：調理工程で触れている</p>
                    <p className={style.red}>赤：含まれている</p>
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
        </main>
    );
}
