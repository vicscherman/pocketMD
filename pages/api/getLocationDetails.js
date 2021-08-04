export const getContactDetails = (address) => {
  var request = {
    query: address,
    fields: ['place_id'],
  };

  var callback = (results, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place.place_id);
        getPlaceDetails(place.place_id);
      }
      return place.place_id;
    }
  };

  var service = new google.maps.places.PlacesService(
    document.createElement('div')
  );
  service.textSearch(request, callback);
};

export const getPlaceDetails = async (id) => {
  var request = {
    placeId: id,
    fields: [
      'name',
      'formatted_phone_number',
      'website',
      'international_phone_number',
    ],
  };

  const callback = (place, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(
        place.name || 'no details available',
        place.formatted_phone_number || 'no details available',
        place.international_phone_number || 'no details available',
        place.website || 'no details available'
      );
      alert(
        (place.name || ' no details available ,') + 
          (place.formatted_phone_number || ' no details available ') + 
          (place.website || ' no details available')
      );
    }
  };

  var service = new google.maps.places.PlacesService(
    document.createElement('div')
  );
  service.getDetails(request, callback);
};
