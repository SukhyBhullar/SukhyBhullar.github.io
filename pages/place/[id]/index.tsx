import React from "react";
import MainLayout from "../../../components/layout/mainLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getAllPlaces } from "../../../data/cmsData";

type Props = {
  _id: string;
  name: string;
  subTitle: string;
  travelAction: {
    buttonText: string;
    subTitle: string;
    travelText: string;
  };
};

const PlaceRoot = (props: Props) => {
  return (
    <MainLayout>
      <div className="container p-4">
        <div className="text-2xl font-bold text-white mb-2">{props.name}</div>
        <div className="mb-4">{props.subTitle}</div>
        <div className="flex flex-row justify-between items-center rounded-xl boxborder p-7 gap-6 w-2/3">
          <p className="text-xl">{props.travelAction.travelText}</p>
          <Link href={`/place/${props._id}/travel/`}>
            <div className="btn btn-primary">
              {props.travelAction.buttonText}
            </div>
          </Link>
        </div>
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
  const data = await getAllPlaces();
  const place = data.filter((x) => x._id === id)[0];
  return {
    // Passed to the page component as props
    props: { ...place },
  };
};
export default PlaceRoot;
