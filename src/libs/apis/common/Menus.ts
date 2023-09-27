"use client";
import { MenuItem } from "@/libs/types/item";

export function getMenuItems(): Promise<MenuItem[]> {
    const mockResponse = [
        {
            id: "1",
            name: "寿司",
            price: 300,
            image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=1941&q=80",
            isShow: true,
        },
        {
            id: "2",
            name: "ピザ",
            price: 500,
            image: "https://images.unsplash.com/photo-1571066811602-716837d681de?w=1844&q=80",
            isShow: true,
        },
        {
            id: "3",
            name: "バーガー",
            price: 1200,
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1965&q=80",
            isShow: true,
        },
        {
            id: "4",
            name: "サラダ",
            price: 200,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=2070&q=80",
            isShow: true,
        },
        {
            id: "5",
            name: "アイスクリーム",
            price: 500,
            image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1974&q=80",
            isShow: true,
        },
        {
            id: "6",
            name: "コンソメ",
            price: 300,
            image: "/img/consomme.png",
            isShow: true,
        },
        {
            id: "7",
            name: "¥100割引",
            price: -100,
            image: "/img/menu_tornado.png",
            isShow: false,
        },
        {
            id: "8",
            name: "¥200割引",
            price: -200,
            image: "/img/menu_tornado.png",
            isShow: false,
        },
        {
            id: "9",
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
