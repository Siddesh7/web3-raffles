import React, {useEffect} from "react";

import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";

import {Button} from "../ui/button";
import {title} from "process";
import {RAFFLE_ABI} from "@/constants";
import {Toast} from "../ui/toast";
import {toast} from "../ui/use-toast";
interface PickWinnerButtonProps {
  raffleAddress: `0x${string}`;
  style?: string;
}
const PickWinnerButton: React.FC<PickWinnerButtonProps> = ({
  raffleAddress,
  style,
}) => {
  const {writeContract, data, status, isPending, error, failureReason} =
    useWriteContract();
  const pickWinner = async () => {
    writeContract({
      abi: RAFFLE_ABI,
      address: raffleAddress,
      functionName: "pickWinner",
    });
  };

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Winner picked successfully",
      });
    }
    if (error) {
      if (error?.message.includes("not sold enough")) {
        toast({
          title: "You cannot pick a winner until all tickets are sold",
          variant: "destructive",
        });
      } else
        toast({
          title: "Error Picking winner",
          variant: "destructive",
        });
    }
  }, [status, isSuccess, error]);
  return (
    <Button
      className="text-md"
      onClick={pickWinner}
      disabled={isPending || isLoading || isSuccess}
    >
      {isPending ? (
        <div className="flex flex-row justify-center items-center gap-2">
          <span>Sign in wallet</span>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : isLoading ? (
        <div className="flex flex-row justify-center items-center gap-2">
          <span>Loading</span>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <p> {isSuccess ? "Tx Sent " : "Pick Winner"}</p>
      )}
    </Button>
  );
};

export default PickWinnerButton;
