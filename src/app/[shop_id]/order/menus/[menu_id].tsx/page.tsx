"use client";
// メニュー詳細ページ
import style from "./style.module.css";

export default function MenuDetail() {
    return (
        <main className={style.main}>
            <span className={style.tornado}><img src="/img/menu_tornado.png" alt="トルネードポテト" /></span>
            <div className={style.position}>
                <h1>トルネードポテト（塩）</h1>
                <p>おいしいポテトです!!トルネードになったところを
                    見たことがあります。あなたはどうですか？塩味の利い
                    たトルネードポテト、ポテトですね。ぱりぱりうまう
                    まですよ。あなたもおひとついかがですか？みたこと
                    がないようなきがするような新しい新感覚ぽてと
                </p>
                <div className={style.allergy}>
                    <h2>アレルゲン</h2>
                    <p className={style.white}>白：ふくまれていない</p>
                    <p className={style.yellow}>黄色：調理工程で触れている</p>
                    <p className={style.red}>赤：含まれている</p>     
                </div>
                <div className={style.container}>
                    <p className={style.white}>
                        <img src="/img/allergen_kani.png" alt="カニ" />
                        <span>カニ</span>
                    </p>
                    <p className={style.white}>
                        <img src="/img/allergen_milk.png" alt="牛乳" />
                        <span>牛乳</span>
                    </p>
                    <p className={style.white}>
                        <img src="/img/allergen_kurumi.png" alt="クルミ" />
                        <span>クルミ</span>
                    </p>
                    <p className={style.red}>
                        <img src="/img/allergen_komugi.png" alt="小麦" />
                        <span>小麦</span>
                    </p>
                    <p className={style.yellow}>
                        <img src="/img/allergen_peanut.png" alt="ピーナッツ" />
                        <span>ピーナッツ</span>
                    </p>
                    <p className={style.white}> 
                        <img src="/img/allergen_tamago.png" alt="たまご" />
                        <span>たまご</span>
                    </p>
                </div>

            </div>

        </main>
    );
}
