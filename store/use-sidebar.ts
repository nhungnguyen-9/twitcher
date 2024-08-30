import { create } from 'zustand'

interface UseSidebarProps {
    collapsed: boolean,
    onExpand: () => void,
    onCollapsed: () => void
}

export const userSidebar = create<UseSidebarProps>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapsed: () => set(() => ({ collapsed: true }))
}))