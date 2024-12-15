/** 文章列表，单个文章主要的字段类型*/
declare type articleListItemType = Omit<ArticleAttributes, 'content'>

declare interface nextAndPrevProps {
  prev?: {id: number, title: string},
  next?: {id: number, title: string}
}

declare type articleDetails = ArticleAttributes & nextAndPrevProps
