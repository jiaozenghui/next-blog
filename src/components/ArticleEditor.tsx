"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { withAuth } from "./withAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
// import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
// import { useMutation } from "convex/react"
import { useRouter } from "next/navigation";
import axios, { Post, Patch, FcResponse } from "@axios";

import useFetch from "@/common/hooks/useFetch";
import { Skeletons } from "@/components/Skeletons";
import { articleListItemType } from "@/types/article";
import { categoryList } from "@/constants";
import { tagList } from "@/constants";
import { formatHtml } from "@/lib/utils";
// import W1Editor from "./WEditor";


const formSchema = z.object({
  title: z.string().min(2),
  desc: z.string().min(2),
  category: z.string().min(2),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
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
  data?: articleListItemType;
  articleId?: string;
  /** 提交事件*/
  submit?: (values: articleParamsType) => void;
  /** 是否展示保存草稿箱按钮*/
  showDraftsButton?: boolean;
}
export type modalPropsType = Pick<propsType, "submit">;

const WEditor = dynamic(() => import('@/components/WEditor'), { ssr: false });

const ArticleEditor = (props: propsType) => {
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
      title: "",
      desc: "",
      category: "",
      tags: [],
    },
  });


  const { data, isLoading } = useFetch<articleListItemType, any>(
    () =>
      axios.get(`/api/articles/${props.articleId}`).then((res) => {
        return res.data.data;
      }),
    { isUnSend: props.articleId ? false : true }
  );

  //为状态设置值
  useEffect(() => {
    if (data) {
      form.setValue("desc", data.desc);
      form.setValue("title", data.title);
      form.setValue("category", data.category);
      form.setValue("tags", data.tags ? data.tags.split("|") : []);
      if (data.coverImg) {
        setImageUrl(data.coverImg);
      }
      if (data.content) {
        setContent(data.content);
      }

    }
  }, [data, isLoading, form]);

  const handleBack = (
    r: FcResponse<articleListItemType> | undefined,
    e: any
  ) => {
    if (r && r.errno === 0) {
      toast({
        title: props.articleId ? "Update successed" : "Podcast created",
      });
      setIsSubmitting(false);
      router.push("/");
    }
  };



  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!imageUrl) {
        toast({
          title: "cover image has not generate",
        });
        setIsSubmitting(false);
        //throw new Error("Please generate image");
      }
      const {html, anchors}= formatHtml(content)
      const postBody = {
        title: data.title,
        desc: data.desc,
        coverImg: imageUrl,
        content: html,
        category: data.category,
        tags: data.tags.join("|"),
        anchors
      };
      const config = { needAuth: true }
      if (props.articleId) {
        const [e, r] = await Patch<articleListItemType>(
          `/api/articles/update/${props.articleId}`,
          postBody,
          config
        );
        handleBack(r, e);
      } else {
        const [e, r] = await Post<articleListItemType>(
          "/api/articles/create",
          postBody,
          config
        );
        handleBack(r, e);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  return !isLoading ? (
    <section className="mt-6 flex flex-col px-1  overflow-hidden">
      <h1 className="text-20 font-bold  ">Create Podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex w-full flex-col"
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
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold  ">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select

                      onValueChange={field.onChange}
                      defaultValue={data?.category}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryList.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className=" " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel className="text-16 font-bold  block">Tags</FormLabel>
                  {tagList.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
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
            {/* <AIEditor
              placeholder="描述代码的作用，支持 Markdown 语法.."
              style={{ height: 220 }}
              value={content}
              onChange={(val) => setContent(val)}
            /> */}
            <Label className="text-16 font-bold  ">Content</Label>
            <WEditor content={content} setContent={setContent} />
            <div className="my-10 w-full">
              <Button type="submit">
                {isSubmitting ? (
                  <>
                    Submitting
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
export default withAuth(ArticleEditor);
