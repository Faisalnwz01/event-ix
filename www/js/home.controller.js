(function () {
  'use strict';
  angular
    .module('starter.controllers')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($log, DataService) {
    var self = this;

    // list of `airportCode` value/display objects
    self.airportCode = DataService.airportCode;
    self.events = DataService.events;
    self.selectedDepartureChange = selectedDepartureChange;
    self.searchDepartureChange = searchDepartureChange;
    self.selectedArrivalChange = selectedArrivalChange;
    self.searchArrivalChange = searchArrivalChange;
    self.selectedEventChange = selectedEventChange;
    self.newState = newState;
    self.searchForFlights = searchForFlights;
    self.legsLookup = legsLookup;

    self.selectedEventIte = {}

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    function searchDepartureChange(text) {
      $log.info('Departure changed to ' + text);
    }

    function selectedDepartureChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function searchArrivalChange(text) {
      $log.info('Arrival changed to ' + text);
    }

    function selectedArrivalChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function searchForFlights() {
      console.log(self.departureAirport, self.arrivalAirport, self.selectedDate);
      DataService.searchForFlights(self.departureAirport, self.arrivalAirport, self.selectedDate);
    }

    function selectedEventChange(item) {
      $log.log(item)
      self.selectedEventIte = {
        flights: [],
        hotels: []
      }
      DataService.searchForHotels(item.location.lat + ',' +item.location.long, item.dates.from, item.dates.to)
      .then(function (searchHotel) {
        //.hotelList
        searchHotel.hotelList.forEach(function (hotel) {
          DataService.priceForHotels(hotel.hotelId, item.dates.from, item.dates.to)
          .then(function (hotelWithPrice) {
            self.selectedEventIte.hotels.push(hotelWithPrice);
          })
        })
      })
      DataService.lookUpAirportByLatLong(item.location.lat, item.location.long)
        .then(function (airport) {
          // console.log(airport[0].tags.iata.airportCode.value, 'fund');
          DataService.searchForFlights('JFK', airport[0].tags.iata.airportCode.value, item.dates.from)
            .then(function (flights) {
              self.selectedEventIte.flights = flights;
              console.log(flights, 'here are the flights we can take')
            })
        })
    }

    function legsLookup(id, response) {
      var property = '';
      self.selectedEventIte.flights.legs.forEach(function (leg) {
        if(leg.legId === id){
          property = leg.segments[0][response];
        }
      })
      return property;
    }


  }
})();
