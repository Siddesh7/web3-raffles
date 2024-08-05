"use client";
import CreateRaffleModal from "@/components/app-components/create-raffle-modal";
import {useEffect, useState} from "react";
import {useAppContext} from "./context/app-context";
import Landing from "@/components/app-components/landing";

export default function Home() {
  const {showRaffleCreateModal, setShowRaffleCreateModal} = useAppContext();
  useEffect(() => {
    console.log("showRaffleCreateModal", showRaffleCreateModal);
  }, [showRaffleCreateModal]);
  return (
    <div className="h-[90vh]">
      {showRaffleCreateModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <CreateRaffleModal
            onClose={() => {
              setShowRaffleCreateModal(false);
            }}
          />
        </div>
      )}

      <Landing />
    </div>
  );
}
