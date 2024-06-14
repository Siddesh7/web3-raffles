"use client";
import React, {useEffect, useState} from "react";
import {Card} from "../ui/card";
import Image from "next/image";
import {Button} from "../ui/button";
import {Link} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {IRaffleCard} from "@/types";
import moment from "moment";
import {getNFTMetadata} from "@/lib/utils";
import BuyButton from "./raffle-buy-button";
const RaffleCard: React.FC<IRaffleCard> = ({
  key,
  name,
  ticketPrice,
  totalTickets,
  ticketsSold,
  paymentToken,
  timestamp,
  timebound,
  contractAddress,
  raffleOpen,
  winner,
  isAuctionCancelled,
  raffleAddress,
}) => {
  const [copySuccess, setCopySuccess] = useState("");
  const [nftMetadata, setNftMetadata] = useState<any>({});
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`/marketplace/${contractAddress}`);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 3000);
    } catch (err) {
      setCopySuccess("Failed to copy!");
      setTimeout(() => setCopySuccess(""), 3000);
    }
  };
  const getTimeRemaining = () => {
    const now = moment();
    const end = moment(timestamp);
    const duration = moment.duration(end.diff(now));
    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours()) - days * 24;
    const minutes = Math.floor(duration.minutes());

    let timeRemaining = "";
    if (days > 0) {
      timeRemaining += `${days} day${days > 1 ? "s" : ""} `;
    }
    if (hours > 0) {
      timeRemaining += `${hours} hr${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      timeRemaining += `${minutes} min${minutes > 1 ? "s" : ""}`;
    }

    return timeRemaining.trim();
  };

  useEffect(() => {
    const getNFTDetails = async () => {
      const nft = await getNFTMetadata(
        contractAddress.split(":")[0],
        contractAddress.split(":")[1]
      );

      setNftMetadata(nft);
    };
    getNFTDetails();
  }, []);
  return (
    <Card key={key}>
      <div className="flex flex-row gap-4 p-6 bg-gradient-to-r from-[#F7F9FF] to-[#E0E9FF]">
        <div className=" w-[100px] h-[100px] rounded-lg overflow-hidden ">
          <Image
            src={
              nftMetadata?.image?.originalUrl ??
              "https://dummyimage.com/200x200/000/fff"
            }
            alt="raffle"
            width={200}
            height={200}
            objectFit="cover"
            className="bg-black w-full h-full rounded-lg overflow-hidden object-cover"
          />
        </div>
        <div className="flex flex-col mx-4">
          <div className="flex flex-row gap-4 my-2 items-center">
            <p className="text-[20px] font-medium">{name}</p>
            <Link onClick={copyToClipboard} className="cursor-pointer" />
            {copySuccess && <div>{copySuccess}</div>}
          </div>
          <p className="text-muted-foreground text-[12px] text-[#7782A0]">
            Domain
          </p>
          <p className="text-sm font-semibold text-[#4047F2]">
            {nftMetadata?.name ?? "NFT Name"}
          </p>
        </div>
      </div>
      <div
        className={`flex w-full p-1 justify-center ${
          raffleOpen ? "bg-[#DCFFDE]" : "bg-[#ff48344c]"
        }`}
      >
        {raffleOpen ? (
          <p className="font-[700] text-[12px] text-[#17951C]">
            {timebound ? `ends in ${getTimeRemaining()}` : `Ticket Bound`}
          </p>
        ) : (
          <p className="font-[700] text-[12px] text-[#f55552]">
            {timebound ? `Ended` : `Ticket Bound`}
          </p>
        )}
      </div>
      <div className="px-6 py-4 flex flex-row">
        <div className="flex-grow">
          <p className="font-medium text-sm text-[#7782A0]">Total Tickets</p>
          <p className="text-[#5A637C] text-[24px] font-semibold">
            {totalTickets}
          </p>
        </div>
        <div className="flex-grow">
          <p className="font-medium text-sm text-[#7782A0]">Tickets Sold</p>
          <p className="text-[#5A637C] text-[24px] font-semibold">
            {ticketsSold}
          </p>
        </div>
      </div>
      <div className="px-6 ">
        <Separator />
      </div>

      <div className="flex flex-col px-6 py-4">
        <p className="font-medium text-sm text-[#7782A0]">Ticket Price</p>
        <p className="font-semibold text-[24px] text-[#5A637C]">
          {ticketPrice / 10 ** 6} ${paymentToken}
        </p>
      </div>

      <div className="p-6">
        {raffleOpen && (
          <BuyButton
            raffleAddress={raffleAddress as `0x${string}`}
            paymentToken={paymentToken}
            ticketPrice={ticketPrice.toString()}
          />
        )}

        {!raffleOpen && (
          <>
            {isAuctionCancelled ? (
              <p className="bg-[#cd8770] text-white w-full text-center flex items-center justify-center font-semibold text-md rounded-lg h-[40px]">
                Cancelled
              </p>
            ) : (
              <p className="bg-[#70cd78] text-white w-full text-center flex items-center justify-center font-semibold text-md rounded-lg h-[40px]">
                Winner: {winner?.slice(0, 6)}...{winner?.slice(-6)}
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default RaffleCard;
