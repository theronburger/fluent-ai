import React, { memo, useContext } from 'react';
import { Handle, Position } from 'reactflow';
import '../CustomNodesStyles.css';
import * as Dialog from '@radix-ui/react-dialog';
import Context from '../../context/context';

interface MemoProps {
  isConnectable: boolean;
  data: any
}
export default memo (({data, isConnectable}: MemoProps) => {
  const {setIsDialogOpen, setActiveDialog} = useContext(Context);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div onClick={()=>{setIsDialogOpen(true); setActiveDialog(data.label)}}>{data.label}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
  });