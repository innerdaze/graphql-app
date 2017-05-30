import fetch from 'isomorphic-fetch'

export function startingRequest() {
  return {
    type: 'STARTING_REQUEST'
  }
}

export function finishedRequest(response) {
  return {
    type: 'FINISHED_REQUEST',
    response: response
  }
}

export function getGraph(payload) {
  return dispatch => {
    dispatch(startingRequest())

    return fetch('/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/graphql'
      },
      body: payload
    })
    .then((response) => response.json().then(result => result))
    .then(response => dispatch(finishedRequest(response)))
  }
}
