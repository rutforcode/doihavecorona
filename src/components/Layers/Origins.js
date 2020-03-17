import React from "react";
import { Source, Layer } from "react-map-gl";

const metersToPixelsAtMaxZoom = (meters, latitude) =>
  meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

export default function Origins(props) {
  var uniqueFeatures = props.data.features.filter(
    (v, i, a) => a.findIndex(t => t.properties.id === v.properties.id) === i
  );
  props.data.features = uniqueFeatures;

  const dataLayer = {
    id: props.infected ? "infected" : "origin",
    type: "circle",
    paint: {
      "circle-radius": {
        base: 1.75,
        stops: [
          [0, 0],
          [20, metersToPixelsAtMaxZoom(100, 31)]
        ]
      },
      "circle-color": {
        property: "Risk",
        stops: [
          [0, "#000000"],
          [1, "#ff0000"],
          [3, "#ff0000"],
          [24, "#ffae42"]
        ]
      },
      "circle-opacity": {
        property: "Risk",
        stops: [
          [0, 0],
          [1, 0.5]
        ]
      }
    }
  };
  const dataLayer2 = {
    id: props.infected ? "infected2" : "origin2",
    type: "symbol",
    layout: {
      "icon-image": {
        property: "Risk",
        stops: [
          [0, ""],
          [1, "marker-15"]
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
      <Layer {...dataLayer2} />
    </Source>
  );
}
