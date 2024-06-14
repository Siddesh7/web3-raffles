"use client";
import CreateRaffleModal from "@/components/app-components/create-raffle-modal";
import {useState} from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal && (
        <CreateRaffleModal
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
