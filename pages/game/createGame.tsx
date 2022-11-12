import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import MainLayout from "../../components/layout/mainLayout";
import { useRouter } from 'next/router'
import LabeledTextbox from "../../components/common/labeledTextbox";
import { Game } from "../../domain/games";

type Props = {};

const CreateGame = (props: Props) => {
  const router = useRouter()
  const [callSign, setCallSign] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const mutation = useMutation({
    mutationFn: async (game: Game) => {
      const newGame = await axios.post('/api/games', game)
      router.push(newGame.data.id)
    }
  })

  const handleCreate = () => {
    mutation.mutate({ callSign: callSign, firstName: firstName, lastName: lastName})
  }

  return (
    <MainLayout>
    <div className="mx-auto my-auto w-96 h-screen flex flex-col justify-center">
      <div className="flex flex-col rounded boxborder p-7 gap-6">
        <div className="mx-auto">
          <h2 className="text-xl font-bold text-white">Create Game</h2>
        </div>
        <LabeledTextbox label="First Name" onChange={(e) => setCallSign(e.target.value)} />
        <LabeledTextbox label="First Name" onChange={(e) => setFirstName(e.target.value)} />
        <LabeledTextbox label="Last Name" onChange={(e) => setLastName(e.target.value)} />
        <button className="btn btn-primary" onClick={handleCreate}>Create New Game</button>
      </div>
    </div>
    </MainLayout>
  );
};

export default CreateGame;
