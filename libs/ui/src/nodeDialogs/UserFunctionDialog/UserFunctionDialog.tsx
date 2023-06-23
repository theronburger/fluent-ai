import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowSelectors } from "@tool-ai/state";

function UserFunctionDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));

  return (
    <InnerDialogStructure
      title="User Function"
      description="user function description"
    >
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="Write your function here..."
        rows={10}
        cols={100}
        // value={node?.props ? node.props.userFunction : ''}
        value={inputs?.userFunction as string}
        onChange={          (event) => {
          dispatch(
            flowActions.setInput(
              {
                id,
                nodeInputs: { userFunction:event.target.value}
              }
            )
          )
          }} />
    </InnerDialogStructure>
  );
}

export { UserFunctionDialog };