import { cn } from "@/lib/utils";

interface LiveBadgeProps {
    className?: string
}

export const LiveBadge = ({
    className
}: LiveBadgeProps) => {
    return (
        <div className={cn(
            'bg-rose-500 text-center p-0.5 px-1 rounded-[3px] uppercase text-[10px] font-bold tracking-wide',
            className
        )}>
            live
        </div>
    );
};
