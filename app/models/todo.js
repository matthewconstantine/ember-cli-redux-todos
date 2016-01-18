import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean', { defaultValue: false })
});

Todo.reopenClass({
  FIXTURES: [
    {
      id: '1',
      title: 'install ember-cli-redux',
      isCompleted: true
    },
    {
      id: '2',
      title: 'move stateful code to reducers',
      isCompleted: false
    },
    {
      id: '3',
      title: 'dispatch actions to change state',
      isCompleted: false
    }
  ]
});

export default Todo;
