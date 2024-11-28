
import ArticleEditor from "@/components/ArticleEditor";
import { getAuthSession } from "@/utils/auth";
import { redirect } from 'next/navigation'

const CreateArticle = async() => {


  const session = await getAuthSession()
  if(!session?.accessToken) {
    redirect('/')
  }
  
  return (
    <ArticleEditor/>
  )
}

export default CreateArticle