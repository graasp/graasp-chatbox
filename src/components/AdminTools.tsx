import { FC } from 'react';
import ExportChat from './ExportChat';
import { ToolVariants, ToolVariantsType } from '../types';
import ClearChat from './ClearChat';
import Box from '@material-ui/core/Box';

type Props = {
  variant?: ToolVariantsType;
};

const AdminTools: FC<Props> = ({ variant = ToolVariants.BUTTON }) => {
  return (
    <Box flexDirection="row">
      <ExportChat variant={variant} />
      <ClearChat />
    </Box>
  );
};

export default AdminTools;
