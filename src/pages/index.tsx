import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { useState } from "react";
import { updateRouterData } from "../Hooks.ts/globalData";

const Home: NextPage = () => {
  const [currentUsserName, setCurrentUsserName] = useState("");
  const hello = api.example.hello.useQuery({ text: currentUsserName });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        dir="rtl"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Crypto_<span className="text-[hsl(280,100%,70%)]">Nai</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/Plans"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">חבילות →</h3>
              <div className="text-lg">חבילות זמנים להשכרת הבוט...</div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href=""
              target="_blank"
            >
              <h3 className="text-2xl font-bold">מידע כללי →</h3>
              <div className="text-lg">מידע שיווקי וכו</div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase setCurrentUserName={setCurrentUsserName} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

interface authCaseProps {
  setCurrentUserName: any;
}

const AuthShowcase: React.FC<authCaseProps> = (props) => {
  const { data: sessionData } = useSession();
  console.log({ sessionData });
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  sessionData && props.setCurrentUserName(sessionData.user?.name);
  // sessionData && updateRouterData(sessionData);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "התנתק" : "התחבר"}
      </button>
    </div>
  );
};
