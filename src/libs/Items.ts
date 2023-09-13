import { MenuItem } from "@/libs/types/item";

export function getMenuItems(): Promise<MenuItem[]> {
    const mockResponse = new Response(
        JSON.stringify([
            {
                id: "1",
                name: "Sushi",
                price: 300,
                image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=1941&q=80",
            },
            {
                id: "2",
                name: "Pizza",
                price: 500,
                image: "https://images.unsplash.com/photo-1571066811602-716837d681de?w=1844&q=80",
            },
            {
                id: "3",
                name: "Burger",
                price: 1200,
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1965&q=80",
            },
        ])
    );
    return mockResponse.json();
}
