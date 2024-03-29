import React, { useEffect, CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { flowActions } from '@tool-ai/state';
import RadioGroup from './RadioGroupComponent/RadioGroupComponent';

const ReduxRadioGroup = ({
  nodeId,
  inputs,
  title,
  options,
  stateKey,
  defaultValue,
  customStyles,
  size,
}: {
  nodeId: string;
  inputs: Record<string, unknown> | undefined;
  title: string;
  options: { value: string; label: string }[];
  stateKey: string;
  defaultValue?: string;
  customStyles?: CSSProperties & { '--highlight': string };
  size?: 'small' | 'medium' | 'large';
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let defaultVal = defaultValue;

    if (!defaultVal) {
      defaultVal = options[0].value;
    }

    if (!inputs?.[stateKey]) {
      dispatch(
        flowActions.setInput({
          id: nodeId,
          nodeInputs: { ...inputs, [stateKey]: defaultVal },
        })
      );
    }
  }, [dispatch, nodeId, inputs, stateKey, defaultValue, options]);

  return (
    <RadioGroup
      title={title}
      options={options}
      value={(inputs?.[stateKey] as string) ?? defaultValue}
      customStyles={customStyles}
      onChange={(value) =>
        dispatch(
          flowActions.setInput({
            id: nodeId,
            nodeInputs: { ...inputs, [stateKey]: value },
          })
        )
      }
      size={size ?? 'medium'}
    />
  );
};

export default ReduxRadioGroup;
