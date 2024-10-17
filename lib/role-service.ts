import { db } from "@/lib/db";

export const getRoleByID = async (id: string) => {
    const role = await db.role.findUnique({
        where: { id: Number(id) }
    })
    if (!role) {
        throw new Error("Not found")
    }

    return role
}

export const getRoleByName = async (name: string) => {
    const role = await db.role.findUnique({
        where: { name: name }
    })

    if (!role) {
        throw new Error("Not found")
    }

    return role
}


// Add role
export const addRole = async (name: string) => {
    return db.role.create({
        data: {
            name: name
        }
    });
}

// Remove role
export const removeRole = async (id: string) => {
    const role = db.role.delete({
        where: { id: Number(id) }
    })
    if (!role) {
        throw new Error("not found")
    }

    return role
}