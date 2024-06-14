"use client";
import React, {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ListFilter, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import RaffleCard from "@/components/app-components/raffle-card";
import {useReadContract} from "wagmi";
import {
  RAFFLE_ABI,
  RAFFLE_FACTORY_ABI,
  RAFFLE_FACTORY_ADDRESS,
} from "@/constants";
import {publicClient} from "@/providers/privy";
import {getTokenName} from "@/lib/utils";

const Marketplace = () => {
  const [showOpenRaffles, setShowOpenRaffles] = useState(true);
  const [filter, setFilter] = useState(1);
  const [raffles, setRaffles] = useState([] as any);
  const [filteredRaffles, setFilteredRaffles] = useState([] as any);
  const {data: allRaffles, isLoading} = useReadContract({
    abi: RAFFLE_FACTORY_ABI,
    address: RAFFLE_FACTORY_ADDRESS,
    functionName: "getAllDeployedRaffles",
    chainId: 137,
  }) as {data: string[]; isLoading: boolean};
  const fetchAllInformation = async () => {
    if (!allRaffles) return;
    const rafflePromises = allRaffles.map((contract) =>
      publicClient.readContract({
        address: contract as `0x${string}`,
        abi: RAFFLE_ABI,
        functionName: "getRaffleInfo",
      })
    );
    const raffles = await Promise.all(rafflePromises);
    setRaffles(raffles);
  };

  const handleSearch = (e: any) => {};

  useEffect(() => {
    fetchAllInformation();
  }, [allRaffles]);

  //handle sort
  useEffect(() => {
    if (filter === 2) {
      setFilteredRaffles(
        raffles.sort((a: any, b: any) => Number(b[2]) - Number(a[2]))
      );
    } else if (filter === 1) {
      setFilteredRaffles(
        raffles.sort((a: any, b: any) => Number(a[2]) - Number(b[2]))
      );
    }
    // } else if (filter === 3) {
    //   setFilteredRaffles(raffles.sort((a: any, b: any) => b[5] - a[5]));
    // } else if (filter === 4) {
    //   setFilteredRaffles(raffles.sort((a: any, b: any) => a[5] - b[5]));
    // }
  }, [filter]);
  return (
    <main className=" w-[96vw] p-4 mx-auto ">
      <section className="flex flex-col md:flex-row  justify-between">
        <div className="flex flex-row gap-4 items-center justify-between md:justify-normal my-2 md:my-0">
          <p className="font-semibold text-[28px] text-[#5A637C]">
            All Raffles
          </p>
          <div className="flex flex-row p-1 items-center bg-[#F7F9FF] rounded-lg">
            <span
              className={`text-[#7782A0] h-[34px] w-[78px] text-lg font-medium rounded-lg flex justify-center items-center cursor-pointer ${
                showOpenRaffles && "text-[#5A637C] bg-[#E3E8F5]"
              }`}
              onClick={() => setShowOpenRaffles(true)}
            >
              Open
            </span>
            <span
              className={`text-[#7782A0] h-[34px] w-[78px] text-lg font-medium rounded-lg flex justify-center items-center cursor-pointer ${
                !showOpenRaffles && "text-[#5A637C] bg-[#E3E8F5]"
              }`}
              onClick={() => setShowOpenRaffles(false)}
            >
              Closed
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2 my-2 md:my-0">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-[22px] w-[22px] text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Raffles"
              className="rounded-lg bg-[#F7F9FF] h-[44px] w-full md:w-[264px] text-[#818DAC] font-[400] text-lg pl-10 "
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-[44px] gap-1 bg-[#F7F9FF]"
              >
                <ListFilter className="h-[44px]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#E3E8F5] h-[144px] w-[240px] rounded-lg border-1"
            >
              <DropdownMenuCheckboxItem
                checked={filter === 1}
                onClick={() => setFilter(1)}
                className="font-medium text-[16px] py-2 cursor-pointer"
              >
                Ticket Price: Highest First
              </DropdownMenuCheckboxItem>{" "}
              <DropdownMenuSeparator className="w-[80%] m-auto" />
              <DropdownMenuCheckboxItem
                className="font-medium text-[16px] py-2 cursor-pointer"
                checked={filter === 2}
                onClick={() => setFilter(2)}
              >
                Ticket Price: Lowest First
              </DropdownMenuCheckboxItem>{" "}
              {/* <DropdownMenuSeparator className="w-[80%] m-auto" />
              <DropdownMenuCheckboxItem
                className="font-medium text-[16px] py-2 cursor-pointer"
                checked={filter === 3}
                onClick={() => setFilter(3)}
              >
                Time Left: Most
              </DropdownMenuCheckboxItem>{" "}
              <DropdownMenuSeparator className="w-[80%] m-auto" />
              <DropdownMenuCheckboxItem
                className="font-medium text-[16px] py-2 cursor-pointer"
                checked={filter === 4}
                onClick={() => setFilter(4)}
              >
                Time Left: Least
              </DropdownMenuCheckboxItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
        {raffles.map((raffle: any, index: number) => {
          if (showOpenRaffles && raffle[8]) {
            return (
              <RaffleCard
                key={index}
                name={raffle[10] ?? "Unknown"}
                totalTickets={raffle[3].toString() ?? 0}
                ticketsSold={raffle[6].toString() ?? 0}
                ticketPrice={raffle[2].toString() ?? 0}
                paymentToken={getTokenName(raffle[4])}
                timebound={raffle[5]}
                timestamp={Date.now().toString()}
                contractAddress={`${raffle[0]}:${raffle[1]}`}
                raffleOpen={raffle[8]}
                raffleAddress={allRaffles[index]}
              />
            );
          } else if (!showOpenRaffles && !raffle[8])
            return (
              <RaffleCard
                key={index}
                name={raffle[10] ?? "Unknown"}
                totalTickets={raffle[3].toString() ?? 0}
                ticketsSold={raffle[6].toString() ?? 0}
                ticketPrice={raffle[2].toString() ?? 0}
                paymentToken={getTokenName(raffle[4])}
                timebound={raffle[5]}
                timestamp={Date.now().toString()}
                contractAddress={`${raffle[0]}:${raffle[1]}`}
                raffleOpen={raffle[8]}
                winner={raffle[11]}
                isAuctionCancelled={raffle[9]}
                raffleAddress={allRaffles[index]}
              />
            );
        })}
      </section>
    </main>
  );
};

export default Marketplace;
