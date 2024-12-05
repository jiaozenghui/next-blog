"use client";

import { useEffect, useState } from "react";
import { Anchor } from "@/types";

export function ArticleAnchor() {
  const [anchors, setAnchors] = useState<Anchor[] | null>(null);
  const findCondition = 'a[href^="article_"]';
  useEffect(() => {
    const elementsArray = Array.prototype.slice.call(
      document
        .getElementById("blog_artcle_content")
        ?.querySelectorAll(findCondition)
    );
    debugger;
    const elements = elementsArray.map((ele: Element) => {
      const anchor_id = ele.getAttribute("href")
        ? ele.getAttribute("href")?.split("article_")[1]
        : "";
      if (anchor_id) {
        ele.parentElement?.setAttribute("id", anchor_id);
      }
      ele.removeAttribute("target");
      ele.setAttribute("href", `#${anchor_id}`);
      return {
        type: ele.parentElement?.tagName,
        text: ele.textContent,
        id: anchor_id,
      } as Anchor;
    });
    setAnchors(elements);
  }, []);

  return (
    <div className="hidden text-sm lg:block   pl-[10px]">
      <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] lg:w-[180px] pt-4 overflow-y-auto no-scrollbar">
        <ul id="header-container">
          {anchors ? (
            anchors.map((item) => (
              <li key={item.id} id={item.id} className={item.type}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))
          ) : (
            <>loading</>
          )}
        </ul>
      </div>
    </div>
  );
}
