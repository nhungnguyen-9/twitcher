import {
    addCategoryToStream,
    createCategory,
    getAllCategories,
    getCategoryById,
    removeCategoryFromStream
} from "@/lib/stream-category-service";
import { getStreamByUserID } from "@/lib/stream-service";

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

export const onAddCategoryToStream = (streamID: number, categoryID: number) => {
    try {
        const stream = getStreamByUserID(String(streamID))
        if (!stream) {
            throw new Error("Not found stream ID")
        }
        const category = getCategoryById(String(categoryID))
        if (!category) {
            throw new Error("Not found category ID")
        }

        return addCategoryToStream(streamID, categoryID)
    }
    catch {
        throw new Error("Internal Server Error")
    }
}

export const onRemoveCategoryFromStream = (streamID: number, categoryID: number) => {
    try {
        const stream = getStreamByUserID(String(streamID))
        if (!stream) {
            throw new Error("Not found stream ID")
        }
        const category = getCategoryById(String(categoryID))
        if (!category) {
            throw new Error("Not found category ID")
        }

        return removeCategoryFromStream(streamID, categoryID)
    }
    catch {
        throw new Error("Internal Server Error")
    }
}

