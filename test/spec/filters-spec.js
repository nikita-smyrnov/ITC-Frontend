'use strict';

describe('Filters', function() {
  beforeEach(module('itcFrontendApp'));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  describe('orderObjectBy', function() {
    var given, expectedResult;

    beforeEach(function() {
      given = {
        2010: '2010',
        2015: '2015',
        2011: '2011',
        2013: '2013'
      };

      expectedResult = [
        '2015',
        '2013',
        '2011',
        '2010'
      ];
    });

    it('should return an sorted array of each key\'s data', function() {
      var result = $filter('orderObjectBy')(given, 'date');
      expect(result).toEqual(expectedResult);
    });

    it('should return a reversed array when reverse is true', function() {
      var result = $filter('orderObjectBy')(given, 'date', true);
      expect(result).toEqual(expectedResult.reverse());
    });
  });

  describe('results', function() {
    var given, expectedResult;

    beforeEach(function() {
      given = [
        {
          'event':{
            'name':"60m",
            'season':"Indoor"
          },
          'performance':12
        }, {
          'event':{
            'name':"200m",
            'season':"Indoor"
          },
          'performance':22
        }, {
          'event':{
            'name':"200m",
            'season':"Indoor"
          },
          'performance':32
        }, {
          'event':{
            'name':"Triple Jump",
            'season':"Indoor"
          },
          'performance':42,
          'distanceResult':true
        }, {
          'event':{
            'name':"Triple Jump",
            'season':"Indoor"
          },
          'performance':52,
          'distanceResult':true
        }

      ];
      expectedResult = {
        'Indoor': {
          '60m': [{
            'event':{
              'name':"60m",
              'season':"Indoor"
            },
            'performance':12
          }],
          '200m': [{
            'event':{
              'name':"200m",
              'season':"Indoor"
            },
            'performance':22
          },{
            'event':{
              'name':"200m",
              'season':"Indoor"
            },
            'performance':32
          }],
          'Triple Jump': [{
            'event':{
              'name':"Triple Jump",
              'season':"Indoor"
            },
            'performance':52,
            'distanceResult':true
          },{
            'event':{
              'name':"Triple Jump",
              'season':"Indoor"
            },
            'performance':42,
            'distanceResult':true
          }]
        }
      };
    });

    it('should return results as an array organized by event', function() {
      var result = $filter('results')(given);
      expect(result).toEqual(expectedResult);
    });

  });

  describe('xcTime', function() {
    var given, expectedResult;

    beforeEach(function() {
      given = 1101;

      expectedResult = '18:21';
    });

    it('should return a time in m:ss format', function() {
      var result = $filter('xcTime')(given);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('trackTime', function() {
    var given, otherGiven, otherExpectedResult, expectedResult;

    beforeEach(function() {
      given = 115.05;

      otherGiven = 12.003;

      expectedResult = '1:55.05';

      otherExpectedResult  = '12.00';
    });

    it('should return a time in m:ss.SS format', function() {
      var result = $filter('trackTime')(given);
      expect(result).toEqual(expectedResult);
    });

    it('should return a time that is spliced', function() {
      var result = $filter('trackTime')(otherGiven);
      expect(result).toEqual(otherExpectedResult);
    });
  });

  describe('trackDist', function() {
    var givenOneDigit, givenTwoDigit, givenThreeDigit;
    var expectedResultOneDigit, expectedResultTwoDigit, expectedResultThreeDigit;

    beforeEach(function() {
      givenOneDigit = 9;
      givenTwoDigit = 9.9;
      givenThreeDigit = 9.99;

      expectedResultOneDigit = '9.00 m';
      expectedResultTwoDigit = '9.90 m';
      expectedResultThreeDigit = '9.99 m';


    });

    it('should return a distance with .00 m appended', function() {
      var result = $filter('trackDist')(givenOneDigit);
      expect(result).toEqual(expectedResultOneDigit);
    });

    it('should return a distance with 0 m appended', function() {
      var result = $filter('trackDist')(givenTwoDigit);
      expect(result).toEqual(expectedResultTwoDigit);
    });

    it('should return a distance with m appended', function() {
      var result = $filter('trackDist')(givenThreeDigit);
      expect(result).toEqual(expectedResultThreeDigit);
    });
  });

  describe('n12br', function() {
    var given, expectedResult;

    beforeEach(function() {
      given = 'Hello.\r\nHow are you?\r\n\r\nFine thanks.';

      expectedResult = 'Hello.<br />How are you?<br /><br />Fine thanks.';
    });

    it('should return text with new lines replaced with breaks', function() {
      var result = $filter('n12br')(given);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('relayNames', function() {
    var givenIndividual, givenRelay;
    var expectedResultIndividual, expectedResultRelay;

    beforeEach(function() {
      givenIndividual = [{'name': "Tyler Splitt"}];

      givenRelay = [
        {'name': "Tyler Splitt"},
        {'name': "Mike Kreiser"},
        {'name': "Ryan Somerfield"},
        {'name': "Michael Frintner"}
      ];

      expectedResultIndividual = ["Tyler Splitt"];

      expectedResultRelay = ["Splitt, Kreiser, Somerfield, Frintner"];
    });

    it('should return a string of the athletes name for individual events', function() {
      var result = $filter('relayNames')(givenIndividual);
      expect(result).toEqual(expectedResultIndividual);
    });

    it('should return a string of comma separated last names for relay events', function() {
      var result = $filter('relayNames')(givenRelay);
      expect(result).toEqual(expectedResultRelay);
    });
  });
});
