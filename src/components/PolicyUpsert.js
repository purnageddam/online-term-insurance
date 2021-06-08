import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPolicyAction, updatePolicyAction } from "../redux/PolicyReducer";

export function PolicyUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);
  console.log(state);

  const [policyName, setPolicyName] = useState(state.policy.refemp.policyName);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updatePolicyName = (e) => setPolicyName(e.target.value);

  const addPolicy = (e) => {
    e.preventDefault();
    console.log(policyName);
    console.log(formEL);
    console.log(formEL.current.checkValidity());

    if (formEL.current.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      formEL.current.classList.add("was-validated");
    } else {
      const re = /^[a-z!@#%^&*()0-9_\.]+$/;
      if (re.test(policyName)) {
        alert("Policy validates fails");
        return;
      }
    }

    // THIS IS REDUX ACTION CALLING
    dispatch(
      createPolicyAction({
        policyName,
      })
    );

    // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // A2: navigate to another page
    // history.push("/list-employee");

    // reset the form
    setPolicyName("");
  };

  const updatePolicy = () => {
    dispatch(
      updatePolicyAction({
        id: state.policy.refemp.id,
        policyName,
      })
    );

    // reset the form
    setPolicyName("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.policy.refemp.id ? "Update Policy" : "Create Policy"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Opeation Success</div>
        )}

        <form ref={formEL} class="needs-validation" novalidate>
          <div className="mb-1">
            <input
              type="text"
              value={policyName}
              onChange={(e) => updatePolicyName(e)}
              className="form-control"
              placeholder="Enter policy name"
            />
          </div>

          <div className="mb-1">
            {state.policy.refemp.id ? (
              <input
                type="button"
                className="btn btn-secondary w-100"
                value="Update Policy"
                onClick={() => updatePolicy()}
              />
            ) : (
              <input
                type="button"
                className="btn btn-secondary w-100"
                value="Add Policy"
                onClick={(e) => addPolicy(e)}
              />
            )}
          </div>
        </form>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}
