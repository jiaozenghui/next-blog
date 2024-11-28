/** 文章列表，单个文章主要的字段类型*/
type articleListItemType = Pick<
  ArticleAttributes,
  | "id"
  | "title"
  | "desc"
  | "viewCount"
  | "coverImg"
  | "update_time"
  | "createdAt"
  | "comment_count"
  | "likeCount"
  | "content"
  | "state"
  | 'category'
  | 'tags'
> & {
  author_data: Pick<UserAttributes, "name">;
};
export type { articleListItemType };
