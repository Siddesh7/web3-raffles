"use client";
import RaffleCard from "@/components/app-components/raffle-card";
import {RAFFLE_ABI} from "@/constants";
import {getTokenName} from "@/lib/utils";
import {publicClient} from "@/providers/privy";
import React, {useEffect, useState} from "react";
import {isAddress} from "viem";

const Page = ({
  params,
}: {
  params: {
    contractAddress: string;
  };
}) => {
  const [raffleDetails, setRaffleDetails] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      if (!isAddress(params.contractAddress)) return;
      const data = await publicClient.readContract({
        address: params.contractAddress as any,
        abi: RAFFLE_ABI,
        functionName: "getRaffleInfo",
      });
      console.log(data);
      setRaffleDetails(data);
    };

    fetchData();
  }, [params.contractAddress]);

  return (
    <div className="w-[96vw] p-4 mx-auto md:mt-8">
      {" "}
      <RaffleCard
        key={params.contractAddress}
        name={raffleDetails[10] ?? "Unknown"}
        totalTickets={raffleDetails[3].toString() ?? 0}
        ticketsSold={raffleDetails[6].toString() ?? 0}
        ticketPrice={raffleDetails[2].toString() ?? 0}
        paymentToken={getTokenName(raffleDetails[4])}
        timebound={raffleDetails[5]}
        timestamp={Date.now().toString()}
        contractAddress={`${raffleDetails[0]}:${raffleDetails[1]}`}
        raffleOpen={raffleDetails[8]}
        raffleAddress={params.contractAddress}
      />
    </div>
  );
};

export default Page;
