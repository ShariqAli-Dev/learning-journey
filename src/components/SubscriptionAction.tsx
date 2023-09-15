"use client";
import { useSession } from "next-auth/react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface Props {}

export default function SubscriptionsAction() {
  const { data } = useSession();

  return (
    <div className="flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
      {data?.user.credits} / 10 Free Generations
      <Progress
        className="mt-2"
        value={data?.user.credits ? data.user.credits * 10 : 0}
      />
      <Button className="mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">
        Upgrade
        <Zap className="ml-2 fill-white" />
      </Button>
    </div>
  );
}
