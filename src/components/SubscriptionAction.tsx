"use client";
import { useSession } from "next-auth/react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function SubscriptionsAction() {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/stripe");
      window.location.href = data.url;
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
      {data?.user.credits} / 10 Free Generations
      <Progress
        className="mt-2"
        value={data?.user.credits ? data.user.credits * 10 : 0}
      />
      <Button
        onClick={handleSubscribe}
        className="mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
        disabled={loading}
      >
        Upgrade
        <Zap className="ml-2 fill-white" />
      </Button>
    </div>
  );
}
