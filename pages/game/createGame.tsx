import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import MainLayout from "../../components/layout/mainLayout";
import { useRouter } from "next/router";
import LabeledTextbox from "../../components/common/labeledTextbox";
import { Game } from "../../domain/games";
import CenteredBox from "../../components/common/centeredBox";
import Alert from "../../components/common/alert";

type Props = {};

const CreateGame = (props: Props) => {
  const router = useRouter();
  const [callSign, setCallSign] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alert, setAlert] = useState("");

  const mutation = useMutation({
    mutationFn: async (game: Game) => {
      const newGame = await axios.post("/api/games", game);
      window.sessionStorage.setItem("currentGame", newGame.data.id);
      router.push(`/place/${newGame.data.currentPlace}`);
    },
  });

  const handleCreate = () => {
    if (!callSign) {
      setAlert("Call sign needs to be filled");
      return;
    }

    if (!firstName) {
      setAlert("First Name needs to be filled");
      return;
    }

    if (!lastName) {
      setAlert("Last Name needs to be filled");
      return;
    }

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
        {alert && <Alert message={alert} />}
        <LabeledTextbox
          label="Call Sign"
          onChange={(e) => setCallSign(e.target.value)}
          maxLength={12}
        />
        <LabeledTextbox
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          maxLength={20}
        />
        <LabeledTextbox
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          maxLength={20}
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          Create New Game
        </button>
      </CenteredBox>
    </MainLayout>
  );
};

export default CreateGame;
