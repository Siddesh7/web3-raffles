export interface IRaffleCard {
  key: number | string;
  name: string;

  totalTickets: number;
  ticketsSold: number;
  ticketPrice: number;
  paymentToken: string;
  timestamp: string;
  timebound: boolean;
  contractAddress: string;
  raffleOpen: boolean;
  winner?: string;
  isAuctionCancelled?: boolean;
  raffleAddress?: string;
  profile?: boolean;
}

export interface ICreateRaffleModal {
  onClose: () => void;
}

export interface IUserInputCreateRaffle {
  section: number;
  domain: any;
  name: string;
  contractAddress: string;
  totalTickets: number;
  paymentToken: string;
  price: number;
  endDate: Date;
  timeBound: boolean;
  agreedToTerms: boolean;
}
