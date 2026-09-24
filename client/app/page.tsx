"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Page() {

  const [{status}, setStatus] = useState({status: "unknown"})

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2" onClick={()=>{
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`).then(res => res.json()).then(setStatus)
          }}>Refresh Server status</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)

          <br />Server status: {status}
        </div>
      </div>
    </div>
  )
}
