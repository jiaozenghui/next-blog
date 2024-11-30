
import { redirect } from 'next/navigation'
import { getAuthSession } from "@/utils/auth";
import { getSession } from 'next-auth/react';
import ArticleEditor from "@/components/ArticleEditor";

const EditArticle = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id

  const session = await getAuthSession()
  console.log('8009009')
  console.log(session)
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
