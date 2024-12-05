// https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning
// 有script标签，防止水合报错
import type { FC } from "react";

interface prposType {
  content: string;
}
/** 文章页面主题内容显示*/
const ArticleView: FC<prposType> = (props) => {
  return (
    <article
      id="blog_artcle_content"
      className="overflow-x-auto text-wrap flex-1"
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: props.content }}
    ></article>
  );
};
export default ArticleView;
