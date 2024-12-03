import { useSession } from "next-auth/react"
import LoaderSpinner from "./LoaderSpinner"
import Link from "next/link";

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function WithAuth(props: P) {
        const { status } = useSession()


        if (status === "loading") {
            return <div className="flex justify-center items-center h-screen"><LoaderSpinner /></div>
        }
        if (status === "unauthenticated") {
            return <div className="flex justify-center w-full  pt-[50px]">登录已超时，请重新<Link className="text-cyan-600" href='/login'>登录</Link>之后再进行操作。</div>
        }
        return <WrappedComponent {...props} />
    }
}