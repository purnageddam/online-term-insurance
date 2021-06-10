const initState = {
  list: [],

  refemp: {},
};

// ACTION TYPES
const POLICY_CREATE = "POLICY_CREATE";
const POLICY_UPDATE = "POLICY_UPDATE";
const POLICY_DELETE = "POLICY_DELETE";
const POLICY_GET_ALL = "POLICY_GET_ALL";
const POLICY_GET_BY_ID = "POLICY_GET_BY_ID";

const REF_POLICY = "REF_POLICY";

export function createPolicyAction(payload) {
  return async (dispatch) => {
    const url = "http://localhost:8080/api/policy/create";
    const requestBody = { ...payload };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    dispatch({ type: POLICY_CREATE, payload: payload });
  };
}

export function updatePolicyAction(payload) {
  return async (dispatch) => {
    const url = `http://localhost:8080/api/policy/update/${payload.id}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    dispatch(updateRefPolicy({}));
  };
}

export function deletePolicyAction(payload) {
  return async (dispatch) => {
    const url = `http://localhost:8080/api/policy/delete/${payload.id}`;
    await fetch(url, { method: "DELETE" });

    dispatch(getAllPolicyAction());
  };
}

export function getAllPolicyAction(payload) {
  return async (dispatch) => {
    const url = "http://localhost:8080/api/policy/all";

    const response = await fetch(url);
    const policyList = await response.json();
    console.log(policyList);

    dispatch({ type: POLICY_GET_ALL, payload: policyList });
  };
}

export function getByIdPolicyAction(payload) {
  return async (dispatch) => {
    const url = `http://localhost:8080/api/policy/findby/${payload.id}`;
    const response = await fetch(url);
    const policyObj = await response.json();

    dispatch(updateRefPolicy(policyObj));
  };
}

export function updateRefPolicy(payload) {
  return { type: REF_POLICY, payload: payload };
}

export function PolicyReducer(state = initState, action) {
  switch (action.type) {
    case POLICY_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case POLICY_UPDATE:
      return state;
    case POLICY_DELETE:
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case POLICY_GET_ALL:
      return { ...state, list: action.payload };
    case POLICY_GET_BY_ID:
      return state;

    case REF_POLICY:
      return { ...state, refemp: action.payload };

    default:
      return state;
  }
}
