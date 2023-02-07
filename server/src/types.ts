export type Restaurant = {
    restaurantName: string;
    address: string;
    city: string;
    foodType: string;
    phone: string;
    meals: Record<string, Meal>;
    tables: Record<string, Table>;
}

export type Table = {
    number: number;
    capacity: number;
    isOccupied: boolean;
}

export type Meal = {
    mealName: string;
    price: number;
    description: string;
}