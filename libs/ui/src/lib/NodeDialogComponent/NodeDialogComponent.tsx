import styles from './NodeDialogComponent.module.css';
import { InputDialog } from '../../nodeDialogs/InputDialog/InputDialog';
import { JsonDialog } from '../../nodeDialogs/JsonDialog/JsonDialog';
import { TemplateDialog } from '../../nodeDialogs/TemplateDialog/TemplateDialog';
import { UserFunctionDialog } from '../../nodeDialogs/UserFunctionDialog/UserFunctionDialog';
import { PreviewDialog } from '../../nodeDialogs/PreviewDialog/PreviewDialog';
import { OpenAIDialog } from '../../nodeDialogs/OpenAIDialog/OpenAIDialog';
import { TextFileInputDialog } from '../../nodeDialogs/TextFileInputDialog/TextFileInputDialog';
import { useDispatch, useSelector } from 'react-redux';
import { flowActions, flowSelectors } from '@tool-ai/state';
import { useState } from 'react';
import { ConditionDialog } from '../../nodeDialogs/ConditionDialog/ConditionDialog';
import { RemoteRunnerDialog } from '../../nodeDialogs/RemoteRunnerDialog/RemoteRunnerDialog';

function NodeDialogComponent() {
  const dispatch = useDispatch();
  const isOpen = useSelector(flowSelectors.isDialogOpen);
  const activeNodeId = useSelector(flowSelectors.activeNodeId);
  const [isExpanded, setIsExpanded] = useState(false);

  const nodeType = useSelector(flowSelectors.getNodeTypeById(activeNodeId));

  const shownDialog = () => {
    switch (nodeType) {
      case 'textFileInput':
        return <TextFileInputDialog nodeId={activeNodeId} />;
      case 'textInput':
        return <InputDialog nodeId={activeNodeId} />;
      case 'json':
        return <JsonDialog nodeId={activeNodeId} />;
      case 'userFunction':
        return <UserFunctionDialog nodeId={activeNodeId} />;
      case 'template':
        return <TemplateDialog nodeId={activeNodeId} />;
      case 'condition':
        return <ConditionDialog nodeId={activeNodeId} />;
      case 'remoterunner':
        return <RemoteRunnerDialog nodeId={activeNodeId} />;
      case 'preview':
        return <PreviewDialog nodeId={activeNodeId} />;
      case 'openAi':
        return <OpenAIDialog nodeId={activeNodeId} />;
      default:
        return null;
    }
  };
  return (
    <div>
      {isOpen && (
        <div
          className={`${styles.DialogContent} ${
            isExpanded && styles.expanded
          } border-2 border-inherit rounded-md`}
        >
          <div className="flex flex-space-between">
            <button
              className="absolute right-2 top-2"
              onClick={() => dispatch(flowActions.setIsDialogOpen(false))}
            >
              🅧
            </button>
            <button
              className="absolute left-2 top-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '▶ Contract' : '◀ Expand'}
            </button>
          </div>
          <div>{shownDialog()}</div>
        </div>
      )}
    </div>
  );
}

export { NodeDialogComponent };
