import CardList from "@/components/CardList";
import { menuConfs, pTypes } from "@/constants";

const ArticleList = async ({
  params,
}: {
  params: Promise<{ page: string }>;
}) => {
  const pageParams = (await params).page;
  let ptype: pTypes = 'all'

  let pIndex = 1;
  let query = ''
  let tags = ''
  const paralen = pageParams.length
  if (paralen > 1) {
    ptype = pageParams[0] as pTypes
    const lastParam = pageParams[pageParams.length - 1]
    pIndex = Number.isFinite(lastParam) ? Number(lastParam) : 1
    if (ptype === 'technology') {
      tags = Number.isFinite(lastParam) ? '' : lastParam
    }
  } else {
    if (Number.isFinite(+pageParams[0])) {
      pIndex = Number(pageParams[0])
    } else {
      ptype = pageParams[0] as pTypes
    }
  }

  if (ptype === 'search') {
    query = pageParams[1]
  }

  console.log(ptype, pageParams, pIndex)


  return (
    <section className="mt-3 flex w-full flex-col gap-3 ">
      <h1 className="text-xl font-bold  ">{menuConfs[ptype]}{query ? `/${query}` : ''}</h1>
      <div className=" flex flex-1 flex-col gap-4">
        <CardList query={query} type={ptype} page={pIndex} tags={tags} />
      </div>
    </section>
  );
};

export default ArticleList;
