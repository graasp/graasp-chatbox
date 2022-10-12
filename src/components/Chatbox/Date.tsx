import { FC } from 'react';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DateContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 1, 1),
}));

type Props = {
  date: string;
};

const Date: FC<Props> = ({ date }) => {
  return (
    <DateContainer p={1} alignSelf="center">
      <Typography variant="subtitle2">{date}</Typography>
    </DateContainer>
  );
};

export default Date;
