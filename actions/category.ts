'use server'

import {
    createCategory,
    getAllCategories,
} from "@/lib/stream-category-service";

export const fetchCategories = async () => {
    try {
        const categories = await getAllCategories()
        return categories.map(category => ({
            ...category,
            id: category.id.toString()
        }))
    } catch (error) {
        throw new Error("Internal Server Error")
    }
}

export const onCreateCategory = (title: string) => {
    try {
        return createCategory(title)
    } catch (error) {
        throw new Error("Internal Server Error")
    }
}