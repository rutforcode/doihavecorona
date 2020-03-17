import React from "react";
import { Source, Layer } from "react-map-gl";

const metersToPixelsAtMaxZoom = (meters, latitude) =>
  meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

export default function Points(props) {
  const dataLayer = {
    id: props.infected ? "infected" : "origin",
    type: "symbol",
    layout: {
      "icon-image": {
        property: "Risk",
        stops: [
          [0, ""],
          [1, "fire-station-15"]
        ]
      },
      "text-field": ["get", "title"],
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top",
      "icon-allow-overlap": true
    }
  };

  const dataLayer2 = {
    id: props.infected ? "infected33" : "origin33",
    type: "circle",
    paint: {
      "circle-radius": {
        base: 1.75,
        stops: [
          [0, 0],
          [20, metersToPixelsAtMaxZoom(100, 31)]
        ]
      },
      "circle-color": "#ff0000",
      "circle-opacity": 0.5
    }
  };

  const myLayer = props.infected ? dataLayer : dataLayer2;

  return (
    <Source data={props.data} type="geojson">
      <Layer {...myLayer} />
    </Source>
  );
}
