"use client";
import { useSearchParams } from "next/navigation";
import CardList from "./CardList";

export default function SearchCard() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  return (
    <section className="mt-3 flex w-full flex-col gap-3 ">
      <h1 className="text-xl font-bold  "></h1>
      <div className=" flex flex-1 flex-col gap-4">
        <CardList query={search} />
      </div>
    </section>
  );
}
