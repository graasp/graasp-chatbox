import { Box, Typography } from '@mui/material';

type Props = {
  date: string;
};

const Date = ({ date }: Props): JSX.Element => {
  return (
    <Box p={1} alignSelf="center">
      <Typography variant="subtitle2">{date}</Typography>
    </Box>
  );
};

export default Date;
