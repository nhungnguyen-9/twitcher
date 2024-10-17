import {
    createCategory,
    getAllCategories,
} from "@/lib/stream-category-service";

export const fetchCategories = () => {
    try {
        return getAllCategories()
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