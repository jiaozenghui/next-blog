import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { protectedRoutes } from "@/routes"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function isProtectRoute(path:string):boolean {
  let isProtected = false
  protectedRoutes.forEach((match)=>{
    if (match.test(path)){
      return isProtected = true 
    }
  })
  return isProtected
}

export function formatHtml(content:string) {
  const container = stringToHTML(content)
  const findCondition = 'a[href^="#article_"]';
  
  const elementsArray = Array.prototype.slice.call(
    container?.querySelectorAll(findCondition)
  );
  const anchors = elementsArray.map((ele: Element) => {
    const anchor_id = ele.getAttribute("href")
      ? ele.getAttribute("href")?.split("#article_")[1]
      : "";
    if (anchor_id) {
      const anchorEle = document.createElement(`a`)
      anchorEle.setAttribute('id', anchor_id)
      anchorEle.setAttribute('href', `#${anchor_id}`)
      anchorEle.style.cssText = `margin-top: -84px;
      display: inline-block;
      position: absolute;
      width: 1px;`
      ele.parentElement?.prepend(anchorEle)
      //ele?.setAttribute("id", anchor_id);
    }
    ele.removeAttribute("target");


    return {
      type: ele.parentElement?.tagName,
      text: ele.textContent,
      id: anchor_id,
    };
  });
  return {
    html: container.innerHTML,
    anchors
  }
}

const  stringToHTML =  (str:string): HTMLElement=> {
  const dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;
}