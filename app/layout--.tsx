"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const onClick=(url:string)=>{
        router.push(url);
    }
    return (
        <html>
            <!--
           <body>
            <ul>
            <li>
                    <Link href="./">Home</Link>
                </li>
                <li onClick={()=>onClick('/login')}>
                    <Link href="/login">Login</Link>
                </li>  <li>
                    <Link href="/cari">Cari</Link>
                </li>
            </ul> -->
            {children} <!-- </body> -->
        </html >
        )
}