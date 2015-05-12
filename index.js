module.exports = function( querystring ){

  if ( !querystring || querystring === null ) {
    return new Error('querystring cannot be empty')
  }

  if ( querystring.indexOf('=') === -1 ) {
    return new Error('Invalid query string')
  }

  var collections = querystring.split('&')

  var keys = [],
    list = {}

  collections.forEach(function( object ){

    // separate object by '=' mark
    objects = object.split('=')

    if ( objects.length === 1 ) {
      return false
    }

    var objectKey = objects[0],
      objectValue = objects[1]

    if ( keys.indexOf( objectKey ) === -1 ) {

      list[ objectKey ] = [ objectValue ]

      keys.push( objectKey )

      return
    }

    list[ objectKey ].push( objectValue )

  })

  var result = {}

  for ( var queryKey in list ) {

    if ( list.hasOwnProperty( queryKey ) ) {

      var queryValue = list[ queryKey ]

      if ( queryValue.length === 1 ) {

        var value = queryValue[0]

        if ( value.indexOf('!') === -1 ) {
          result[ queryKey ] = value
        }
        else {
          result[ queryKey ] = { '$ne': value.substr( 1 ) }
        }

      }
      else {

        result[ queryKey ] = { $in: [], $nin: [] }

        for ( var qvalue in queryValue ) {

          if ( queryValue.hasOwnProperty( qvalue ) ) {

            if ( queryValue[ qvalue ].indexOf('!') === -1 ) {
              result[ queryKey ].$in.push( queryValue[ qvalue ] )
            }
            else {
              result[ queryKey ].$nin.push( queryValue[ qvalue ].substr( 1 ) )
            }

          }

        }

        // remove temporary objects

        if ( result[ queryKey ].$in.length === 0 ) {
          delete result[ queryKey ].$in
        }

        if ( result[ queryKey ].$nin.length === 0 ) {
          delete result[ queryKey ].$nin
        }

      }

    }
  }

  return result

}
