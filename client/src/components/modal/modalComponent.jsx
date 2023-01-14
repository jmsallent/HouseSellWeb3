import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function ModalComponent({ houseProp }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="heading">Related article</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-5">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(55).webp"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-7">
              <p>
                <strong>My travel to paradise</strong>
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit [...]
              </p>
              <button type="button" className="btn btn-info btn-md">
                Read more
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
