module.exports = function(seed) {
  var random = whrandom(seed);
  var rng = {
    /**
     * Return an integer within [0, max).
     *
     * @param  {int} [max]
     * @return {int}
     * @api public
     */
    int: function(max) {
      return random() * (max || 0xfffffff) | 0;
    },
    /**
     * Return a float within [0.0, 1.0).
     *
     * @return {float}
     * @api public
     */
    float: function() {
      return random();
    },
    /**
     * Return a boolean.
     *
     * @return {Boolean}
     * @api public
     */
    bool: function() {
      return random() > 0.5;
    },
    /**
     * Return an integer within [min, max).
     *
     * @param  {int} min
     * @param  {int} max
     * @return {int}
     * @api public
     */
    range: function(min, max) {
      return rng.int(max - min) + min;
    },
    /**
     * Pick an element from the source.
     *
     * @param  {mixed[]} source
     * @return {mixed}
     * @api public
     */
    pick: function(source) {
      return source[rng.range(0, source.length)];
    }
  };

  return rng;
};

/**
 * Generate a seeded random number using Python's whrandom implementation.
 * See https://github.com/ianb/whrandom for more information.
 *
 * @param  {int} [seed]
 * @return {Function}
 * @api private
 */
function whrandom(seed) {
  if (!seed) {
    seed = Date.now();
  }

  var x = (seed % 30268) + 1;
  seed = (seed - (seed % 30268)) / 30268;
  var y = (seed % 30306) + 1;
  seed = (seed - (seed % 30306)) / 30306;
  var z = (seed % 30322) + 1;
  seed = (seed - (seed % 30322)) / 30322;

  return function() {
    x = (171 * x) % 30269;
    y = (172 * y) % 30307;
    z = (170 * z) % 30323;
    return (x / 30269.0 + y / 30307.0 + z / 30323.0) % 1.0;
  };
}
