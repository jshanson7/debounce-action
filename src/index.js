import debounce from 'lodash.debounce';

export default function debounceAction(action, wait, options) {
  // for options see: https://lodash.com/docs/4.17.4#debounce
  const debounced = debounce(
    (dispatch, actionArgs) => dispatch(action(...actionArgs)),
    wait,
    options
  );

  // see: https://github.com/gaearon/redux-thunk
  const thunk = (...actionArgs) => dispatch => debounced(dispatch, actionArgs);

  // provide hook to _.debounce().cancel() to cancel any trailing invocations or
  // _.debounce().flush() to execute it immediately
  thunk.cancel = debounced.cancel;
  thunk.flush = debounced.flush;

  return thunk;
}
