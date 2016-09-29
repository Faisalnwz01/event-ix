(function () {
  'use strict';

  /** Add service to the app */
  angular
    .module('starter.services', [])
    .factory('DataService', DataService);

  /** Inject the dependencies */
  DataService.$inject = ['$http'];

  /**
   * Titles service to manage the titles interactions
   *  - Resource to query and update titles
   *  - Recalculates Adjustments
   *
   * @param $resource
   * @param _
   *
   * @returns {{}}
   *
   * @constructor
   */
  function DataService($http) {
    var Service = this,
    flightsUrl = "http://terminal2.expedia.com/x/mflights/search?",
    hotelSearchUrl = "http://terminal2.expedia.com/x/mhotels/search?",
    hotelsPriceUrl = "http://terminal2.expedia.com/x/mhotels/offers?"
    Service.searchForFlights = searchForFlights;
    Service.searchForHotels = searchForHotels;
    Service.priceForHotels = priceForHotels;
    Service.lookUpAirportByLatLong = lookUpAirportByLatLong;
    Service.airportCode = ["ABR", "ABI", "CAK", "ALS", "ABY", "ALB", "ABQ", "AEX", "ABE", "AIA", "APN", "AOO", "AMA", "ANC", "ATW", "AVL", "ASE", "AHN", "ATL", "ACY", "AGS", "AUG", "AUS", "BFL", "BWI", "BGR", "BHB", "BRW", "BTR", "BPT", "BKW", "BED", "BLI", "BJI", "BET", "BTT", "BIL", "BGM", "BHM", "BIS", "BMI", "BMG", "BLF", "BOI", "BOS", "BZN", "BKX", "BRO", "BQK", "BUF", "BUR", "BRL", "BBF", "BTV", "BTM", "CGI", "CLD", "CNM", "CPR", "CID", "CMI", "CHS", "CRW", "CLT", "CHO", "CHA", "CYS", "CHI", "MDW", "CHI", "ORD", "CIC", "CVG", "CKB", "CLE", "CVN", "COD", "CLL", "COS", "COU", "CAE", "CSG", "CLU", "GTR", "OLU", "CMH", "CDV", "CRP", "DAL", "DFW", "DAY", "DAB", "DEC", "DEN", "DSM", "DTW", "DTT", "DVL", "DIK", "DLG", "DDC", "DHN", "DUJ", "DBQ", "DLH", "DRO", "DUT", "EAU", "EEK", "IPL", "ELD", "ELP", "EKO", "ELM", "WDG", "ERI", "ESC", "EUG", "ACV", "EVV", "FAI", "FAR", "FMN", "XNA", "FAY", "FLG", "FNT", "FLO", "FOD", "FLL", "TBN", "RSW", "FSM", "VPS", "FWA", "FYU", "FAT", "GNV", "GCK", "GCC", "GDV", "GFK", "GRI", "GJT", "GRR", "GBD", "GTF", "GRB", "LWB", "GSO", "GLH", "PGV", "GSP", "GPT", "GUC", "HGR", "HNM", "CMX", "HRL", "MDT", "HRO", "BDL", "HVR", "HYS", "HLN", "HIB", "Big", "HHH", "HOB", "HOM", "HNL", "MKK", "EFD", "HOU", "IAH", "EFD", "HTS", "HSV", "HON", "HYA", "IDA", "IND", "INL", "IYK", "IMT", "IWD", "ISP", "ITH", "JAC", "JAN", "MKL", "JAX", "OAJ", "JMS", "JHW", "JST", "JPR", "JLN", "JNU", "OGG", "AZO", "LUP", "FCA", "MCI", "JHM", "EAR", "ENA", "KTM", "EYW", "GRK", "AKN", "IGM", "IRK", "LMT", "TYS", "ADQ", "LSE", "LFT", "LCH", "Hll", "LNY", "LNS", "LAN", "LAR", "LRD", "LRU", "LAS", "LBE", "PIB", "LAW", "LAB", "LWS", "LEW", "LWT", "LEX", "LBL", "LIH", "LNK", "LIT", "LGB", "GGG", "QLA", "SDF", "LBB", "LYH", "MCN", "MSN", "MHT", "MHK", "MBL", "MWA", "MQT", "MVY", "MCW", "MSS", "MFE", "MCK", "MFR", "MLB", "MEM", "MEI", "MIA", "MAF", "MLS", "MKE", "MSP", "MOT", "MSO", "MOB", "MOD", "MLI", "MLU", "MRY", "MGM", "MTJ", "MGW", "MWH", "MSL", "MKG", "MRY", "ACK", "ABF", "BNA", "EWN", "HVN", "MSY", "LGA", "JFK", "NYC", "EWR", "SWF", "PHF", "OME", "ORF", "OTH", "LBF", "OAK", "OGS", "OKC", "OMA", "ONT", "SNA", "MCO", "OSH", "OWB", "OXR", "PAH", "PGA", "PSP", "PFN", "PKB", "PSC", "PLN", "PDT", "PNS", "PIA", "PHL", "PHX", "PIR", "SOP", "PIT", "PIH", "PNC", "PWM", "PDX", "PSM", "PRC", "PQI", "PVD", "PVC", "PUB", "PUW", "UIN", "RDU", "RAP", "RDD", "RDM", "RNO", "RHI", "RIC", "RIW", "ROA", "RST", "ROC", "RKS", "RFD", "RKD", "ROW", "RUT", "SMF", "MBS", "SLN", "SPY", "SLC", "SJT", "SAT", "SAN", "QSF", "SFO", "SJC", "SBP", "SDP", "SBA", "SAF", "SMX", "STS", "SLK", "SRQ", "CIU", "SAV", "BFF", "SEA", "SHD", "SHR", "SHV", "SDY", "SVC", "SUX", "FSD", "SIT", "SGY", "SBN", "GEG", "SPI", "CEF", "SGF", "VSF", "STC", "SGU", "STL", "PIE", "SCE", "SBS", "SUN", "SRY", "TLH", "TPA", "TAX", "TXK", "TVF", "OOK", "TOL", "TOP", "TVC", "TTN", "TUS", "TUL", "TUP", "TWF", "TYR", "UNK", "EGE", "VDZ", "VLD", "VCT", "VIS", "ACT", "ALW", "DCA", "WAS", "IAD", "ALO", "ART", "ATY", "CWA", "EAT", "PBI", "WYS", "HPN", "SPS", "ICT", "AVP", "IPT", "ISN", "ILG", "ILM", "OLF", "WRL", "WRG", "YKM", "YAK", "YUM", "YXX", "YAA", "YEK", "YBG", "YYC", "YBL", "YGR", "YCG", "YYG", "YMT", "YYQ", "YXC", "YDF", "YHD", "YEG", "YEO", "YMM", "YYE", "YXJ", "YSM", "YFC", "YQX", "YGP", "YQU", "YHZ", "YHM", "YFB", "YKA", "YLW", "YQK", "YGK", "YQL", "YXU", "YXH", "YQM", "YYY", "YMQ", "YUL", "YCD", "YYB", "YOW", "YYF", "YZT", "YPW", "YPR", "YQB", "YQZ", "YRT", "YRL", "YQR", "YRJ", "YUY", "YSJ", "YZP", "YZR", "YXE", "YAM", "YZV", "YXL", "YYD", "YYT", "YSB", "YQY", "YXT", "YTH", "YQT", "YTS", "YYZ", "YTO", "YTZ", "YVO", "YVR", "YYJ", "YWK", "YXY", "YWL", "YQG", "YWG", "YZF", 'LAX'];
    Service.events = [{
     name: 'Daytona 500',
     location: {
       lat: '29.185225',
       long: '-81.071343'
     },
     dates: {
       from: '2017-02-17',
       to: '2017-02-22'
     },
     city: 'Daytona Beach, FL'
    }]

    return Service;

    function searchForFlights(departureAirport, arrivalAirport, date) {
      var url= flightsUrl + 'departureAirport='+ departureAirport + '&arrivalAirport=' + arrivalAirport + '&departureDate=' + date + '&apikey=BAGEROtURYYysKTHQIE7HK5m0tOFIjSH';
      return $http.get(url).then(function (data) {
        console.log(data);
        debugger
        
        return data.data;
      })
    }
    function searchForHotels(location, checkInDate, checkOutDate) {
      var url= hotelSearchUrl + 'city='+ location + '&checkInDate=' + checkInDate + '&checkOutDate=' + checkOutDate + '&room1=2&apikey=BAGEROtURYYysKTHQIE7HK5m0tOFIjSH';
      return $http.get(url).then(function (data) {
        console.log(data);
        return data.data;
      })
    }
    function priceForHotels(hotelId, checkInDate, checkOutDate) {
      var url= hotelsPriceUrl + 'hotelId='+ hotelId + '&checkInDate=' + checkInDate + '&checkOutDate=' + checkOutDate + '&room1=2&apikey=BAGEROtURYYysKTHQIE7HK5m0tOFIjSH';
      return $http.get(url).then(function (data) {
        console.log(data);
        return data.data;
      })
    }
    function lookUpAirportByLatLong(lat, long) {
      var airportLookupUrl = "http://terminal2.expedia.com/x/geo/features?within=30km&lat="+ lat +"&lng="+long+"&type=airport&verbose=3&apikey=BAGEROtURYYysKTHQIE7HK5m0tOFIjSH";
      return $http.get(airportLookupUrl).then(function (data) {
        console.log(airportLookupUrl);
        return data.data;
      })
    }
  }

})();
