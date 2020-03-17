import React from "react";
import moment from "moment";

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function toRad(Value) {
  return (Value * Math.PI) / 180;
}

export default function Card(props) {
  return (
    <div
      key={Math.random()}
      style={{
        marginBottom: "8px",
        cursor: "pointer"
      }}
      onClick={() => {
        props.setSelected(props.item.origin.properties.id);
        props.flyTo({
          latitude: props.item.origin.geometry.coordinates[1],
          longitude: props.item.origin.geometry.coordinates[0],
          zoom: 16.5
        });
      }}
    >
      <div
        style={{
          backgroundColor:
            props.type === "immediate"
              ? "#FF0000"
              : props.type === "three"
              ? "#FF0000"
              : "#FFAE42",
          padding: "8px",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
          border:
            props.selected === props.item.origin.properties.id
              ? "3px solid white"
              : "3px solid transparent"
        }}
      >
        <div>
          <div>
            <div>An infected Corona patient was at:</div>
            <div>{props.item.origin.properties.label}</div>
          </div>
          <div>
            On{" "}
            {moment(props.item.origin.properties.t_start)
              .add(2, "hours")
              .format("MM/DD/YYYY")}
            <div>
              Between:{" "}
              {moment(props.item.origin.properties.t_start)
                .add(2, "hours")
                .format("HH:mm")}{" "}
              -{" "}
              {moment(props.item.origin.properties.t_end)
                .add(2, "hours")
                .format("HH:mm")}
            </div>
          </div>
          {/*<div>
        {moment(item.origin.properties.toTime).format("HH:mm")} -{" "}
        {moment(item.origin.properties.fromTime).format("HH:mm")}
      </div>*/}
        </div>
        <hr />
        <div>
          <div>
            You were{" "}
            {Math.round(
              calcCrow(
                props.item.compare.latitudeE7,
                props.item.compare.longitudeE7,
                props.item.origin.geometry.coordinates[1],
                props.item.origin.geometry.coordinates[0]
              ) * 100
            )}{" "}
            meters away at {""}
            {moment(parseInt(props.item.compare.timestampMs)).format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
}
