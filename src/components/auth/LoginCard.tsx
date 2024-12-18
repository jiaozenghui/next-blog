'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { withoutAuth } from './../WithoutAuth'
import EmailAuthForm from './EamilAuthForm'
import PhoneAuthForm from './PhoneAuthForm'

const LoginTabs = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardContent className="p-6 pt-0 grid gap-4 mt-6">
        <Tabs defaultValue="account" >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="account">用户名登录</TabsTrigger>
            <TabsTrigger value="password">手机号登录</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <EmailAuthForm />
          </TabsContent>
          <TabsContent value="password">
            <PhoneAuthForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default withoutAuth(LoginTabs)
