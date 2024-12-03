
"use client"

import { useMemo, useEffect, useState } from "react"
import { TreeOfContents } from "@/types/ui"
import Tree from "./ui/tree"

interface TocProps {
    toc: TreeOfContents
}

const items = [
    {
        title: "Getting Started",
        url: "#",
        items: [
            {
                title: "Installation",
                url: "#install",
            },
            {
                title: "Project Structure",
                url: "#project_structure",
            },
        ],
    },
    {
        title: "Building Your Application",
        url: "#build_your_application",
        items: [
            {
                title: "Routing",
                url: "#routing",
            },
            {
                title: "Data Fetching",
                url: "#data_fetching",
                isActive: true,
            },
            {
                title: "Rendering",
                url: "#render",
            }
        ],
    },
    {
        title: "Architecture",
        url: "#architectrue",
        items: [
            {
                title: "Accessibility",
                url: "#Accessibility",
            },
            {
                title: "Fast Refresh",
                url: "#fast_refresh",
            },
            {
                title: "Next.js Compiler",
                url: "#nextjs_compile",
            },
            {
                title: "Supported Browsers",
                url: "#soupport",
            }
        ],
    },
]

const treeData: TreeOfContents = {
    items: items
}

export function AnchorBar() {
    const itemIds = useMemo(
        () =>
            treeData.items
                ? treeData.items
                    .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
                    .flat()
                    .filter(Boolean)
                    .map((id) => id?.split("#")[1])
                : [],
        []
    )
    const activeHeading = useActiveItem(itemIds as string[])


    if (!treeData?.items?.length) {
        return null
    }

    return (
        <div className="hidden text-sm lg:block   pl-[10px]">
            <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] lg:w-[180px] pt-4 overflow-y-auto no-scrollbar">
                <Tree tree={treeData} activeItem={activeHeading} />
            </div>

        </div>
    )
}

function useActiveItem(itemIds: string[]) {
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: `0% 0% -80% 0%` }
        )

        itemIds?.forEach((id) => {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => {
            itemIds?.forEach((id) => {
                const element = document.getElementById(id)
                if (element) {
                    observer.unobserve(element)
                }
            })
        }
    }, [itemIds])

    return activeId
}