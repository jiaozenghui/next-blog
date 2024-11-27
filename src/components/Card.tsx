import Image from "next/image";
import { HeaderActions } from "./HeaderActions";
import { Circle, Star } from "lucide-react";
import Link from "next/link";
const Card = ({ item }: { item: any; key: string }) => {
  return (
    <div
      className=" mx-auto  cursor-pointer overflow-hidden
      flex flex-col items-start  rounded-lg border text-left text-sm transition-all hover:bg-accent "
    >
      <Link href={`/articles/details/${item.id}`} >
        <div className="md:flex">
          <div className="md:shrink-0">
            <Image
              width={152}
              height={152}
              className="object-cover hidden md:block"
              src={item.coverImg! || "/images/player1.png"}
              alt=""
            />
          </div>
          <div className="p-2 relative">
            <h3 className=" flex text-xl  font-bold justify-between">
              <span>Company retreats</span>
              <HeaderActions />
            </h3>
            <p className="mt-2 line-clamp-3 text-muted-foreground  whitespace-break-spaces mb-4">
              Looking to take your team away on a retreat to enjoy awesome food
              and take in some sunshine? We have a list of places to do just
              that.
            </p>
            <div className="flex space-x-4 absolute bottom-[10px] right-[16px] text-sm justify-end text-muted-foreground">
              <div className="flex items-center">
                <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                TypeScript
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-3 w-3" />
                20k
              </div>
              <div>Updated April 2023</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
