declare interface TagAttributes {
    id: number;
    name: string;
    belong: number;
    icon_file_name?: string;
    icon_url?: string;
    createdAt: Date;
    indexes: number;
  }
  
  declare interface Anchor {
    id: string,
    type: string,
    text: string
  }


  declare interface ArticleAttributes {
    id: number;
    title: string;
    desc: string;
    author: number;
    content: string;
    coverImg?: string;
    viewCount: number;
    latestPublishAt: string;
    likeCount: number;
    category: string;
    tags: string
    user:UserAttributes,
    anchors: Anchor[],
    createdAt: string
  }
  declare interface UserAttributes {
    id:number
    _id: string
    name: string
    email: string
    phoneNumber: string
    createdAt: string
    updatedAt: string
  }

  

  