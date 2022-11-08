import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import MainLayout from "../../components/layout/mainLayout";
import { CreateGameDto } from "../api/games";

type Props = {};

const CreateGame = (props: Props) => {

  const [charName, setCharName] = useState("");
  const mutation = useMutation({
    mutationFn: (game: CreateGameDto) => {
      return axios.post('/api/games', game)
    }
  })

  const handleCreate = () => {
    mutation.mutate({ name: charName})
  }

  return (
    <MainLayout>
    <div className="mx-auto my-auto w-96 h-screen flex flex-col justify-center">
      <div className="flex flex-col rounded boxborder p-7 gap-6">
        <div className="mx-auto">
          <h2 className="text-xl font-bold text-white">Create Game</h2>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <label className="label-text">Name</label>
          <input 
            onChange={(e) => setCharName(e.target.value)}
            type="text"
            className="input input-bordered w-full max-w-xs"
          ></input>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>Create New Game</button>
      </div>
    </div>
    </MainLayout>
  );
};

export default CreateGame;
