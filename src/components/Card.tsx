import Image from "next/image";
import { Circle } from "lucide-react";
import Link from "next/link";
import { HeaderActions } from "./HeaderActions";
import { articleListItemType } from "@/types/article";
import Like from "./Like";
import Time from "./Time";
const Card = ({ item }: { item: articleListItemType; key: string }) => {
  return (
    <div
      className=" mx-auto mt-3 relative cursor-pointer overflow-hidden w-full
      flex flex-col items-start  rounded-lg border text-left text-sm transition-all hover:bg-accent "
    >
      <Link className="md:flex w-full" href={`/articles/details/${item.id}`}>
        <div className="md:shrink-0">
          <Image
            width={152}
            height={152}
            className="object-cover hidden md:block"
            src={item.coverImg! || "/images/player1.png"}
            alt=""
          />
        </div>
        <div className="p-2 relative w-full">
          <h3 className=" flex text-xl  font-bold justify-between">
            <span>{item.title}</span>
            <HeaderActions articleId={item.id} />
          </h3>
          <p className="mt-2 line-clamp-3 text-muted-foreground  whitespace-break-spaces mb-6">
            {item.desc}
          </p>
        </div>
      </Link>
      <div className="flex space-x-4 absolute bottom-[10px] right-[16px] text-sm justify-end text-muted-foreground">
        <div className="flex items-center">
          <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
          {item.category}
        </div>
        <Like articleId={item.id} likeCount={item.likeCount} />
        <Time time={item.createdAt} />
      </div>
    </div>
  );
};

export default Card;
