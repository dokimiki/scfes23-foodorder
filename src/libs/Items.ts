import { MenuItem } from "@/libs/types/item";

export function getMenuItems(): Promise<MenuItem[]> {
    const mockResponse = new Response(
        JSON.stringify([
            {
                id: "1",
                name: "寿司",
                price: 300,
                image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=1941&q=80",
            },
            {
                id: "2",
                name: "ピザ",
                price: 500,
                image: "https://images.unsplash.com/photo-1571066811602-716837d681de?w=1844&q=80",
            },
            {
                id: "3",
                name: "バーガー",
                price: 1200,
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1965&q=80",
            },
            {
                id: "4",
                name: "サラダ",
                price: 200,
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=2070&q=80",
            },
            {
                id: "5",
                name: "アイスクリーム",
                price: 500,
                image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=1974&q=80",
            },
        ])
    );
    return mockResponse.json();
}
