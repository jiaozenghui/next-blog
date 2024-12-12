/** 文章列表，单个文章主要的字段类型*/
type articleListItemType = Pick<
  ArticleAttributes,
  | "id"
  | "title"
  | "desc"
  | "viewCount"
  | "coverImg"
  | "createdAt"
  | "likeCount"
  | "content"
  | "state"
  | 'category'
  | 'tags'
  | 'user',
  | 'anchors'
>;
export type { articleListItemType };

declare interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}
