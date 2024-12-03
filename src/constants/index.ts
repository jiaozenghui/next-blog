export interface menuProps {
  id: string,
  label: string,
  children?: tagProps[]
}

export interface tagProps {
  id: string
  label: string
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
  }
] 

export const categoryList = [
  {
    id: "life",
    label: "Life",
  },
  {
    id: "technology",
    label: "Technology",
    children: tagList
  },
  {
    id: "screen",
    label: "Big Screen",
  },
  {
    id: "chart",
    label: "Charts",
  }
] 

export const menuList: menuProps[] = [
  {
    id: "life",
    label: "Life",
  },
  {
    id: "technology",
    label: "Technology",
    children: tagList
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
  }
] 
export const menuConfs: { [key: string]: string }= {
  all: 'Latest published articles',
  personal: 'About me',
  chart: 'Charts',
  screen: 'Big Screen',
  technology: 'Technology',
  life: 'Life'
}
