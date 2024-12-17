import styles from './index.module.css'

interface propsType {
  anchors: Anchor[]
}

export function ArticleAnchor({ anchors }: propsType) {
  return !anchors || anchors.length ===0 ? (
    <></>
  ) : (
    <div className="hidden text-sm lg:block">
      <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] lg:w-[200px] pt-4 overflow-y-auto no-scrollbar">
        <h1>文章目录</h1>
        <ul className={styles.articleAnchor}>
          {anchors.map((item) => (
            <li key={item.id} id={item.id} data-type={item.type}>
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
