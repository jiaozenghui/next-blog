export interface menuProps {
  id: string;
  label: string;
  children?: tagProps[];
}

export const menuConfs = {
  search: "Search",
  all: "Latest published articles",
  personal: "About me",
  chart: "Charts",
  screen: "Big Screen",
  technology: "Technology",
  life: "Life",
} as const;

export type pTypes = keyof typeof menuConfs;

export interface tagProps {
  id: string;
  label: string;
}

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/discover.svg",
    route: "/discover",
    label: "Discover",
  },
  {
    imgURL: "/icons/microphone.svg",
    route: "/create-podcast",
    label: "Create Podcast",
  },
];

export const tagList = [
  {
    id: "js",
    label: "JS",
  },
  {
    id: "nodejs",
    label: "Nodejs",
  },
  {
    id: "angular",
    label: "Agular",
  },
  {
    id: "vue",
    label: "Vue",
  },
  {
    id: "react",
    label: "React",
  },
  {
    id: "webpack",
    label: "Webpack",
  },
  {
    id: "mongodb",
    label: "Mongodb",
  },
];

export const categoryList = [
  {
    id: "life",
    label: "Life",
  },
  {
    id: "technology",
    label: "Technology",
    children: tagList,
  },
  {
    id: "screen",
    label: "Big Screen",
  },
  {
    id: "chart",
    label: "Charts",
  },
];

export const menuList: menuProps[] = [
  {
    id: "life",
    label: "Life",
  },
  {
    id: "technology",
    label: "Technology",
    children: tagList,
  },
  {
    id: "screen",
    label: "Big Screen",
  },
  {
    id: "chart",
    label: "Charts",
  },
  {
    id: "personal",
    label: "About me",
  },
];

export const userMessageConfs: {[key:number]: string} = {
  101001: '输入信息验证失败',
  101005: '请勿频繁获取短信验证码',
  101006: '验证码不正确',
  101007: '验证码发送失败',

}
