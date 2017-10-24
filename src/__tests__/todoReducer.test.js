import reducer from '../components/todoList/todoReducer';
import * as types from '../components/todoList/constants/actionTypes';

describe('todoReducer', () => {
  const initialState = {
    tasks: [{
      name: 'read book',
      isActive: true,
      id: 0,
      history: [{
        changedAt: "2017-10-19T12:39:10.863Z",
        prop: "name",
        from: "",
        to: "read book"
      }],
    }],
    show: 'all',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle ADD_TASK', () => {
    expect(
      reducer(
        initialState,
        {
          type: types.ADD_TASK_DONE,
          task: {
            name: 'watch new episode',
            isActive: true,
            id: 1,
            history: [{
              changedAt: "2017-10-19T12:39:10.863Z",
              prop: "name",
              from: "",
              to: "watch new episode"
            }],
          }
        })
    ).toEqual(
      {
        tasks:
          [
            ...initialState.tasks,
            {
              name: 'watch new episode',
              isActive: true,
              id: 1,
              history: [{
                changedAt: "2017-10-19T12:39:10.863Z",
                prop: "name",
                from: "",
                to: "watch new episode"
              }]
            }
          ],
        show: 'all'
      },
    );

    expect(
      reducer({
          tasks:
            [
              ...initialState.tasks,
              {
                name: 'watch new episode',
                isActive: true,
                id: 1,
                history: [{
                  changedAt: "2017-10-19T12:39:10.863Z",
                  prop: "name",
                  from: "",
                  to: "watch new episode"
                }]
              }
            ],
          show: 'all'
        },
        {
          type: types.ADD_TASK_DONE,
          task: {
            name: 'simplest task ever',
            isActive: true,
            id: 2,
            history: [{
              changedAt: "2017-10-19T12:39:10.863Z",
              prop: "name",
              from: "",
              to: "simplest task ever"
            }],
          }
        }
      )
    ).toEqual(
      {
        tasks:
          [
            ...initialState.tasks,
            {
              name: 'watch new episode',
              isActive: true,
              id: 1,
              history: [{
                changedAt: "2017-10-19T12:39:10.863Z",
                prop: "name",
                from: "",
                to: "watch new episode"
              }]
            },
            {
              name: 'simplest task ever',
              isActive: true,
              id: 2,
              history: [{
                changedAt: "2017-10-19T12:39:10.863Z",
                prop: "name",
                from: "",
                to: "simplest task ever"
              }],

            }
          ],
        show: 'all'
      }
    )
  });

  it('should handle FILTER_TASKS', () => {
    expect(
      reducer(
        initialState,
        {
          type: types.FILTER_TASKS,
          isActive: false
        }
      )
    ).toEqual({
      ...initialState,
      show: false,
    })
  })
});
