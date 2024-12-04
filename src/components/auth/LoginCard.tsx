"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { withoutAuth } from "./../WithoutAuth";
import EmailAuthForm from "./EamilAuthForm";
import PhoneAuthForm from "./PhoneAuthForm";

const LoginTabs = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">User name login</TabsTrigger>
        <TabsTrigger value="password">Mobile Number</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <EmailAuthForm />
      </TabsContent>
      <TabsContent value="password">
        <PhoneAuthForm />
      </TabsContent>
    </Tabs>
  );
};

export default withoutAuth(LoginTabs);
