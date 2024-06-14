import {UD_POLYGON_CONTRACT_ADDRESS} from "@/constants";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function getNFTMetadata(contractAddress: string, tokenId: string) {
  return fetch(
    `https://polygon-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}&refreshCache=false`
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching NFT metadata:", error);
      throw error;
    });
}
export function getTokenName(tokenAddress: string) {
  const tokenNames: {[key: string]: string} = {
    "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359": "USDC",
  };
  return tokenNames[tokenAddress] || "Unknown Token";
}

export const getNFTs = async (owner: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL}/getNFTsForOwner/?owner=${owner}`
  );
  const resJson = await res.json();

  const ownedNFTs = resJson.ownedNfts;
  let domains: any[] = [];
  if (ownedNFTs.length > 0) {
    for (const nft of ownedNFTs) {
      if (
        nft.contract.address.toLowerCase() ===
        UD_POLYGON_CONTRACT_ADDRESS.toLowerCase()
      ) {
        domains.push(nft);
      }
    }
  }
  return domains;
};
