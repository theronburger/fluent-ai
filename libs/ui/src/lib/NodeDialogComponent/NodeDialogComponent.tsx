import styles from './NodeDialogComponent.module.css';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { NodeDialogProps } from '../../types';

function NodeDialogComponent(props: NodeDialogProps) {
  return (
    <>
      {props.isOpen && (
        <div
          className={`${styles.DialogContent} border-2 border-inherit rounded-md`}
        >
          <button onClick={() => props.onClose(false)}>X</button>
          <div>
            This is going to hold dynamic children depending on the node we
            click on
          </div>
        </div>
      )}
    </>
  );
}

export { NodeDialogComponent };

{
  /* <Dialog.Root >
    <Dialog.Trigger>{props.label}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay"  />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Hello</Dialog.Title>
        <Dialog.Description />
        {/* <Dialog.Close /> */
}
{
  /* </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root> */
}