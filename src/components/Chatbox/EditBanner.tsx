import { Close, Edit } from '@mui/icons-material';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { CHATBOX } from '@graasp/translations';

import { useChatboxTranslation } from '@/config/i18n';
import {
  editBannerCloseButtonCypress,
  editBannerCypress,
  editBannerOldTextCypress,
} from '@/config/selectors';
import { useEditingContext } from '@/context/EditingContext';
import { normalizeMentions } from '@/index';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
const EditContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  width: '100%',
  // magic to ensure that the container does not overflow its intended space
  minWidth: '0px',
});
const OldTextLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const EditIcon = styled(SvgIcon)(({ theme }) => ({
  margin: theme.spacing(1),
}));

type Props = {
  onClose: () => void;
  editedText: string;
};

const EditBanner = ({ onClose, editedText }: Props) => {
  const { open } = useEditingContext();
  const { t } = useChatboxTranslation();
  if (!open) {
    return null;
  }
  return (
    <>
      <Divider />
      <Container data-cy={editBannerCypress}>
        <EditIcon fontSize="small" color="primary">
          <Edit />
        </EditIcon>
        <EditContainer>
          <OldTextLabel variant="subtitle2">
            {t(CHATBOX.EDITING_MESSAGE_LABEL)}
          </OldTextLabel>
          <Typography noWrap data-cy={editBannerOldTextCypress}>
            {normalizeMentions(editedText)}
          </Typography>
        </EditContainer>
        <IconButton data-cy={editBannerCloseButtonCypress} onClick={onClose}>
          <Close
            // todo: change to secondary once Graasp has one
            color="primary"
          />
        </IconButton>
      </Container>
    </>
  );
};

export default EditBanner;
