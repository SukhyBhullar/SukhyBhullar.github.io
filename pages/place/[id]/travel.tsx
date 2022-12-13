import React from "react";
import MainLayout from "../../../components/layout/mainLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPlaces, getAllSolarSystems } from "../../../data/cmsData";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import router from "next/router";
import { id } from "../../../domain/games";

type Props = {
  _id: string;
  name: string;
  subTitle: string;
  travelAction: {
    subTitle: string;
  };
  travelPossibilities: [
    {
      _id: string;
      name: string;
    }
  ];
};

const PlaceTravel = (props: Props) => {
  const mutation = useMutation({
    mutationFn: async (placeId: string) => {
      await axios.post<id & { place: string }>(`/api/setCurrentPlace/`, {
        id: window.sessionStorage.getItem("currentGame"),
        place: placeId,
      });
      router.push(`/place/${placeId}`);
    },
  });

  const onTravelClicked = (placeId: string) => {
    mutation.mutate(placeId);
  };

  return (
    <MainLayout>
      <div className="container p-4">
        <div className="text-2xl font-bold text-white mb-2">{props.name}</div>
        <div className="mb-4">{props.travelAction.subTitle}</div>
        {props.travelPossibilities.map((travel) => (
          <div
            key={travel.name}
            className="flex flex-row justify-between items-center rounded-xl boxborder p-7 gap-6 w-2/3"
          >
            <p className="text-xl">{travel.name}</p>
            <button
              className="btn btn-primary"
              onClick={() => onTravelClicked(travel._id)}
            >
              Travel
            </button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllPlaces();

  return {
    paths: data.map((x: { _id: string }) => ({ params: { id: x._id } })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const id = params?.id;

  const places = await getAllPlaces();
  const solarSystems = await getAllSolarSystems();

  const thisPlace = places.find((x) => x._id === id);
  const thisSystem = solarSystems.find((x) =>
    x.places.some((y) => y._ref === id)
  );

  const possibilities = thisSystem?.places
    .filter((x) => x._ref !== id)
    .map((x) => places.find((y) => x._ref === y._id));

  return {
    // Passed to the page component as props
    props: { ...thisPlace, travelPossibilities: possibilities },
  };
};
export default PlaceTravel;
