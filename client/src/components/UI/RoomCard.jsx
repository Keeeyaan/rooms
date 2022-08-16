import {
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const RoomCard = ({ title, description }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image='https://source.unsplash.com/random'
          alt='random pic'
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small'>View</Button>
      </CardActions>
    </Card>
  );
};

export default RoomCard;
