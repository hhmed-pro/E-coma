import { Megaphone, Search, ShoppingBag, TrendingUp, Users } from "lucide-react";

export interface Team {
    id: string;
    name: string;
    icon: any;
    color: string;
    badge?: number;
}

export const TEAMS: Team[] = [
    {
        id: "sales",
        name: "Sales Team",
        icon: ShoppingBag,
        color: "text-green-500",
        badge: 3
    },
    {
        id: "marketing",
        name: "Marketing Team",
        icon: TrendingUp,
        color: "text-purple-500",
        badge: 5
    },
    {
        id: "ads",
        name: "Ads Team",
        icon: Megaphone,
        color: "text-pink-500",
        badge: 2
    },
    {
        id: "research",
        name: "Research Team",
        icon: Search,
        color: "text-blue-500"
    }
];
