import { articleListItemType } from "@/types/article";
import {Get} from '@axios'
import ArticleView from "@/components/ArticleView";

const ArticleInfo = async({ params }: { params: Promise<{ id: string }> }) => {
  const articleId=  (await params).id
  
  const [e,r] = await Get<articleListItemType>(`/api/articles/${articleId}`)
  
  let data ={} as articleListItemType;
  if (r&&r.errno===0) {
    data = r.data
  }


  return (

    <article className="w-full break-all bg-white pb-5 shadow-sm">
      <h1 className="text-4xl my-3 font-semibold">{data.title}</h1>
      <ArticleView content={data.content}/>
    </article>

    
    )
};

export default ArticleInfo;
