var mongoqs = require('./')

exports.testOneKeyValue = function( test ) {

  var qs = 'city=New York'

  var expected = {
    city: 'New York'
  }

  test.deepEqual( mongoqs( qs ), expected )

  test.done()

}

exports.testOneKeyTwoValues = function( test ) {

  var qs = 'city=New York&city=Los Angeles'

  var expected = {
    city: { '$in': ['New York', 'Los Angeles'] }
  }

  test.deepEqual( mongoqs( qs ), expected )

  test.done()

}

exports.testTwoKeys = function( test ) {

  var qs = 'country=United States&city=New York'

  var expected = {
    country: 'United States',
    city: 'New York'
  }

  test.deepEqual( mongoqs( qs ), expected )

  test.done()

}

exports.testNotEqual = function( test ) {

  var qs = 'city=!New York'

  var expected = {
    city: { '$ne': 'New York' }
  }

  test.deepEqual( mongoqs( qs ), expected )

  test.done()

}

exports.testNotEqualTwoValues = function( test ) {

  var qs = 'city=!New York&city=!Los Angeles'

  var expected = {
    city: { '$nin': ['New York', 'Los Angeles'] }
  }

  test.deepEqual( mongoqs( qs ), expected )

  test.done()

}

exports.testCombine = function( test ) {

  var qs = 'city=!New York&city=!Los Angeles&country=United States&zipcode=200&zipcode=400'

  var expected = {
    city: { '$nin': ['New York', 'Los Angeles'] },
    country: 'United States',
    zipcode: { '$in': ['200', '400'] }
  }

  test.deepEqual( mongoqs( qs ), expected )

  test.done()

}
