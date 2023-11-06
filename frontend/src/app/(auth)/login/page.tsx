'use client';
import { Title } from '@/components/Login/Title/Title';
import { IntraAuthButton } from '@/components/Login/AuthButton/IntraAuth';
import Team from '@/components/Login/Team/Team';
import { Footer } from '@/components/Login/Footer/Footer';
import React from 'react';
import { useSession } from 'next-auth/react';

/*
 * TODO: Put more spacing between the button and the team section.
 *
 * NOTE: The Header and the Footer it is on the layout.tsx file.
 * */

export default function Home() {
  const { data: session } = useSession();

  // const callbackUrl = "/";
  // const handleLogin = async () => {
  //   await signIn("42-school", {
  //     redirect: true,
  //     callbackUrl,
  //   });
  // };

  return (
    <>
      <main className="w-screen h-full flex flex-col items-center gap-20 mt-32">
        <Title />
        <a href={`${process.env.NESTJS_URL}/auth/intra`}>
          <button>
            <IntraAuthButton />
          </button>
        </a>
        <Team />
        <Footer />
      </main>
    </>
  );
}
