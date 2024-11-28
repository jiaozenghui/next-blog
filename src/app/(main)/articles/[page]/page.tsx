import CardList from "@/components/CardList";

const ArticleList = async({ params }: { params: Promise<{ page: string }> }) => {
    const pageIndex=  Number((await params).page)
  return (
    <div className="mt-3 flex flex-col gap-9 ">
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-bold  ">All Articles</h1>
        <div className=" flex flex-1 flex-col gap-4">
          <CardList  page={pageIndex}/>
        </div>
      </section>
    </div>
  );
};

export default ArticleList;
