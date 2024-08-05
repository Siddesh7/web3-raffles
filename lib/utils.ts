import {UD_POLYGON_CONTRACT_ADDRESS} from "@/constants";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function getNFTMetadata(contractAddress: string, tokenId: string) {
  const apiUrl = `https://api.unstoppabledomains.com/metadata/${tokenId}`;
  const data = await fetch(apiUrl, {
    headers: {
      Authorization: "Bearer vmyevtishk7lkofn7yur0inyeg9fhx5m2aowxjkglrsbh6kp",
    },
  }).then((res) => res.json());

  console.log("data", data);
  return data;
}
export function getTokenName(tokenAddress: string) {
  const tokenNames: {[key: string]: string} = {
    "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359": "USDC",
  };
  return tokenNames[tokenAddress] || "Unknown Token";
}

export const getNFTs = async (owner: string) => {
  const apiUrl = `https://api.unstoppabledomains.com/resolve/domains?owners=${owner}`;
  const data = await fetch(apiUrl, {
    headers: {
      Authorization: "Bearer vmyevtishk7lkofn7yur0inyeg9fhx5m2aowxjkglrsbh6kp",
    },
  }).then((res) => res.json());
  const nftsData = await Promise.all(
    data.data.map(async (nft: any) => {
      return {
        domain: nft.id,
        tokenId: nft.attributes.meta.tokenId,
        image: await getNftImage(nft.id),
      };
    })
  );
  console.log("nftsData", nftsData);
  return nftsData;
};

export const getNftImage = async (domain: string) => {
  const apiUrl = `https://api.unstoppabledomains.com/metadata/${domain}`;
  const data = await fetch(apiUrl, {
    headers: {
      Authorization: "Bearer vmyevtishk7lkofn7yur0inyeg9fhx5m2aowxjkglrsbh6kp",
    },
  }).then((res) => res.json());

  console.log("data", data);
  return data.image;
};
