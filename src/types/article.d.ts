/** 文章列表，单个文章主要的字段类型*/
type articleListItemType = Pick<
  ArticleAttributes,
  | "id"
  | "title"
  | "desc"
  | "view_count"
  | "coverImg"
  | "update_time"
  | "create_time"
  | "comment_count"
  | "like_count"
  | "content"
  | "state"
  | 'category'
> & {
  tag: Pick<TagAttributes, "name">[];
  author_data: Pick<UserAttributes, "name">;
};
export type { articleListItemType };
