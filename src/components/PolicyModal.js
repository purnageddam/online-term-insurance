import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefPolicy } from "../redux/PolicyReducer";

export function PolicyModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefPolicy({}));
  };

  return (
    <Modal show={state.policy.refemp.id} onHide={() => updateRefObj()}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            Policy Name - {state.policy.refemp.policyName}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => updateRefObj()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
