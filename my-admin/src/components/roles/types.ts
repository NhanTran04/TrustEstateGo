export interface Permission {
    name: string;
    description: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: Permission[];
}