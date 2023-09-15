"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

interface Props {
  isPro: boolean;
}

export default function SubscriptionButton({ isPro }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/stripe");
      window.location.href = data.url;
    } catch (e) {
      console.error("billing error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button className="mt-4" disabled={loading} onClick={handleSubscribe}>
      {isPro ? "Manage Subscriptions" : "Upgrade"}
    </Button>
  );
}
