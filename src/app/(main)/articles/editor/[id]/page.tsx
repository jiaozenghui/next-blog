
import { redirect } from 'next/navigation'
import { getAuthSession } from "@/utils/auth";
import ArticleEditor from "@/components/ArticleEditor";

const EditArticle = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id

  const session = await getAuthSession()
  if (!session?.accessToken) {
    redirect('/')
  }

  return (
    <ArticleEditor
      articleId={articleId}
    />
  )
};

export default EditArticle;
