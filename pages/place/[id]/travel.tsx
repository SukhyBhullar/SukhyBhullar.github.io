import React from "react";
import MainLayout from "../../../components/layout/mainLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getAllPlaces, getAllSolarSystems } from "../../../data/cmsData";

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
            <Link href={`/place/${travel._id}/`}>
              <div className="btn btn-primary">Travel</div>
            </Link>
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
