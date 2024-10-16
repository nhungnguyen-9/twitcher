import { create } from "zustand";

export enum ChatVariant {
    CHAT = 'CHAT',
    COMMUNITY = 'COMMUNITY'
}

interface ChatSidebarStore {
    collapsed: boolean,
    variant: ChatVariant,
    onCollapse: () => void,
    onExpand: () => void,
    onChangeVariant: (variant: ChatVariant) => void,
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: ChatVariant.CHAT,
    onCollapse: () => set(() => ({ collapsed: true })),
    onExpand: () => set(() => ({ collapsed: false })),
    onChangeVariant: (variant: ChatVariant) => set(() => ({ variant }))
}))