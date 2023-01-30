import { Component, createUniqueId, JSXElement } from "solid-js";

interface ModalProps {
  children: JSXElement;
  trigger: JSXElement;
  triggerClass?: string;
}

export const Modal: Component<ModalProps> = (props) => {
  const uniqueId = createUniqueId();
  return (
    <>
      <label class={props.triggerClass} for={uniqueId}>
        {props.trigger}
      </label>

      <input type="checkbox" id={uniqueId} class="modal-toggle" />
      <label for={uniqueId} class="modal cursor-pointer">
        <label class="modal-box relative">{props.children}</label>
      </label>
    </>
  );
};
