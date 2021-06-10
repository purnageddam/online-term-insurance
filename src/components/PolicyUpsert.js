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
  const [description, setDescription] = useState(
    state.policy.refemp.description
  );

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updatePolicyName = (e) => setPolicyName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const addPolicy = (e) => {
    e.preventDefault();
    console.log(policyName, description);
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

    dispatch(
      createPolicyAction({
        policyName,
        description,
      })
    );

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    setPolicyName("");
    setDescription("");
  };

  const updatePolicy = () => {
    dispatch(
      updatePolicyAction({
        id: state.policy.refemp.id,
        policyName,
        description,
      })
    );

    setPolicyName("");
    setDescription("");
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#d9ecd0" }}>
      <div className="row">
        <div className="col-3 col-md-3 d-none d-md-block"></div>
        <div className="col-12 col-md-6">
          <h3 className="alert alert-primary text-center">
            {state.policy.refemp.id ? "Update Policy" : "Create Policy"}
          </h3>

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
              <input
                type="text"
                value={description}
                onChange={(e) => updateDescription(e)}
                className="form-control"
                placeholder="Description"
              />
            </div>

            <div className="mb-1">
              {state.policy.refemp.id ? (
                <input
                  type="button"
                  className="btn btn-warning w-100"
                  value="Update Policy"
                  onClick={() => updatePolicy()}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-warning w-100"
                  value="Add Policy"
                  onClick={(e) => addPolicy(e)}
                />
              )}
            </div>
          </form>
        </div>
        <div className="col-3 col-md-3  d-none d-md-block"></div>
      </div>
    </div>
  );
}
