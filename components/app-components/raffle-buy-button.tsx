"use client";
import React, {useEffect, useState} from "react";
import {erc20Abi} from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {toast} from "../ui/use-toast";
import {Button} from "../ui/button";
import {getTokenAddress, RAFFLE_ABI} from "@/constants";
import {Card} from "../ui/card";
import {ShoppingCart, X} from "lucide-react";
import ApproveDomainCard from "./approve-domain";

interface BuyButtonProps {
  raffleAddress: `0x${string}`;
  paymentToken: string;
  ticketPrice: string;
}
const BuyButton: React.FC<BuyButtonProps> = ({
  raffleAddress,
  paymentToken,
  ticketPrice,
}) => {
  const {writeContract, data, status, isPending, error, failureReason} =
    useWriteContract();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const buyTicket = async () => {
    writeContract({
      abi: RAFFLE_ABI,
      address: raffleAddress,
      functionName: "buyTicket",
      chainId: 137,
    });
  };

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Successfully bought ticket",
        description: "Check your profile to view your ticket",
      });
    }
    if (error) {
      console.log("error", error);
      if (
        error?.message.includes(
          "Insufficient token spend allowance to buy a ticket"
        )
      ) {
        toast({
          title: "Insufficient token spend allowance to buy a ticket",
          description:
            "Please Provide token spend allowance before proceeding.",
          variant: "destructive",
        });
      } else
        toast({
          title: "Something went wrong.",
          variant: "destructive",
        });
    }
  }, [status, isSuccess, error]);
  return (
    <section>
      {showTransactionModal && (
        <div className="fixed inset-0 z-50 backdrop-filter backdrop-blur-lg bg-[rgba(215,210,210,0.5)] flex justify-center items-center">
          {" "}
          <Card className="w-[600px] h-[700px] p-8 flex flex-col overflow-x-hidden relative rounded-2xl">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowTransactionModal(false)}
            />
            <div className="flex flex-col gap-4 h-full items-center justify-center">
              <ApproveDomainCard
                type={"ERC20"}
                contractAddress={getTokenAddress(paymentToken)}
                allowance={ticketPrice}
                spender={raffleAddress}
                onApprove={() => {
                  buyTicket();
                  setShowTransactionModal(false);
                }}
                tokenId={""}
              />
            </div>
          </Card>
        </div>
      )}
      <Button
        className="bg-[#4047F2] hover:bg-[#4046f2e1] text-white w-full font-semibold text-md rounded-lg h-[40px]"
        onClick={() => {
          setShowTransactionModal(true);
        }}
      >
        Buy Ticket
      </Button>
    </section>
  );
};

export default BuyButton;
