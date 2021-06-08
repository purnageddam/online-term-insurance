import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deletePolicyAction,
  getAllPolicyAction,
  getByIdPolicyAction,
  updateRefPolicy,
} from "../redux/PolicyReducer";
import { PolicyModal } from "./PolicyModal";

export function PolicyList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllPolicyAction());
  }, []);

  const deletePolicy = (item, index) => {
    dispatch(deletePolicyAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 2000);
  };

  const updatePolicy = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefPolicy(item));

    // form page
    history.push("/create-policy");
  };

  const getPolicyById = (item) => {
    dispatch(getByIdPolicyAction(item));
  };

  return (
    <>
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-secondary">Policy List</h3>

          {successOperation && (
            <div className="alert alert-success">Opeation Success</div>
          )}

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">NAME</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...state.policy.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.policyName}</td>
                  <td>
                    <input
                      type="button"
                      onClick={() => getPolicyById(item)}
                      value="Detail"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      onClick={() => updatePolicy(item)}
                      value="Edit"
                      className="btn btn-link"
                    />
                    /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deletePolicy(item, index)}
                      className="btn btn-link text-danger"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3 col-md-2 d-none d-md-block"></div>
      </div>

      {/** POLICY MODAL */}
      <PolicyModal />
    </>
  );
}
