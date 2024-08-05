import React, {useEffect} from "react";

import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";

import {Button} from "../ui/button";
import {RAFFLE_ABI} from "@/constants";
import {toast} from "../ui/use-toast";
interface CancelRaffleButtonProps {
  raffleAddress: `0x${string}`;
  style?: string;
}
const CancelRaffleButton: React.FC<CancelRaffleButtonProps> = ({
  raffleAddress,
  style,
}) => {
  const {writeContract, data, status, isPending, error, failureReason} =
    useWriteContract();
  const cancelRaffle = async () => {
    writeContract({
      abi: RAFFLE_ABI,
      address: raffleAddress,
      functionName: "cancelAuctionAndWithdrawNFT",
    });
  };

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Raffle cancelled successfully",
      });
    }
    if (error) {
      toast({
        title: "Error cancelling raffle",
        variant: "destructive",
      });
    }
  }, [status, isSuccess, error]);
  return (
    <Button
      className={`text-md ${style}`}
      onClick={cancelRaffle}
      disabled={isPending || isLoading || isSuccess}
      variant={"secondary"}
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
        <p> {isSuccess ? "Tx Sent " : "Cancel Raffle"}</p>
      )}
    </Button>
  );
};

export default CancelRaffleButton;
