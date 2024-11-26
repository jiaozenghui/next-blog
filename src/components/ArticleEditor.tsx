"use client";

import { useEffect } from "react";
import { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
// import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
// import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import LoaderSpinner from '@/components/LoaderSpinner';
import axios from "axios";


type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
  resp?: any
  // 上传为图书时候的预览地址
  url?: string
}


const formSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(2)
})

const AIEditor = dynamic(() => import("@/components/AIEditor"), {
  ssr: false,
  loading: () => <LoaderSpinner />,
});



export const initValue = {
    title: "",
    content: "",
    tag: [] as number[],
    reprint: null as null | string,
    description: null as null | string,
    cover_file_name: null as null | string,
    cover_url: null as null | string,
    theme_id: 0,
};

type articleContextType = typeof initValue;
type articleDataType = Omit<articleContextType, "coverUrl">;
/** 用于和服务器交互的当前文章参数*/
type articleParamsType = articleDataType & {
    cover_file_name: articleContextType["cover_file_name"];
};
interface propsType {
    articleId?: string
    /** 提交事件*/
    submit?: (values: articleParamsType) => void;
    /** 是否展示保存草稿箱按钮*/
    showDraftsButton?: boolean;
}
export type modalPropsType = Pick<propsType, "submit">;
const ArticleEditor: FC<propsType> = (props) => {
    
    const updateData = useUserWriteArticle((s) => s.updateData);
    const articleData = useUserWriteArticle((s) => s.data);
    const resetArticleData = useUserWriteArticle((s) => s.resetData);
    const { data, isLoading, refetch } = useFetch(() =>
      axios.get(`/api/articles/${props.articleId}`)
    );
  
    //为状态设置值
    useEffect(() => {
      if (data) {
        const { title, content, reprint, desc, cover_url, theme_id } = data;
        updateData({
          title,
          content,
          reprint,
          desc,
          cover_url,
          theme_id,
        });
      }
    }, [updateData, data]);


    const { status, data } = useSession();
    const sessionData = data
    const router = useRouter()
    console.log('888888888888888')
    const [imagePrompt, setImagePrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
  
    const [content, setContent] = useState("");
  
    const [isSubmitting, setIsSubmitting] = useState(false);
  
   
    const { toast } = useToast()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        desc: "",
      },
    })
  
  
    if (status === 'unauthenticated') {
      return router.push("/");
    }
    if (status === 'loading') { return <LoaderSpinner /> }
  
  
  
  
  
  
    async function onSubmit(data: z.infer<typeof formSchema>) {
  
      debugger
      try {
        setIsSubmitting(true);
        if (!imageUrl) {
          toast({
            title: 'Please generate image',
          })
          setIsSubmitting(false);
          throw new Error('Please generate image')
        }
  
        const results = await axios.post('/api/articles/create', {
          title: data.title,
          desc: data.desc,
          coverImg: imageUrl,
          content: content
        }, {
          headers: {
            Authorization: `Bearer ${sessionData?.accessToken}`,
          },
        })
        if (results && results.data) {
          toast({ title: 'Podcast created' })
          setIsSubmitting(false);
          router.push('/')
        }
  
      } catch (error) {
        console.log(error);
        toast({
          title: 'Error',
          variant: 'destructive',
        })
        setIsSubmitting(false);
      }
    }





    return (
        <section className="mt-10 flex flex-col">
        <h1 className="text-20 font-bold  ">Create Podcast</h1>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
            <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2.5">
                    <FormLabel className="text-16 font-bold  ">Title</FormLabel>
                    <FormControl>
                      <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="JSM Pro Podcast" {...field} />
                    </FormControl>
                    <FormMessage className=" " />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2.5">
                    <FormLabel className="text-16 font-bold  ">Description</FormLabel>
                    <FormControl>
                      <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                    </FormControl>
                    <FormMessage className=" " />
                  </FormItem>
                )}
              />
  
              <div className="flex flex-col gap-2.5">
                <Label className="text-16 font-bold  ">
                  CoverImg
                </Label>
  
                <GenerateThumbnail
                  setImage={setImageUrl}
                  image={imageUrl}
                  imagePrompt={imagePrompt}
                  setImagePrompt={setImagePrompt}
                />
              </div>
  
            </div>
            <div className="flex flex-col pt-10">
              <AIEditor
                placeholder="描述代码的作用，支持 Markdown 语法.."
                style={{ height: 220 }}
                value={content}
                onChange={(val) => setContent(val)}
              />
  
              {/* <GeneratePodcast
                setAudioStorageId={setAudioStorageId}
                setAudio={setAudioUrl}
                voiceType={voiceType!}
                audio={audioUrl}
                voicePrompt={voicePrompt}
                setVoicePrompt={setVoicePrompt}
                setAudioDuration={setAudioDuration}
              />
  
              <GenerateThumbnail
                setImage={setImageUrl}
                setImageStorageId={setImageStorageId}
                image={imageUrl}
                imagePrompt={imagePrompt}
                setImagePrompt={setImagePrompt}
              /> */}
  
  
  
              <div className="mt-10 w-full">
                <Button type="submit" >
                  {isSubmitting ? (
                    <>
                      Generating
                      <Loader size={20} className="animate-spin ml-2" />
                    </>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </section>
    )
};
export default ArticleEditor;
