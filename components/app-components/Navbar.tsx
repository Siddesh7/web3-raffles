"use client";
import Image from "next/image";
import React from "react";
import {Button} from "../ui/button";
import {usePrivy} from "@privy-io/react-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useAccount, useDisconnect} from "wagmi";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {EllipsisVertical} from "lucide-react";
import {useAppContext} from "@/app/context/app-context";
import Link from "next/link";

const Navbar = () => {
  const {ready, authenticated, user, login, logout} = usePrivy();
  const {disconnect} = useDisconnect();
  const {address} = useAccount();
  const {setShowRaffleCreateModal} = useAppContext();
  return (
    <div className="flex flex-row w-[96vw] py-8 items-center mx-auto">
      <Image src="/logo.png" alt="logo" width={200} height={200} />
      <div className="ml-auto flex flex-row gap-2 ">
        <Button
          variant={"link"}
          className=" flex md:flex font-medium text-[16px] text-[#5A637C]"
          onClick={() => setShowRaffleCreateModal(true)}
        >
          Create Raffle
        </Button>
        {!authenticated ? (
          <Button onClick={login}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button className="hidden md:flex bg-[#4047F2] hover:bg-[#4046f2e1]">
                  {address?.slice(0, 6)}...{address?.slice(-6)}
                </Button>
                <Button
                  size={"icon"}
                  variant={"default"}
                  className="md:hidden bg-transparent border-black border-[1px] p-[1px]"
                  asChild
                >
                  <HamburgerMenuIcon color="black" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem asChild>
                <Link href={`/profile/tickets`}>My Tickets</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href={`/profile/raffles`}>My Raffles</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  logout();
                  disconnect();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
