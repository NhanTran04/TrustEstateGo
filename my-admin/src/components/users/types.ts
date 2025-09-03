export interface Role {
    id: number;
    name: string;
    description?: string;
}

export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    phone?: string;
    address?: string;
    birthday?: string;
    avatar?: string;
    isActive: boolean;
    roles: Role[];
}
