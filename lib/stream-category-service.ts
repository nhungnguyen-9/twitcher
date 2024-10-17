import { db } from "@/lib/db";

// Get all categories
export const getAllCategories = async () => {
    return db.category.findMany();
}

// Get category by id
export const getCategoryById = async (id: string) => {
    return db.category.findFirst({
        where: { id: Number(id) }
    });
}

// Get category by title
export const getCategoryByTitle = async (title: string) => {
    return db.category.findFirst({
        where: { title: title }
    });
}

// Create a new category
export const createCategory = async (title: string) => {
    return db.category.create({
        data: { title },
    });
}

// Update a category by id
export const updateCategory = async (id: string, title: string) => {
    return db.category.update({
        where: { id: Number(id) },
        data: { title },
    });
}

// Delete a category by id
export const deleteCategory = async (id: string) => {
    return db.category.delete({
        where: { id: Number(id) },
    });
}
