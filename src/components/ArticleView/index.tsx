import type { FC } from "react";
import styles from "./index.module.css";

interface propsType {
  content: string;
}
/** 文章页面主题内容显示*/
const ArticleView: FC<propsType> = (props) => {
  return (
    <article
      className={styles.articleContent}
      id="blog_artcle_content"
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: props.content }}
    ></article>
  );
};
export default ArticleView;
