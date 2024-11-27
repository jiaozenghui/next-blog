"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
// import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
// import { useMutation } from "convex/react"
import { useRouter  } from "next/navigation";
import LoaderSpinner from "@/components/LoaderSpinner";
import axios, {Post, Patch, FcResponse} from "@axios";

import useFetch from "@/common/hooks/useFetch";
import { Skeletons } from "@/components/Skeletons";
import { articleListItemType } from "@/types/article";

type UploadStatus = "ready" | "loading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  resp?: any;
  // 上传为图书时候的预览地址
  url?: string;
}

const formSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(2),
});

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
  data?: articleListItemType
  articleId?: string;
  /** 提交事件*/
  submit?: (values: articleParamsType) => void;
  /** 是否展示保存草稿箱按钮*/
  showDraftsButton?: boolean;
}
export type modalPropsType = Pick<propsType, "submit">;

const ArticleEditor = (props:propsType) => {
  const { data:session } = useSession();
  const router = useRouter();


  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      desc: '',
    },
  });


  const { data, isLoading, refetch } = useFetch<articleListItemType, any>(() =>
    axios.get(`/api/articles/${props.articleId}`).then((res) => {
        return res.data.data;
      })
    );

  //为状态设置值
  useEffect(() => {
    if (data) {
      form.setValue('desc', data.desc)
      form.setValue('title', data.title)
      setImageUrl(data.coverImg)
      setContent(data.content)
    }
  }, [data, form]);

  const handleBack= (r: FcResponse<articleListItemType> | undefined, e:any)=>{
    if (r && r.errno===0) {
        toast({ title: props.articleId? 'Update successed': 'Podcast created' });
        setIsSubmitting(false);
        router.push("/");
    } else {
        throw new Error("opt failed")
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!imageUrl) {
        toast({
          title: "Please generate image",
        });
        setIsSubmitting(false);
        throw new Error("Please generate image");
      }
     
      const postBody = {
        title: data.title,
        desc: data.desc,
        coverImg: imageUrl,
        content: content,
      }
      const config = {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    
debugger
      if (props.articleId) {
        const [e, r] = await Patch<articleListItemType>(`/api/articles/update/${props.articleId}`, postBody, config)
        handleBack(r,e)
      } else {
        const [e, r] = await Post<articleListItemType>("/api/articles/create", postBody, config)
        handleBack(r,e)
      }
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  return data ? (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold  ">Create Podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold  ">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="JSM Pro Podcast"
                      {...field}
                    />
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
                  <FormLabel className="text-16 font-bold  ">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Write a short podcast description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className=" " />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold  ">CoverImg</Label>

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

            <div className="mt-10 w-full">
              <Button type="submit">
                {isSubmitting ? (
                  <>
                    Submit
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  ) : (
    <div className="space-y-2 mt-20">
    <Skeletons rows={6} className="h-4 w-full" />

  </div>
    
  );
};
export default ArticleEditor;
