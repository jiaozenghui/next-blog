"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/plugins/axios";
import { userMessageConfs } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type PhoneAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const PhoneAuthForm = ({ className, ...props }: PhoneAuthFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSending, setIsSending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [codeDisabled, setCodeDisabled] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    phone: z.string().regex(/^1[3-9]\d{9}$/, "Invalidate phone number"),
    code: z.string().min(1, {
      message: "Please input code",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      code: "",
    },
    mode: "onChange",
  });

  const startTimer = () => {
    let count = 60;
    const intervalId = setInterval(() => {
      setTimer(count);
      if (count <= 0) {
        setTimer(60);
        clearInterval(intervalId);
        
        setCodeDisabled(false);
      }
      count--;
    }, 1000);
  };

  const handleSendCode = async () => {
    setCodeDisabled(true);
    const formValues = form.getValues();

    try {
      setIsSending(true);
      const [e, r] = await Post("/auth/getVeriCode", {
        phoneNumber: formValues.phone,
      });
      if (r?.errno === 0) {
        toast({
          title: "验证码已发送，请注意查收",
        });
        startTimer();
      } else {
        setCodeDisabled(false);
        const message = r?.errno
          ? userMessageConfs[r?.errno]
          : "发送验证码失败";
        toast({
          title: message,
        });
      }
    } catch (error) {
      setCodeDisabled(false);
      toast({
        title: "发送验证码时发生错误",
      });
    } finally {
      setIsSending(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      phone: values.phone,
      code: values.code,
    });
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "邮箱或密码不正确",
        });
      } else {
        toast({
          title: result.error || "登录失败",
        });
      }
    } else {
      toast({
        title: "登录成功!",
      });
      router.push("/");
    }
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardContent className="p-6 pt-0 grid gap-4 mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid ">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0">
                      <FormLabel className="text-16 font-bold  ">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="input-class focus-visible:ring-offset-orange-1"
                          placeholder="phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className=" " />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0">
                      <FormLabel className="text-16 font-bold  ">
                        Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="input-class focus-visible:ring-offset-orange-1"
                          placeholder="code"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className=" " />
                    </FormItem>
                  )}
                />
                <Button
                  className="absolute top-[22px] right-0"
                  disabled={
                    codeDisabled ||
                    form.getFieldState("phone").invalid ||
                    form.getValues("phone") === ""
                  }
                  onClick={handleSendCode}
                >
                  {isSending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {timer === 60 ? "获取验证码" : `${timer}秒后重发`}
                </Button>
              </div>
              <Button className="mt-2" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PhoneAuthForm;
