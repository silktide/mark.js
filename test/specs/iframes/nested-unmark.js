'use strict';
describe('unmark with nested iframes', function() {
  var $ctx, $elements, errCall;
  beforeEach(function(done) {
    loadFixtures('iframes/nested.html');

    $ctx = $('.iframes-nested');
    $elements = $();
    errCall = 0;
    try {
      var instance = new Mark($ctx[0]);
      instance.mark('lorem', {
        'diacritics': false,
        'separateWordSearch': false,
        'iframes': true,
        'each': function($el) {
          console.log('EACH CALLED UNMARK');
          $elements = $elements.add($($el));
        },
        'done': function() {
          instance.unmark({
            'iframes': true,
            'done': function() {
              console.log('DONE CALLED UNMARK');
              done();
            }
          });
        }
      });
    } catch (e) {
      errCall++;
    }
  });

  it(
    'should remove all marked elements inside iframes recursively',
    function() {
      console.log('UNMARK ERRCALL: ', errCall, 0);
      console.log('UNMARK THIS: ', this);
      expect(errCall).toBe(0);
      $elements.each(function() {
        expect(this).not.toBeInDOM();
      });
    }
  );
});
