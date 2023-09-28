"use client";
import { MenuItem } from "@/libs/types/item";

export function getMenuItems(): Promise<MenuItem[]> {
    const mockResponse = [
        {
            id: "1",
            name: "塩",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "2",
            name: "コンソメ",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "3",
            name: "醤油バター",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "4",
            name: "チーズ",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "5",
            name: "のりしお",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "6",
            name: "ガーリック",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "7",
            name: "バーベキュー",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "8",
            name: "めんたいマヨ",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "9",
            name: "カレー",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "10",
            name: "塩レモン",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "11",
            name: "たこ焼き",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "12",
            name: "ハニーバター",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "13",
            name: "コーンポタージュ",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "14",
            name: "ブラックペッパー",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "15",
            name: "梅かつお",
            price: 300,
            image: "",
            isShow: true,
        },
        {
            id: "16",
            name: "¥100割引",
            price: -100,
            image: "/img/menu_tornado.png",
            isShow: false,
        },
        {
            id: "17",
            name: "¥200割引",
            price: -200,
            image: "/img/menu_tornado.png",
            isShow: false,
        },
        {
            id: "18",
            name: "¥300割引",
            price: -300,
            image: "/img/menu_tornado.png",
            isShow: false,
        },
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}
