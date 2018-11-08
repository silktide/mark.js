'use strict';
describe('mark with acrossElements and matches across iframes', function() {
  var $ctx, $elements, errCall;
  beforeEach(function(done) {
    loadFixtures('across-elements/iframes/across.html');

    $elements = $();
    $ctx = $('.across-elements-iframes-across');
    errCall = 0;
    try {
      new Mark($ctx[0]).mark(['dolor sit', 'amet. Lorem'], {
        'diacritics': false,
        'separateWordSearch': false,
        'iframes': true,
        'acrossElements': true,
        'each': function($m) {
          console.log('Each called');
          $elements = $elements.add($($m));
        },
        'done': function() {
          console.log('Done called');
          done();
        }
      });
    } catch (e) {
      errCall++;
    }
  }, 30000); // 30 sec timeout

  it('should wrap matches across iframes recursively', function() {
    console.log('Errcall: ', errCall, 0);
    console.log('Elements: ', $elements.length, 30);
    expect(errCall).toBe(0);
    expect($elements).toHaveLength(30); // including whitespace matches
  });
});
