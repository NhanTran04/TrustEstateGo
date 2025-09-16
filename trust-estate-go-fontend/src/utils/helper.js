export const hasRole = (user, roleName) => {
    return user?.roles?.some(r => r.name === roleName);
};