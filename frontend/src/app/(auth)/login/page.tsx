import { Title } from "@/components/Login/Title/Title";
import { IntraAuthButton } from "@/components/Login/AuthButton/IntraAuth";
import Team from "@/components/Login/Team/Team";
import { Footer } from "@/components/Login/Footer/Footer";
import React from "react";

/*
 * TODO: Put more spacing between the button and the team section.
 *
 * NOTE: The Header and the Footer it is on the layout.tsx file.
 * */

export default function Home() {
  return (
    <>
      <main className="w-screen h-full flex flex-col items-center gap-20 mt-32">
          <Title />
          <IntraAuthButton />
          <Team />
          <Footer />
      </main>
    </>
  );
}
