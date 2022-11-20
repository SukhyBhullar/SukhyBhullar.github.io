import { createClient, groq } from "next-sanity";

const projectId = "0vbyeodx"; //process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = "production"; // process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const apiVersion = "2022-11-16"; // process.env.NEXT_PUBLIC_SANITY_API_VERSION // "2022-11-16"

const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: typeof document !== "undefined", // server-side is statically generated, the CDN is only necessary beneficial if queries are called on-demand
});

type Places =
  | [
      {
        _id: string;
      }
    ];

let allPlaces: Places | null = null;

export const getAllPlaces = async (): Promise<Places> => {
  if (allPlaces === null) {
    console.log("fetched places");
    allPlaces = await client.fetch(groq`*[_type == "places"]`);
  }
  return allPlaces!;
};

type SolarSystem =
  | [
      {
        _id: string;
        places: [{ _ref: string }];
      }
    ];

let allSolarSystems: SolarSystem | null = null;

export const getAllSolarSystems = async (): Promise<SolarSystem> => {
  if (allSolarSystems === null) {
    console.log("fetched solarSystems");
    allSolarSystems = await client.fetch(groq`*[_type == "solarSystem"]`);
  }
  return allSolarSystems!;
};
