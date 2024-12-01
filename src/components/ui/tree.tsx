import { TreeOfContents } from "@/types/ui"
import { cn } from "@/lib/utils"

interface TreeProps {
    tree: TreeOfContents
    level?: number
    activeItem?: string
}

export default function Tree({ tree, level = 1, activeItem }: TreeProps) {
    return tree?.items?.length && level < 3 ? (
        <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
            {tree.items.map((item, index) => {
                return (
                    <li key={index} className={cn("mt-0 pt-2")}>
                        <a
                            href={item.url}
                            className={cn(
                                "inline-block no-underline transition-colors hover:text-foreground",
                                item.url === `#${activeItem}`
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.title}
                        </a>
                        {item.items?.length ? (
                            <Tree tree={item} level={level + 1} activeItem={activeItem} />
                        ) : null}
                    </li>
                )
            })}
        </ul>
    ) : null
}