
import {Get} from "@axios";
import useFetch from "@/common/hooks/useFetch";
import useUserWriteArticle from "@/store/user/article-create";
import ArticleEditor from "@/components/ArticleEditor";
import { Skeleton } from "@/components/ui/skeleton";

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



  return (
    <ArticleEditor
        articleId ={articleId}
    />
    )
};

export default EditArticle;
