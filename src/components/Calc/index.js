import moment from "moment";

function arePointsNear(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

export default function Calc(userData, initialData) {
  if (userData) {
    let recentLocations = userData.locations.filter(
      point => parseInt(point.timestampMs) > 1580508000000
    );
    //eslint-disable-next-line
    recentLocations.map(point => {
      point.Name = point.timestampMs;
      point.longitudeE7 = point.longitudeE7 / 10000000;
      point.latitudeE7 = point.latitudeE7 / 10000000;
    });
    let infectedPoints = [];

    initialData.features.map(centerPoint =>
      //eslint-disable-next-line
      recentLocations.map(comparePoint => {
        if (
          arePointsNear(
            { lat: comparePoint.latitudeE7, lng: comparePoint.longitudeE7 },
            {
              lat: centerPoint.geometry.coordinates[1],
              lng: centerPoint.geometry.coordinates[0]
            },
            0.1
          )
        ) {
          const twentyFourHours = 8.64e7;
          const threeHours = 1.08e7;

          var min24Time =
            parseInt(
              moment(centerPoint.properties.t_start)
                .add(2, "hours")
                .format("x")
            ) - twentyFourHours;
          var max24Time =
            parseInt(
              moment(centerPoint.properties.t_end)
                .add(2, "hours")
                .format("x")
            ) + twentyFourHours;
          var min3Time =
            parseInt(
              moment(centerPoint.properties.t_start)
                .add(2, "hours")
                .format("x")
            ) - threeHours;
          var max3Time =
            parseInt(
              moment(centerPoint.properties.t_end)
                .add(2, "hours")
                .format("x")
            ) + threeHours;
          var minTime = parseInt(
            parseInt(
              moment(centerPoint.properties.t_start)
                .add(2, "hours")
                .format("x")
            )
          );
          var maxTime = parseInt(
            parseInt(
              moment(centerPoint.properties.t_end)
                .add(2, "hours")
                .format("x")
            )
          );
          if (
            comparePoint.timestampMs >= minTime &&
            comparePoint.timestampMs <= maxTime
          ) {
            comparePoint.risk = 1;
          } else if (
            comparePoint.timestampMs >= min3Time &&
            comparePoint.timestampMs <= max3Time
          ) {
            comparePoint.risk = 3;
          } else if (
            comparePoint.timestampMs >= min24Time &&
            comparePoint.timestampMs <= max24Time
          ) {
            comparePoint.risk = 24;
          } else {
            comparePoint.risk = 0;
          }
          infectedPoints.push({
            compare: comparePoint,
            origin: centerPoint
          });
        }
      })
    );

    let newInfectedJson = {
      type: "FeatureCollection",
      features: []
    };
    let newOriginJson = {
      type: "FeatureCollection",
      features: []
    };
    var immediate;
    var three;
    var twentyFour;
    if (infectedPoints.length > 0) {
      //eslint-disable-next-line
      infectedPoints.map(something => {
        newInfectedJson.features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              something.compare.longitudeE7,
              something.compare.latitudeE7
            ]
          },
          properties: {
            Time: something.compare.timestampMs,
            Risk: something.compare.risk
          }
        });
        newOriginJson.features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              something.origin.geometry.coordinates[0],
              something.origin.geometry.coordinates[1]
            ]
          },
          properties: {
            id: something.origin.properties.id,
            Time: something.origin.properties.fromTime,
            toTime: something.origin.properties.toTime,
            Risk: something.compare.risk
          }
        });
      });
      immediate = infectedPoints.filter(item => item.compare.risk === 1);
      three = infectedPoints.filter(item => item.compare.risk === 3);
      twentyFour = infectedPoints.filter(item => item.compare.risk === 24);
    }
    return { immediate, three, twentyFour, newInfectedJson, newOriginJson };
  }
}
