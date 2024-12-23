import { Get } from '@axios'
import type { Metadata } from 'next'
import ArticleView from '@/components/ArticleView'
import Time from '@/components/Time'
import Like from '@/components/Like'
import Views from '@/components/Views'
import { ArticleAnchor } from '@/components/ArticleAnchor'
import { ArticleSwitch } from '@/components/ArticleSwitch'
import ArticleHead from '@/components/Head'

type Props = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articleId = (await params).id

  const { r } = await Get<articleDetails>(`/api/articles/${articleId}?update=view`)
  let data: articleDetails | null = null
  if (r && r.errno === 0) {
    data = r.data
  }
  return {
    title: data?.title,
    description: data?.desc
  }
}

const ArticleInfo = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id

  const { r } = await Get<articleDetails>(`/api/articles/${articleId}?update=view`)
  let data: articleDetails | null = null
  if (r && r.errno === 0) {
    data = r.data
  }

  return !data ? (
    <div className="flex justify-center w-full  pt-[50px]">暂未找到相关文章</div>
  ) : (
    <>
      <ArticleHead title={data.title} desc={data.desc} />
      <div className=" break-all flex-1 w-full   pb-5 shadow-sm px-2 overflow-hidden">
        <h1 className="text-4xl my-3 font-semibold">{data.title}</h1>
        <div className="my-3 flex text-muted-foreground">
          <Time time={data.createdAt} />
          <Like className="ml-3" articleId={data.id} likeCount={data.likeCount} />
          <Views className="ml-3" viewCount={data.viewCount} />
        </div>
        <ArticleView content={data.content} />
        <ArticleSwitch next={data.next} prev={data.prev} />
      </div>
      <ArticleAnchor anchors={data.anchors} />
    </>
  )
}

export default ArticleInfo
