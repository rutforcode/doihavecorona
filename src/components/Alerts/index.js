import React, { useState } from "react";
import Card from "./Card";

export default function Alerts(props) {
  const { immediate, three, twentyFour, flyTo } = props;
  const [selected, setSelected] = useState(null);

  var uniqueImmediate =
    immediate &&
    immediate.filter(
      (v, i, a) =>
        a.findIndex(t => t.origin.properties.id === v.origin.properties.id) ===
        i
    );
  var uniqueThree =
    three &&
    three.filter(
      (v, i, a) =>
        a.findIndex(t => t.origin.properties.id === v.origin.properties.id) ===
        i
    );
  var uniqueTwentyFour =
    twentyFour &&
    twentyFour.filter(
      (v, i, a) =>
        a.findIndex(t => t.origin.properties.id === v.origin.properties.id) ===
        i
    );

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        overflowY: "auto",
        height: "100vh"
      }}
    >
      {uniqueImmediate &&
        uniqueImmediate.map(item => (
          <Card
            key={Math.random()}
            type="immediate"
            item={item}
            flyTo={flyTo}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      {uniqueThree &&
        uniqueThree.map(item => (
          <Card
            key={Math.random()}
            type="three"
            item={item}
            flyTo={flyTo}
            selected={selected}
            setSelected={setSelected}
          />
        ))}

      {uniqueTwentyFour &&
        uniqueTwentyFour.map(item => (
          <Card
            key={Math.random()}
            type="twentyFour"
            item={item}
            flyTo={flyTo}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </div>
  );
}
