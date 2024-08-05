"use client";
import React, {useEffect, useState} from "react";
import {Card} from "../ui/card";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {Checkbox} from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {format, set} from "date-fns";
import {Calendar as CalendarIcon, CircleCheckBig} from "lucide-react";

import {cn, getNftImage, getNFTs} from "@/lib/utils";

import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import Image from "next/image";
import {ArrowLeft, SendToBackIcon, StepBack, X} from "lucide-react";
import {ICreateRaffleModal, IUserInputCreateRaffle} from "@/types";
import {useAccount} from "wagmi";
import {usePrivy} from "@privy-io/react-auth";
import {Skeleton} from "../ui/skeleton";
import ApproveDomainCard from "./approve-domain";
import CreateRaffleCard from "./create-raffle-card";

const CreateRaffleModal: React.FC<ICreateRaffleModal> = ({onClose}) => {
  const {address} = useAccount();
  const {user} = usePrivy();
  const [search, setSearch] = useState("");
  const [userInput, setUserInput] = useState<IUserInputCreateRaffle>({
    section: 0,
    domain: "",
    name: "",
    contractAddress: "",
    totalTickets: 0,
    paymentToken: "USDC",
    price: 0,
    endDate: new Date(),
    timeBound: false,
    agreedToTerms: false,
  });
  const [userDomains, setUserDomains] = useState<any[]>([]);
  const [filteredDomains, setFilteredDomains] = useState<any[]>([]);
  const [domainsLoader, setDomainsLoader] = useState(true);
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) return;
      setDomainsLoader(true);
      const result = await getNFTs(address);

      setUserDomains(result);
      setFilteredDomains(result);
      setDomainsLoader(false);
    };

    fetchNFTs();
  }, [address, user]);

  useEffect(() => {
    const filteredDomains = userDomains.filter((domain) => {
      return (
        domain.domain.toLowerCase().includes(search.toLowerCase()) ?? false
      );
    });
    filteredDomains.length > 0 && setFilteredDomains(filteredDomains);
    if (search === "") {
      setFilteredDomains(userDomains);
    }
  }, [search]);
  return (
    <main className="backdrop-filter backdrop-blur-lg bg-[rgba(215,210,210,0.5)] flex justify-center items-center h-screen  overflow-x-hidden w-[96vw] m-auto">
      <Card className="w-[600px] h-[700px] p-8 flex flex-col overflow-x-hidden relative rounded-2xl">
        <X
          className="absolute right-4 top-4 cursor-pointer"
          onClick={onClose}
        />
        {userInput.section === 0 && (
          <div className="flex flex-col flex-grow">
            <p className="font-semibold text-[22px] mt-4 text-[#1A1F2E]">
              Create a Raffle
            </p>
            <p className="font-medium text-[20px] text-[#818DAC] py-4">
              Choose domain to raffle
            </p>
            <Input
              type="text"
              placeholder="search your domain"
              className="rounded-lg bg-[#F7F9FF] h-[44px] w-full  text-[#818DAC] font-[400] text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="my-2 max-h-[400px] overflow-y-auto">
              {filteredDomains.map((domain, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row gap-4 py-4 items-center hover:bg-gray-100 cursor-pointer rounded-lg"
                    onClick={() => {
                      setUserInput({
                        ...userInput,
                        domain: domain,
                      });
                    }}
                  >
                    <div className="max-w-[80px] max-h-[80px] overflow-hidden px-2">
                      <Image
                        src={
                          domain.image ?? "https://dummyimage.com/80x80/000/fff"
                        }
                        alt="logo"
                        width={80}
                        height={80}
                        className="rounded-lg overflow-hidden object-cover"
                      />
                    </div>
                    <div className="w-full flex flex-row justify-between items-center px-2">
                      <div className="flex flex-col">
                        <p className="font-semibold text-lg text-[#4047F2]">
                          {domain.domain ?? "Unknown Domain"}
                        </p>
                        <p className="font-medium text-sm text-[#7782A0]">
                          Polygon
                        </p>
                      </div>
                      {userInput.domain?.tokenId === domain.tokenId && (
                        <div className="flex-end justify-end pr-2">
                          <CircleCheckBig className="text-[#4047F2]" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>{" "}
            {domainsLoader && (
              <div className="my-2 max-h-[400px] w-full overflow-y-auto">
                <div className="flex flex-row gap-4 py-4 items-center hover:bg-gray-100 cursor-pointer rounded-lg w-full">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>{" "}
                <div className="flex flex-row gap-4 py-4 items-center hover:bg-gray-100 cursor-pointer rounded-lg w-full">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex flex-row gap-4 py-4 items-center hover:bg-gray-100 cursor-pointer rounded-lg w-full">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex flex-row gap-4 py-4 items-center hover:bg-gray-100 cursor-pointer rounded-lg w-full">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            )}
            <Button
              className="mt-auto bg-[#4047F2] hover:bg-[#4046f2e1] text-white w-full font-semibold text-md rounded-lg h-[40px] "
              onClick={() => {
                if (userInput.domain == "") {
                  alert("Please select a domain to proceed");
                  return;
                }
                setUserInput({...userInput, section: userInput.section + 1});
              }}
            >
              Next
            </Button>
          </div>
        )}

        {userInput.section === 1 && (
          <div className="flex flex-col flex-grow">
            <p className="font-semibold text-[22px] mt-4 text-[#1A1F2E]">
              Create a Raffle
            </p>
            <section className="flex flex-row justify-evenly w-full gap-10 mt-8">
              <div className="flex flex-col w-[45%]">
                <div
                  className="flex flex-row gap-2 cursor-pointer"
                  onClick={() => {
                    console.log("clicked");
                    setUserInput({
                      ...userInput,
                      section: userInput.section - 1,
                    });
                  }}
                >
                  <ArrowLeft className="text-[#818DAC]" />
                  <p className="text-[#818DAC] text-md font-medium">Go back</p>
                </div>
                <div className="flex flex-col gap-4 mt-16 justify-center items-center">
                  <Image
                    src={
                      userInput.domain?.image ??
                      "https://dummyimage.com/80x80/000/000"
                    }
                    alt="logo"
                    width={140}
                    height={140}
                    className="rounded-lg overflow-hidden object-cover"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-[#4047F2] text-lg font-semibold text-center">
                      {userInput.domain?.domain ?? "Unknown Domain"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-7 w-full mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    className="peer bg-[#ffffff] focus:border-[#4047F2] h-[58px] px-[16px] py-[10px] pt-6 rounded-lg font-normal text-[#5A637C] text-md "
                    value={userInput.name}
                    onChange={(e) =>
                      setUserInput({...userInput, name: e.target.value})
                    }
                    required
                  />
                  <span
                    className={`absolute top-2 left-[16px] text-[#5E6366] font-normal text-xs peer-focus:text-[#4047F2]`}
                  >
                    Raffle Name
                  </span>
                </div>
                <div className="relative ">
                  <Input
                    type="text"
                    pattern="[0-9]*"
                    className=" peer bg-[#ffffff]  focus:border-[#4047F2] h-[58px]  px-[16px] py-[10px] pt-6 rounded-lg font-normal  text-[#5A637C]  text-md "
                    value={userInput.totalTickets}
                    onChange={(e) => {
                      if (e.target.value.match(/^[0-9]*$/))
                        setUserInput({
                          ...userInput,
                          totalTickets: Number(e.target.value),
                        });
                    }}
                    required
                  />

                  <span className="absolute top-2 left-[16px] text-[#5E6366] peer-focus:text-[#4047F2] font-normal text-xs ">
                    Total Tickets
                  </span>
                </div>{" "}
                <div className="flex flex-row gap-4">
                  <div className="relative ">
                    <Select
                      onValueChange={(e) => {
                        setUserInput({...userInput, paymentToken: e});
                      }}
                      defaultValue={userInput.paymentToken}
                    >
                      <SelectTrigger className="peer bg-[#ffffff]  focus:border-[#4047F2] h-[58px]  px-[16px] py-[10px] pt-6 rounded-lg font-normal w-[140px]  text-[#5A637C]  text-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>

                    <span className="absolute top-2 left-[16px] text-[#5E6366] peer-focus:text-[#4047F2] font-normal text-xs ">
                      Payment Token
                    </span>
                  </div>{" "}
                  <div className="relative ">
                    <Input
                      type="text"
                      pattern="[0-9]*"
                      className="peer bg-[#ffffff]  focus:border-[#4047F2] h-[58px]  px-[16px] py-[10px] pt-6 rounded-lg font-normal  text-[#5A637C]  text-md "
                      value={userInput.price}
                      onChange={(e) => {
                        if (e.target.value.match(/^[0-9]*$/))
                          setUserInput({
                            ...userInput,
                            price: Number(e.target.value),
                          });
                      }}
                      required
                    />

                    <span className="absolute top-2 left-[16px] text-[#5E6366] peer-focus:text-[#4047F2] font-normal text-xs ">
                      Price per Ticket
                    </span>
                  </div>{" "}
                </div>
                <div className="relative w-full">
                  <span
                    className={`absolute top-2 left-[16px] text-[#5E6366] font-normal text-xs peer-focus:text-[#4047F2]`}
                  >
                    Raffle Closing Date
                  </span>
                  <Popover>
                    <PopoverTrigger className="w-full" asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start peer bg-[#ffffff] focus:border-[#4047F2] h-[58px] px-[16px] py-[10px] pt-6 rounded-lg font-normal text-[#5A637C] text-md",
                          !userInput.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(userInput.endDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Calendar
                        mode="single"
                        className="w-full"
                        selected={userInput.endDate}
                        onSelect={(e) => {
                          {
                            if (e) {
                              if (e < new Date()) {
                                alert("Please select a future date");
                                return;
                              }
                              setUserInput({...userInput, endDate: e});
                            }
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </section>

            <div className="flex flex-col mt-auto gap-2 items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className="active:text-[#4047F2] rounded-lg"
                  checked={userInput.agreedToTerms}
                  onClick={() =>
                    setUserInput({
                      ...userInput,
                      agreedToTerms: !userInput.agreedToTerms,
                    })
                  }
                />

                <label
                  htmlFor="terms"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#2B2F32]"
                >
                  I hereby accept the T&C of the Raffle
                </label>
              </div>
              <Button
                disabled={userInput.agreedToTerms === false}
                className="bg-[#4047F2] hover:bg-[#4046f2e1] text-white w-full font-semibold text-md rounded-lg h-[40px] "
                onClick={() => {
                  setUserInput({...userInput, section: userInput.section + 1});
                }}
              >
                Approve and Create
              </Button>
            </div>
          </div>
        )}

        {userInput.section === 2 && (
          <ApproveDomainCard
            tokenId={userInput.domain.tokenId}
            onApprove={() => {
              console.log("approved");
              setUserInput({...userInput, section: userInput.section + 1});
            }}
          />
        )}

        {userInput.section === 3 && (
          <CreateRaffleCard
            txData={userInput}
            onSuccess={() => {
              console.log("success");
            }}
          />
        )}
      </Card>
    </main>
  );
};

export default CreateRaffleModal;
