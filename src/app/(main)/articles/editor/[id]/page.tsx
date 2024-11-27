
import { redirect } from 'next/navigation'
import { getAuthSession } from "@/utils/auth";
import ArticleEditor from "@/components/ArticleEditor";

type UploadStatus = "ready" | "loading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  resp?: any;
  // 上传为图书时候的预览地址
  url?: string;
}






const EditArticle = async({ params }: { params: Promise<{ id: string }> }) => {
  const articleId=  (await params).id
  
  const session = await getAuthSession()
  if(!session?.accessToken) {
    redirect('/')
  }

  return (
    <ArticleEditor
        articleId={articleId}
    />
    )
};

export default EditArticle;
