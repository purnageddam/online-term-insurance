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

// ACTIONS :: COmponents are interacting with this action
export function createPolicyAction(payload) {
  // return { type: EMPLOYEE_CREATE, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/policy/create";
    const requestBody = { ...payload };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: POLICY_CREATE, payload: payload });
  };
}

export function updatePolicyAction(payload) {
  // return { type: EMPLOYEE_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/policy/update/${payload.id}`;
    const requestBody = { ...payload };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefPolicy({}));
  };
}

export function deletePolicyAction(payload) {
  // return { type: EMPLOYEE_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/policy/delete/${payload.id}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllPolicyAction());
  };
}

export function getAllPolicyAction(payload) {
  // return { type: EMPLOYEE_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/policy/all";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const policyList = await response.json();
    console.log(policyList);

    // Update the UI
    dispatch({ type: POLICY_GET_ALL, payload: policyList });
  };
}

export function getByIdPolicyAction(payload) {
  // return { type: EMPLOYEE_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/policy/findby/${payload.id}`;
    const response = await fetch(url);
    const policyObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefPolicy(policyObj));
  };
}

export function updateRefPolicy(payload) {
  return { type: REF_POLICY, payload: payload };
}

// REDUCER LOGIC
export function PolicyReducer(state = initState, action) {
  switch (action.type) {
    case POLICY_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case POLICY_UPDATE:
      // TODO
      return state;
    case POLICY_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case POLICY_GET_ALL:
      // Update the list
      return { ...state, list: action.payload };
    case POLICY_GET_BY_ID:
      // TODO
      return state;

    case REF_POLICY:
      return { ...state, refemp: action.payload };

    default:
      return state;
  }
}
