"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type EmailAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const EmailAuthForm = ({ className, ...props }: EmailAuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().min(1, {
      message: "Username must be at least 1 characters.",
    }),
    password: z.string().min(1, {
      message: "Password must be at least 1 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "账号或密码不正确",
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
    setIsLoading(false)
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0">
                      <FormLabel className="text-16 font-bold  ">
                        User Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isLoading}
                          className="input-class focus-visible:ring-offset-orange-1"
                          placeholder="user name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className=" " />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0">
                      <FormLabel className="text-16 font-bold  ">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="input-class focus-visible:ring-offset-orange-1"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className=" " />
                    </FormItem>
                  )}
                />
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
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default EmailAuthForm;
