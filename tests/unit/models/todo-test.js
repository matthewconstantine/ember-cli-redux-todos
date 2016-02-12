import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('todo', 'Unit - Todo');

test("it exists", function(assert) {
  ok(this.subject());
});

//---------------------
// TODO: figure out how to get this in tests/unit/reducers
//
import redux from 'npm:redux';
import todo from 'todos/reducers/todo';
const { createStore } = redux;

const initialState = Ember.Object.create({
  todos: Ember.A(),
  filter: 'all',
  editingTodo: null,
  newTitle: ""
});

const fakeEmberStore = {
  createRecord: (type, params) => {
    return {
      params,
      save: ()=>{}
    };
  }
};

test("it should handle initial state", function(assert) {
  const newState = todo(null, {});
  equal(JSON.stringify(newState), JSON.stringify(initialState));
});

test("it should not modify initialState", function(assert) {
  todo(null, {
    type: 'SET_FILTER',
    filter: 'active'
  });
  const newState = todo(null, {});
  equal(newState.get('filter'), 'all');
});

test("it should handle SET_FILTER", function(assert) {
  const newState = todo(null, {
    type: 'SET_FILTER',
    filter: 'active'
  });
  equal(newState.get('filter'), 'active');
});

test("it should handle RECEIVE_TODOS", function(assert) {
  const newState = todo(null, {
    type: 'RECEIVE_TODOS',
    todos: [1]
  });
  equal(newState.get('todos.length'), 1);
});

test("it should handle CREATE_TODO", function(assert) {
  const newState = todo(null, {
    type: 'CREATE_TODO',
    title: 'foo',
    store: fakeEmberStore
  });
  equal(newState.get('todos').length, 1);
});

test("it should handle EDIT_TODO", function(assert) {
  let fakeTodo = {};
  const newState = todo(null, {
    type: 'EDIT_TODO',
    todo: fakeTodo
  });
  equal(newState.get('editingTodo'), fakeTodo);
});

test("it should handle UPDATE_TODO", function(assert) {
  expect(3);
  let existingTodo = Ember.Object.create({
    title: "Old Title",
    save: () => { ok(true); }
  });
  const newState = todo(null, {
    type: 'UPDATE_TODO',
    title: 'New Title',
    todo: existingTodo
  });
  equal(existingTodo.get('title'), "New Title");
  equal(newState.get('editingTodo'), null);
});

test("it should handle REMOVE_TODO", function(assert) {
  expect(2);
  let existingTodo = Ember.Object.create({
    destroyRecord: () => { ok(true); }
  });
  const oldState = Ember.Object.create({
    todos: [existingTodo]
  });
  const newState = todo(oldState, {
    type: 'REMOVE_TODO',
    todo: existingTodo
  });
  equal(newState.get('todos.length'), 0);
});

test("it should handle TOGGLE_COMPLETED", function(assert) {
  expect(2);
  let existingTodo = Ember.Object.create({
    isCompleted: false,
    save: () => {ok(true);}
  });
  const newState = todo(null, {
    type: 'TOGGLE_COMPLETED',
    todo: existingTodo
  });
  equal(existingTodo.get('isCompleted'), true);
});

test("it should handle COMPLETE_ALL when some are complete", function(assert) {
  let todo1 = Ember.Object.create({ isCompleted: false });
  let todo2 = Ember.Object.create({ isCompleted: true  });
  const oldState = Ember.Object.create({ todos: [todo1, todo2] });
  const newState = todo(oldState, {
    type: 'COMPLETE_ALL'
  });
  equal(todo1.get('isCompleted'), true);
  equal(todo2.get('isCompleted'), true);
});

test("it should handle COMPLETE_ALL when all are complete", function(assert) {
  let todo1 = Ember.Object.create({ isCompleted: true });
  let todo2 = Ember.Object.create({ isCompleted: true  });
  const oldState = Ember.Object.create({ todos: [todo1, todo2] });
  const newState = todo(oldState, {
    type: 'COMPLETE_ALL'
  });
  equal(todo1.get('isCompleted'), false);
  equal(todo2.get('isCompleted'), false);
});

test("it should handle CLEAR_COMPLETED", function(assert) {
  expect(2);
  let todo1 = Ember.Object.create({ isCompleted: true, destroyRecord() {
    ok(true, 'destroyed');
  }});
  let todo2 = Ember.Object.create({ isCompleted: false  });
  const oldState = Ember.Object.create({ todos: [todo1, todo2] });
  const newState = todo(oldState, {
    type: 'CLEAR_COMPLETED'
  });
  equal(newState.get('todos.length'), 1);
});
