import React, { useState, useEffect, useRef } from "react";
import MapGL, { FlyToInterpolator } from "react-map-gl";
import Points from "../Layers/Points";
//import Origins from "../../layers/Origins";
import Loader from "../Loader";
import Upload from "../Upload";
import Calc from "../Calc";
import moment from "moment";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGVlYXllZW4iLCJhIjoiY2prdTN5Y2FzMDM4NDN3bXFpanU1czlsbSJ9.P5c7yYyqwVCc_r0ECm9A8Q";
const sleep = m => new Promise(r => setTimeout(r, m));

export default function MapComponent() {
  const [viewport, setViewport] = useState({
    latitude: 32.068,
    longitude: 34.8089,
    zoom: 8,
    pitch: 0,
    bearing: 0
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);
  const [userData, setUserData] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async function() {
      /*const map = mapRef.current.getMap();
      map.on("click", "initial", function(e) {
        console.log(e);
      });*/
      await sleep(1500);
      try {
        const response = await fetch(
          `https://firedepartment.azurewebsites.net/corona`
        );
        const json = await response.json();
        let fetchedGeoJson = {
          type: "FeatureCollection",
          features: []
        };
        json.map(feature => {
          fetchedGeoJson.features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [feature.lon, feature.lat]
            },
            properties: {
              ...feature
            }
          });
        });
        setLoading(false);
        setInitialData(fetchedGeoJson);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    })();
  }, []);
  useEffect(() => {
    const calc = Calc(userData, initialData);
  }, [userData]); // eslint-disable-line

  const flyTo = ({ longitude, latitude, zoom }) => {
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom: zoom,
      transitionInterpolator: new FlyToInterpolator({ speed: 3 }),
      transitionDuration: "auto"
    });
  };

  return (
    <MapGL
      ref={mapRef}
      {...viewport}
      width="100%"
      height="100vh"
      mapStyle="mapbox://styles/deeayeen/ck2vmupbl02nd1cqv5nipadw2?optimize=true"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {loading && <Loader error={error} loading={loading} />}
      {!loading && <Upload setUserData={setUserData} />}
      <Points data={initialData} flyTo={flyTo} />
    </MapGL>
  );
}
