import {RAFFLE_FACTORY_ADDRESS, UD_POLYGON_CONTRACT_ADDRESS} from "@/constants";
import React, {useEffect} from "react";
import {erc721Abi} from "viem";
import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";
interface IApproveDomainCard {
  tokenId: string;
  onApprove: () => void;
  type?: "ERC20" | "ERC721";
  contractAddress?: string;
  spender?: string;
  allowance?: string | number;
}
const ApproveDomainCard: React.FC<IApproveDomainCard> = ({
  tokenId,
  onApprove,
  type,
  contractAddress,
  spender,
  allowance,
}) => {
  const {writeContract, data, status, isPending, error} = useWriteContract();

  const approveToken = async () => {
    console.log({
      abi: erc721Abi,
      address:
        type === "ERC20"
          ? (contractAddress as any)
          : UD_POLYGON_CONTRACT_ADDRESS,
      functionName: "approve",
      args:
        type === "ERC20"
          ? [spender as any, BigInt(allowance as string)]
          : [RAFFLE_FACTORY_ADDRESS, BigInt(tokenId)],
      chainId: 137,
    });
    writeContract({
      abi: erc721Abi,
      address:
        type === "ERC20"
          ? (contractAddress as any)
          : UD_POLYGON_CONTRACT_ADDRESS,
      functionName: "approve",
      args:
        type === "ERC20"
          ? [spender as any, BigInt(allowance as string)]
          : [RAFFLE_FACTORY_ADDRESS, BigInt(tokenId)],
      chainId: 137,
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
    approveToken();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      onApprove && onApprove();
    }
  }, [status, isSuccess]);

  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="animate-pulse bg-[#D1DDFF] rounded-full h-60 w-60 flex items-center justify-center">
        <div className="animate-pulse bg-primary/40 rounded-full h-40 w-40"></div>
      </div>

      <p className="font-semibold text-4xl text-[#1F2968] text-center">
        {isSuccess && `Transaction Approved!`}
        {isLoading && "Loading"}
        {isPending && "Approve Transaction in wallet"}
      </p>
    </div>
  );
};

export default ApproveDomainCard;
