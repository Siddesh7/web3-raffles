import React from "react";
import {Button} from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import {useAppContext} from "@/app/context/app-context";

const Landing = () => {
  const {setShowRaffleCreateModal} = useAppContext();
  return (
    <div className="flex flex-col justify-center items-center h-full w-[80vw] md:w-[90vw] m-auto">
      <Image src="/logo.png" width={250} height={200} alt="logo" />
      <h1 className=" text-3xl md:text-5xl font-semibold my-8 text-center">
        Unlock Exclusive Web3 Domains: Win Yours Today!
      </h1>
      <p className=" text-center font-normal text-md text-[#7782A0]">
        Transform Your Online Identity through Domain Raffles. Your Winning
        Ticket to Web3 Domains Awaits.
      </p>

      <div className="flex flex-col justify-center items-center gap-2 my-8">
        <Button className="w-[200px] text-md" asChild>
          <Link href={`/marketplace`}>Buy Tickets</Link>
        </Button>
        <Button
          className="w-[200px] text-md"
          variant={"secondary"}
          onClick={() => setShowRaffleCreateModal(true)}
        >
          Create Raffle
        </Button>
      </div>
    </div>
  );
};

export default Landing;
