"use client";
import { Button, Link } from "react-daisyui"

const CustomPage404 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 bg-transparent">
      <h1 className="text-5xl">Page Not Found</h1>
      <Link href="/">
      <Button color="error">
        Error
      </Button>
      </Link>
    </div>
  )
}

export default CustomPage404
