// import { cn } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {Footer} from "@/modules/home/footer";
import { Header } from "@/modules/home/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "VibeCode - Editor ",
    default: "Code Editor For VibeCoders - VibeCode",
  },
};
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
<div
  className="absolute inset-0
  bg-size-[40px_40px]
  bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]
  dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
/>

<div
  className="pointer-events-none absolute inset-0 bg-white dark:bg-black
  mask-[radial-gradient(circle,transparent_35%,black)]"
/>

<main className="relative z-20 w-full pt-0">
  {children}
</main>


 
<Footer />

    </>
  );
}