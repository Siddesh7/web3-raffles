import {
  getTokenAddress,
  RAFFLE_FACTORY_ABI,
  RAFFLE_FACTORY_ADDRESS,
} from "@/constants";
import {IUserInputCreateRaffle} from "@/types";
import {Check} from "lucide-react";
import React, {useEffect} from "react";
import {Button} from "react-day-picker";
import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";
interface ICreateRaffleCard {
  onSuccess: () => void;
  txData: IUserInputCreateRaffle;
}
const CreateRaffleCard: React.FC<ICreateRaffleCard> = ({onSuccess, txData}) => {
  const {writeContract, data, status, isPending, error} = useWriteContract();

  const createRaffle = async () => {
    console.log({
      abi: RAFFLE_FACTORY_ABI,
      address: RAFFLE_FACTORY_ADDRESS,
      functionName: "deployRaffle",
      args: [
        txData.domain.contract.address,
        txData.domain.metadata.tokenId,
        txData.price * 10 ** 6,
        txData.totalTickets,
        true,
        getTokenAddress(txData.paymentToken),
        txData.name,
      ],
    });
    writeContract({
      abi: RAFFLE_FACTORY_ABI,
      address: RAFFLE_FACTORY_ADDRESS,
      functionName: "deployRaffle",
      args: [
        txData.domain.contract.address,
        txData.domain.metadata.tokenId,
        txData.price * 10 ** 6,
        txData.totalTickets,
        true,
        getTokenAddress(txData.paymentToken),
        txData.name,
      ],
    });
  };
  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    console.log("status", status);
    console.log("error", error);
    console.log("isSuccess", isSuccess);
    console.log("isLoading", isLoading);
    console.log("isPending", isPending);
  }, [status, error, isSuccess, isLoading, isPending]);
  useEffect(() => {
    createRaffle();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
      window.location.href = `${process.env.NEXT_PUBLIC_HOST}/profile/raffles`;
    }
  }, [status, isSuccess]);
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="animate-pulse bg-[#D1DDFF] rounded-full h-60 w-60 flex items-center justify-center">
        <div className="animate-pulse bg-primary/40 rounded-full h-40 w-40"></div>
      </div>

      <p className="font-semibold text-4xl text-[#1F2968] text-center">
        Raffle Approved
      </p>
      {isSuccess && (
        <div>
          <div className="animate-pulse bg-[#D1DDFF] rounded-full h-60 w-60 flex items-center justify-center">
            <div className="animate-pulse bg-primary/40 rounded-full h-40 w-40">
              <Check className="text-primary" />
            </div>
          </div>

          <p className="font-semibold text-4xl text-[#1F2968] text-center">
            Raffle Created
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateRaffleCard;
