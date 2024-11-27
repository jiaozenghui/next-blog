import { articleListItemType } from "@/types/article";
import {Get} from '@axios'

const ArticleInfo = async({ params }: { params: Promise<{ id: string }> }) => {
  const articleId=  (await params).id
  
  const [e,r] = await Get<articleListItemType>(`/api/articles/${articleId}`)
  
  let content=''
  if (r&&r.errno===0) {
    content = r.data.content
  }


  return (
    <div>{content}</div>
    )
};

export default ArticleInfo;
