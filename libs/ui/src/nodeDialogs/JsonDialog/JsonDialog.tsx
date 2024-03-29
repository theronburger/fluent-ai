import { useDispatch, useSelector } from 'react-redux';
import { InnerDialogStructure } from '../../lib/InnerDialogStructure/InnerDialogStructure';
import {
  flowActions,
  flowRunnerSelectors,
  flowSelectors,
} from '@tool-ai/state';
import styles from '../../styles.module.css';
import RadioGroup from '../../lib/RadioGroupComponent/RadioGroupComponent';

function JsonDialog({ nodeId }: { nodeId: string }) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(nodeId));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(nodeId));

  const titleString = (inputs?.title as string) || 'JSON';
  const inputModes = [
    {
      value: 'simple',
      label: 'Simple',
      description: <p>Processes the contents of msg.payload</p>,
    },
    {
      value: 'custom',
      label: 'Custom Path',
      description: (
        <div>
          <p>Processes the contents of property with path :</p>
        </div>
      ),
    },
  ];
  const inputMode = (inputs?.inputMode as string) || inputModes[0].value;

  const outputModes = [
    {
      value: 'simple',
      label: 'Simple',
      description: <p>Saves the result to msg.payload</p>,
    },
    {
      value: 'custom',
      label: 'Custom Path',
      description: (
        <div>
          <p>Saves the results to object property with path :</p>
        </div>
      ),
    },
  ];
  const outputMode = (inputs?.outputMode as string) || outputModes[0].value;

  if (inputs?.inputPath === undefined) {
    dispatch(
      flowActions.setInput({
        id: nodeId,
        nodeInputs: { ...inputs, inputPath: 'msg.payload' },
      })
    );
  }
  if (inputs?.outputPath === undefined) {
    dispatch(
      flowActions.setInput({
        id: nodeId,
        nodeInputs: { ...inputs, outputPath: 'msg.payload' },
      })
    );
  }

  const customStyles = { '--highlight': 'hsla(20, 96%, 69%, 1.0)' };

  return (
    <InnerDialogStructure title="JSON">
      <div title="Description">
        JavaScript Object Notation is a lightweight data-interchange format.
        <br />
        For example
        <pre className="text-sm p-2">
          <code>
            {JSON.stringify({ name: 'Sally', age: 31, city: 'Berlin' }, null, 2)
              .split('\n')
              .map((item, i) => (
                <p key={i}>{item}</p>
              ))}
          </code>
        </pre>
        <b>Usage</b>
        <br /> If the JSON Node receives a string, it tries to parse it as JSON.
        <br /> If the JSON Node receives an object, it tries to stringify it as
        JSON.
      </div>
      <div title="Output">
        <pre className="text-sm p-2">
          <code>
            {JSON.stringify(outputs?.msg || {}, null, 2)
              .split('\n')
              .map((item, i) => (
                <p key={i}>{item}</p>
              ))}
          </code>
        </pre>
      </div>
      <div title="Options">
        <div>
          <p>
            <b>Title</b>
          </p>
          <input
            className={styles.TextInput}
            type="text"
            value={titleString}
            placeholder="JSON"
            onChange={(event) => {
              dispatch(
                flowActions.setInput({
                  id: nodeId,
                  nodeInputs: { ...inputs, title: event.target.value },
                })
              );
            }}
          />
        </div>
        <RadioGroup
          title="Input behavior "
          options={inputModes}
          value={inputMode}
          customStyles={customStyles}
          onChange={(value) => {
            dispatch(
              flowActions.setInput({
                id: nodeId,
                nodeInputs: { ...inputs, inputMode: value, editable: false },
              })
            );
          }}
          size="small"
        />
        {inputMode === 'custom' && (
          <div>
            <input
              className={styles.TextInput}
              type="text"
              value={(inputs?.inputPath as string) || 'msg.payload'}
              placeholder="msg.payload"
              onChange={(event) => {
                dispatch(
                  flowActions.setInput({
                    id: nodeId,
                    nodeInputs: { ...inputs, inputPath: event.target.value },
                  })
                );
              }}
            />
          </div>
        )}
        <RadioGroup
          title="Output behavior "
          options={outputModes}
          value={outputMode}
          customStyles={customStyles}
          onChange={(value) => {
            dispatch(
              flowActions.setInput({
                id: nodeId,
                nodeInputs: { ...inputs, outputMode: value, editable: false },
              })
            );
          }}
          size="small"
        />
        {outputMode === 'custom' && (
          <div>
            <input
              className={styles.TextInput}
              type="text"
              value={(inputs?.outputPath as string) || 'msg.payload'}
              placeholder="msg.payload"
              onChange={(event) => {
                dispatch(
                  flowActions.setInput({
                    id: nodeId,
                    nodeInputs: { ...inputs, outputPath: event.target.value },
                  })
                );
              }}
            />
          </div>
        )}
      </div>
    </InnerDialogStructure>
  );
}

export { JsonDialog };
