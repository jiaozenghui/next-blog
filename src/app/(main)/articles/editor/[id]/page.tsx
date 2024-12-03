import ArticleEditor from "@/components/ArticleEditor";

const EditArticle = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id

  return (
    <ArticleEditor
      articleId={articleId}
    />
  )
};

export default EditArticle;
