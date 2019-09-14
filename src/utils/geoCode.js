const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoia3VtdWQxMiIsImEiOiJjanpqcXN2em8wY3RmM2VwZWEycmhwdHBqIn0.DfR4QZRmdck7Q-c7JEiAZw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Something Went Wrong!", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find a location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;