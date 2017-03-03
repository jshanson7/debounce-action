# Debounce Action [![NPM version][npm-image]][npm-url]

Create debounced [redux-thunk](https://github.com/gaearon/redux-thunk) actions.

## Installation

```sh
npm i --save debounce-action
```

## Usage

```javascript
import debounceAction from 'debounce-action';

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementThunk() {
  return dispatch => {
    dispatch(increment());
  };
}

// wrap normal actions with debounceAction() to create debounced actions
const incrementDebounced = debounceAction(increment, 1000);
const incrementThunkDebounced = debounceAction(incrementThunk, 5000, {leading: true});

// call debounced actions like normal redux actions
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

store.dispatch(incrementDebounced());
store.dispatch(incrementDebounced());
// --> INCREMENT_COUNTER dispatched once after one second

store.dispatch(incrementThunkDebounced());
// --> INCREMENT_COUNTER dispatched immediately
store.dispatch(incrementThunkDebounced());
store.dispatch(incrementThunkDebounced());
// --> INCREMENT_COUNTER dispatched once again after five seconds
```

Uses [lodash's `debounce`](https://lodash.com/docs/4.17.4#debounce).

## License

MIT

[npm-image]: https://badge.fury.io/js/debounce-action.svg
[npm-url]: https://npmjs.org/package/debounce-action
