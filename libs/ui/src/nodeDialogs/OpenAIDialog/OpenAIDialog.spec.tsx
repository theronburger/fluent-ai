import { render } from '@testing-library/react';

import {OpenAIDialog} from './OpenAIDialog';

describe('OpenAIDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OpenAIDialog
      isOpen={true}
      onClose={()=>{console.log('onClose')}}
      activeDialog='openAi'
      nodes={[]}
      setNodes={()=>console.log('setNodes')}
      activeNodeId='test'
       />);
    expect(baseElement).toBeTruthy();
  });
});
