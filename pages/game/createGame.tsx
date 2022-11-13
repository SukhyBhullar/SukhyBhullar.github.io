import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import MainLayout from "../../components/layout/mainLayout";
import { useRouter } from "next/router";
import LabeledTextbox from "../../components/common/labeledTextbox";
import { Game } from "../../domain/games";
import CenteredBox from "../../components/common/centeredBox";

type Props = {};

const CreateGame = (props: Props) => {
  const router = useRouter();
  const [callSign, setCallSign] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const mutation = useMutation({
    mutationFn: async (game: Game) => {
      const newGame = await axios.post("/api/games", game);
      router.push(newGame.data.id);
    },
  });

  const handleCreate = () => {
    mutation.mutate({
      callSign: callSign,
      firstName: firstName,
      lastName: lastName,
    });
  };

  return (
    <MainLayout>
      <CenteredBox className="w-96">
        <div className="mx-auto">
          <h2 className="text-xl font-bold text-white">Create Game</h2>
        </div>
        <LabeledTextbox
          label="Call Sign"
          onChange={(e) => setCallSign(e.target.value)}
        />
        <LabeledTextbox
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <LabeledTextbox
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          Create New Game
        </button>
      </CenteredBox>
    </MainLayout>
  );
};

export default CreateGame;
