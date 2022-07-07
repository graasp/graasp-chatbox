import { FC } from 'react';

import Box from '@material-ui/core/Box';

import { adminToolsContainerCypress } from '../config/selectors';
import { ToolVariants, ToolVariantsType } from '../types';
import ClearChat from './ClearChat';
import ExportChat from './ExportChat';

type Props = {
  variant?: ToolVariantsType;
};

const AdminTools: FC<Props> = ({ variant = ToolVariants.BUTTON }) => {
  return (
    <Box flexDirection="row" data-cy={adminToolsContainerCypress}>
      <ExportChat variant={variant} />
      <ClearChat variant={variant} />
    </Box>
  );
};

export default AdminTools;
