import { FC } from 'react';

import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { CHATBOX } from '@graasp/translations';

import { useChatboxTranslation } from '@/utils/utils';

const RootContainer = styled('div')({
  flexGrow: 1,
});
const Title = styled(Typography)({
  flexGrow: 1,
});

const StyledChatIcon = styled(ChatIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

type Props = {
  title?: string;
};

const Header: FC<Props> = ({ title }) => {
  const { t } = useChatboxTranslation();

  return (
    <RootContainer>
      <AppBar position="fixed">
        <Toolbar>
          <StyledChatIcon />
          <Title variant="h6">{title || t(CHATBOX.CHATBOX_HEADER)}</Title>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </RootContainer>
  );
};

export default Header;
