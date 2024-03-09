import AuthForm from "@/components/auth/authForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Auth() {

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && session) {
      router.push('/')
    }
  }, [session])

  return (
    <AuthForm />
  )
}