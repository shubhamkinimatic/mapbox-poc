import React, { useCallback, useMemo, useRef, useState } from "react";
import Map, {
  CircleLayer,
  Layer,
  MapRef,
  Marker,
  Popup,
  Source,
} from "react-map-gl";
import type { FeatureCollection } from "geojson";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "New York City",
        region: "Northeast",
        "yard capacity": 100000,
        area: "02.6 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-74.006, 40.7128],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Los Angeles",
        region: "West",
        "yard capacity": 50000,
        area: "1302 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-118.2576, 34.0522],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Chicago",
        region: "Midwest",
        "yard capacity": 75000,
        area: " 606 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-87.6324, 41.8781],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Houston",
        region: "South",
        "yard capacity": 25000,
        area: "1645 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-95.3677, 29.7604],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Phoenix",
        region: "West",
        "yard capacity": 50000,
        area: "1344 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-112.0719, 33.4484],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Philadelphia",
        region: "Northeast",
        "yard capacity": 75000,
        area: " 345 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-75.1636, 39.9525],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "San Antonio",
        region: "South",
        "yard capacity": 25000,
        area: "1069 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-98.4951, 29.4241],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "San Diego",
        region: "West",
        "yard capacity": 50000,
        area: " 964 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-117.1572, 32.7157],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Dallas",
        region: "South",
        "yard capacity": 25000,
        area: " 343 km²",
      },
      geometry: {
        type: "Point",
        coordinates: [-96.7898, 32.783],
      },
    },
  ],
};

const Mapbox = () => {
  const [data, setData] = useState(geojson);
  const [activeCity, setActiveCity] = useState({
    name: "Dallas",
    region: "South",
    "yard capacity": 25000,
    area: "343 km²",
  });
  const mapRef = useRef<MapRef>();

  const onSelectCity = useCallback(
    ({ longitude, latitude }: { longitude: any; latitude: any }) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: 7,
      });
    },
    []
  );

  return (
    <>
      <div className="flex justify-around">
        <div>
          {data.features.map((feature) => (
            <p
              className={`border p-2 mx-4 my-2 cursor-pointer ${
                activeCity.name === feature?.properties?.name &&
                "border-red-500"
              }`}
              onClick={() => {
                onSelectCity({
                  // @ts-ignore
                  longitude: feature.geometry?.coordinates[0],
                  // @ts-ignore
                  latitude: feature.geometry?.coordinates[1],
                });
                // @ts-ignore
                setActiveCity(feature?.properties);
              }}
              key={feature.id}
            >
              {feature?.properties?.name}
            </p>
          ))}
        </div>
        <Map
          // @ts-ignore
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1Ijoic2h1YmhhbS1raW5pbWF0aWMiLCJhIjoiY2xtN3U5YWltMDNteDNmcXVtMTI0bnIycyJ9.kopy2wYw5U9obtEI7DIk4g"
          initialViewState={{
            longitude: -95,
            latitude: 38,
            zoom: 3.5,
          }}
          style={{ width: 1000, height: 600 }}
          maxZoom={10}
          mapStyle="mapbox://styles/mapbox/light-v11"
          scrollZoom={false}
          boxZoom={false}
          dragRotate={false}
          dragPan={false}
          keyboard={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          touchPitch={false}
        >
          <Source
            id="my-data"
            type="geojson"
            data={data}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        </Map>
      </div>
      <div className="border p-4 mt-8 mx-auto max-w-xs">
        <p>name = {activeCity.name}</p>
        <p>area = {activeCity.area}</p>
        <p>region = {activeCity.region}</p>
        <p>yard capacity = {activeCity["yard capacity"]}</p>
        <p>More inventory details</p>
      </div>
    </>
  );
};

export default Mapbox;
