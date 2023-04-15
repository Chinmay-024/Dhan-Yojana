'use client';
import {
  Card,
  Metric,
  Text,
  Flex,
  Grid,
  Col,
  List,
  ListItem,
  Title,
  Subtitle
} from '@tremor/react';
import { useRouter } from 'next/navigation';
import Chart from './chart';
import styles from './page.module.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import { Button } from '@tremor/react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const messages = [
  { username: 'Alice', message: 'Hey, how are you?' },
  {
    username: 'Bob',
    message: "I'm doing well, thanks for asking. How about you?"
  },
  { username: 'Alice', message: "I'm good too, thanks!" },
  { username: 'Bob', message: 'Glad to hear it.' },
  { username: 'Charlie', message: "Hey guys, what's up?" },
  { username: 'Alice', message: 'Not much, just chatting with Bob.' },
  { username: 'Bob', message: "Yeah, we're just catching up." },
  { username: 'Charlie', message: 'Cool, mind if I join i n?' },
  { username: 'Alice', message: 'Of course not, the more the merrier!' },
  { username: 'Bob', message: 'Yeah, come on in.' },
  { username: 'Charlie', message: 'Thanks!' }
];

export default function TransactionId({
  params,
}: {
  params: { groupId: string ,transactionId:string};
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');

  console.log("param : ",params)
  
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onChangeHandler = (event: any) => {
    setComment(event.target.value);
  };

  const addCommentHandler = () => {
    console.log(comment);
    setOpen(false);
  };

  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-5xl ">
        <Grid numCols={1} className="gap-2">
          <Col numColSpan={1}>
            <Card style={{ height: '500px' }} className="bg-no-repeat bg-center bg-cover bg-[url('https://www.gstatic.com/webp/gallery/4.sm.jpg')] bg-blend-mulitply">
              <Metric className='text-5xl	text-white	'>Payment Title</Metric>
              <Text className="mt-3 text-1xl text-slate-100	" style={{ marginLeft: '7px' }}>
                Created At: 27/05/03
              </Text>
              <Text className="text-1xl text-slate-100"  style={{ marginLeft: '7px' }}>Updated At: 27/05/03</Text>
              <Flex justifyContent='start'>
                <Title className='text-1xl text-white	'>Type </Title>
                <Subtitle className='ml-2 text-2xl text-slate-200	'>Food</Subtitle>
              </Flex> 
            </Card>
          </Col>
          <Card>
            <Flex>
              <Metric>Comments</Metric>
              <div>
                <Button onClick={handleOpen} size="xs" variant="primary">
                  Add Comment
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500
                    }
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <form>
                        <Typography
                          id="transition-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Type Comment
                        </Typography>
                        <TextField
                          value={comment}
                          onChange={onChangeHandler}
                          className="mt-2 mb-3"
                          fullWidth
                          label="fullWidth"
                          id="fullWidth"
                        />
                        <Button onClick={addCommentHandler}>Add</Button>
                      </form>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </Flex>
            <Card
              style={{ height: '350px', marginTop: '15px' }}
              className="overflow-y-auto"
            >
              <List>
                {messages.map((item, i) => (
                  <Card key={i} className="p-0 m-3" style={{ width: '97%' }}>
                    <CardHeader
                      avatar={
                        // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        //   R
                        // </Avatar>
                        <Avatar
                          alt="username"
                          src="https://www.gstatic.com/webp/gallery/4.sm.jpg"
                        />
                      }
                      title="Shrimp and Chorizo Paella"
                      subheader="September 14, 2016"
                    />

                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Card>
          </Card>
        </Grid>
      </main>
    </>
  );
}
