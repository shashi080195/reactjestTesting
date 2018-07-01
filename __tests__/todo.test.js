import Todo from '../app/todo';
import React from 'react';
import { mount } from 'enzyme';

test('TodoComponent calls doneChange when todo is clicked', () => {
  const todo = { id: 1, done: false, name: 'Buy Milk' };
  const doneChange = jest.fn();
  const deleteTodo = jest.fn();
  const map = {};
    window.addEventListener = jest.genMockFn().mockImpl((event, cb) => {
    map[event] = cb;
  });
  const wrapper = mount(
    <Todo todo={todo} doneChange={doneChange} deleteTodo={deleteTodo} done={true}/>
  );

  map.mousemove({ pageX: 100, pageY: 100});
  const p = wrapper.find('.toggle-todo');
  p.simulate('click');
  expect(doneChange).toBeCalledWith(1);

  const sec = wrapper.find(".delete-todo");
  const mockedEvent = { target: {} }
  sec.simulate("click",mockedEvent);
  expect(deleteTodo).toBeCalled();
});
