import React from "react";
import { Source, Layer } from "react-map-gl";

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

  return (
    <Source data={props.data} type="geojson">
      <Layer {...dataLayer} />
    </Source>
  );
}
