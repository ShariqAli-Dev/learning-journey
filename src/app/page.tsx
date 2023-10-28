import HomeSignInButton from "@/components/HomeSignInButton";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/gallery");
  }

  return (
    <main className="flex h-[90svh] items-center justify-center">
      <div>
        <h2 className="text-xl text-center">Welcome to Learning Journey!</h2>
        <p>
          Learning journey is a platform for creating courses using AI! Get
          started by logging in below
        </p>
        <HomeSignInButton />
      </div>
    </main>
  );
}
