import {db} from "@/lib/db";

// Get all categories
export const getAllCategories = async () => {
    return await db.category.findMany();
}

// Get category by id
export const getCategoryById = async (id: number) => {
    return db.category.findFirst({
        where: {id: id}
    });
}

// Get category by title
export const getCategoryByTitle = async (title: string) => {
    return db.category.findFirst({
        where: {title: title}
    });
}

// Create a new category
export const createCategory = async (title: string) => {
    return db.category.create({
        data: {title},
    });
}

// Update a category by id
export const updateCategory = async (id: bigint, title: string) => {
    return db.category.update({
        where: {id},
        data: {title},
    });
}

// Delete a category by id
export const deleteCategory = async (id: bigint) => {
    return db.category.delete({
        where: {id},
    });
}

// Add a category to a stream by stream id and category id
export const addCategoryToStream = async (streamId: bigint, categoryId: bigint) => {
    return db.streamCategory.create({
        data: {
            stream_id: streamId,
            category_id: categoryId,
        },
    });
}

// Remove a category from a stream by stream id and category id
export const removeCategoryFromStream = async (streamId: bigint, categoryId: bigint) => {
    return db.streamCategory.delete({
        where: {
            stream_id_category_id: {
                stream_id: streamId,
                category_id: categoryId,
            },
        },
    });
}
