import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { useThunkDispatch } from "../../..";
import { closeModal } from "../../../actions/modal/close";
import { IRootState } from "../../models/rootState";

export const ModalContainer = () => {
    const {open, body} = useSelector((state:IRootState) => state.modal)
    const dispatch = useThunkDispatch();
  return (
    <Modal open= {open} onClose= {() => dispatch(closeModal())} size = 'mini'>
      <Modal.Content>
        {body}
      </Modal.Content>
    </Modal>
  );
};
