export const rbac = () => {

};

export const authenticate = () => {

}

export function generateAPIKey(user: { _id: any }): string {

    const secret_key = process.env.SECRET_KEY? (process.env.SECRET_KEY as string).toLowerCase(): "local";

    if (!user._id) return "";

    return `${secret_key}-${String(user._id)}`;
}