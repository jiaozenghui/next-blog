import CardList from "@/components/CardList";
import { menuConfs } from "@/constants";

const ArticleList = async ({
  params,
}: {
  params: Promise<{ page: string }>;
}) => {

  const pageParams = (await params).page;
 let ptype = 'all'

 let pIndex= 1;
 if (Array.isArray(pageParams)) {
  ptype = pageParams[0]
  pIndex = pageParams[1]
 } else {
  if (Number.isFinite(+pageParams)) {
    pIndex = Number(pageParams)
  } else {
    ptype = pageParams
  }
 }
 
  return (
    <section className="mt-3 flex w-full flex-col gap-3 ">
      <h1 className="text-xl font-bold  ">{menuConfs[ptype]}</h1>
      <div className=" flex flex-1 flex-col gap-4">
        <CardList type={ptype} page={pIndex} />
      </div>
    </section>
  );
};

export default ArticleList;
