interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    totalPurchases: number;
    activeBuffs: number;
    userType: {
        id: string;
        typeName: string;
    };
}