"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react"
import Link from "next/link";
import {
  Card
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react";

interface CardProps extends React.ComponentProps<typeof Card> {
  articleId: number
  userId: string
};

export function HeaderActions({ articleId, userId }: CardProps) {

  const { status, data: session } = useSession();
  const Delete = async () => {
    console.log('delete')
  }
  return (
    <>
      {status === "authenticated" && session?.user?._id === userId ? (
        <>
          <div className="flex items-center space-x-1 rounded-md ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-4" >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span onClick={() => Delete()}>
                    Delete
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="block w-full" href={`/articles/editor/${articleId}`} >
                    Edit
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <></>
      )}

    </>
  );
}
