"use client";

import { useTRPC } from "@/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const trpc = useTRPC()

  const { data } = useQuery(trpc.test.get.queryOptions());

  console.log(data)

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        <p>{data ?? ""}</p>
      </div>
    </div>
  )
}
