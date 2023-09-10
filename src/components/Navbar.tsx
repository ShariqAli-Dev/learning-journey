import Link from "next/link";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

export default async function Navbar() {
  const session = await getAuthSession();
  console.log(session);
  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-960 z-[10] h-fit border-b border-zinc-30 py-2">
      <div className="flex items-center justify-center gap-2 px-8 mx-auto h-fll sm:justify-between max-w-7xl">
        <Link href="/gallery" className="items-center hidden gap-2 sm:flex">
          <p className="px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px]  border-2 border-b-4 border-r-4 border-black rounded-lg md:block dark:border-white">
            Learning Journey
          </p>
        </Link>
        <div className="flex items-center">
          <Link href="/gallery">Gallery</Link>
          {session?.user && (
            <>
              <Link href="/create" className="mr-3">
                Create Course
              </Link>
              <Link href="/settings" className="mr-3">
                Settings
              </Link>
            </>
          )}

          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
