import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleFor('route:application');

test('it exists', function(assert) {
  assert.expect(2);
  var route = this.subject();

  assert.ok(route);
  assert.ok(route instanceof Ember.Route);
});

// TODO: Determine what really needs to be tested here.
// test('#model filter:all', function(assert) {
//   assert.expect(3);

//   var expectedModel = {
//     id: '1',
//     title: 'install EAK',
//     isCompleted: true
//   };

//   var route = this.subject({
//     store: {
//       findAll(type) {
//         assert.equal(type, 'todo');

//         return Ember.RSVP.Promise.resolve(expectedModel);
//       }
//     }
//   });

//   return route.model({ filter: 'all' }).then(function(model) {
//     assert.equal(model.filter, 'all');
//     assert.equal(model.all, expectedModel);
//   });
// });
