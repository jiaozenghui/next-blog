declare interface TagAttributes {
    id: number;
    name: string;
    belong: number;
    icon_file_name?: string;
    icon_url?: string;
    createdAt: Date;
    indexes: number;
  }
  
  declare interface ArticleAttributes {
    id: number;
    title: string;
    desc: string;
    author: number;
    author_data: UserAttributes;
    content: string;
    cover_file_name?: string;
    coverImg?: string;
    reprint?: string;
    state: number;
    language: string[] | null;
    viewCount: number;
    update_time?: string;
    createdAt: string;
    comment_count: number;
    /** 是否展示目录*/
    display_directory: boolean;
    collection_count: number;
    /** 是收藏（收藏夹ID）*/
    collection_state: number[] | null;
    likeCount: number;
    like_state: number;
    theme_id: number;
    category: string;
    tags: string
  }
  declare interface UserAttributes {
    id: number;
    name: string;
    auth: number;
    email?: string;
    github?: string;
    password: string;
    state?: number;
    description?: string;
    site?: string;
    unit?: string;
    location?: string;
    avatar_file_name?: string;
    avatar_url?: string;
    article_count: number;
    collection_count: number;
    /** 被多少人关注*/
    follower_count: number;
    /** 关注了多少人*/
    followe_count: number;
    createdAt: string;
  }
  declare interface CommentAttributes {
    id: number;
    belong_id: number;
    user_id: number;
    content: string;
    reply: null | number;
    comment_pics: string;
    createdAt: Date;
    type: "article" | "problem";
  }
  
  declare interface LinkAttributes {
    id: number;
    name: string;
    url: string;
    user_id: number | null;
    is_allow: number;
    logo_file_name: string;
    logo_url: string;
    createdAt: Date;
  }
  
  declare interface NoticeAttributes {
    id: number;
    user_id: number;
    relation_id: number;
    type: string;
    is_read: number;
    createdAt: Date;
  }
  
  declare interface ProblemAttributes {
    id: number;
    title: string;
    tag: { name: string }[];
    /** 答案数量*/
    answer_count: number;
    content: string;
    language: string[] | null;
    author: number;
    answer_id?: number;
    viewCount: number;
    createdAt: string;
    update_time?: string;
  }
  
  declare interface AnswerAttributes {
    id: number;
    problem_id: number;
    content: string;
    author: number;
    createdAt: string;
  }
  