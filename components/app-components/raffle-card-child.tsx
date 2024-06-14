"use client";
import {RAFFLE_ABI} from "@/constants";
import React, {useEffect, useState} from "react";
import {useReadContract} from "wagmi";
import RaffleCard from "./raffle-card";
import {getTokenName} from "@/lib/utils";
interface IRaffleCardChild {
  contractAddress: `0x${string}`;
}
const RaffleCardChild: React.FC<IRaffleCardChild> = ({contractAddress}) => {
  const [raffleDetails, setRaffleDetails] = useState<any[]>([]);
  const {data: raffleInfo, error} = useReadContract({
    abi: RAFFLE_ABI,
    address: contractAddress,
    functionName: "getRaffleInfo",
  });

  useEffect(() => {
    console.log(raffleInfo);
    console.log(error);

    setRaffleDetails(raffleInfo as any[]);
  }, [raffleInfo, error]);
  return (
    <div>
      {raffleDetails && raffleDetails.length > 0 && (
        <RaffleCard
          key={contractAddress}
          name={raffleDetails[10] ?? "Unknown"}
          totalTickets={raffleDetails[3].toString() ?? 0}
          ticketsSold={raffleDetails[6].toString() ?? 0}
          ticketPrice={raffleDetails[2].toString() ?? 0}
          paymentToken={getTokenName(raffleDetails[4])}
          timebound={raffleDetails[5]}
          timestamp={Date.now().toString()}
          contractAddress={`${raffleDetails[0]}:${raffleDetails[1]}`}
          raffleOpen={raffleDetails[8]}
          winner={raffleDetails[11]}
          isAuctionCancelled={raffleDetails[9]}
        />
      )}
    </div>
  );
};

export default RaffleCardChild;
