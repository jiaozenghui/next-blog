
'use client'

import { formatDate } from "@/lib/utils";

export default function Like({ time }: {time:string}) {

   const fromatTime = formatDate(time)

  return (
    <div className="flex items-center">
        {fromatTime}
    </div>
  )
}