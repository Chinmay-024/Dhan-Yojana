'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Title,
  TextInput,
  List,
  ListItem,
  DropdownItem,
  Dropdown,
  Text
} from '@tremor/react';
import { Card } from '@tremor/react';
import { NoSsr } from '@mui/material';
import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import NotAuthenticated from '../notAuth';

const NewGroup = () => {
  // const router = useRouter();
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});
  const [description, setdescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [error1, setError1] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [error3, setError3] = useState<boolean>(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);
  const [error4, setError4] = useState<boolean>(false);
  const [addedUser, setAddedUser] = useState<
    Array<{ email: string; name: string }>
  >([]);

  useEffect(() => {
    const a = setTimeout(() => {
      if (typeof window !== 'undefined') {
        let user2 =
          localStorage.getItem('user') ||
          '{"id":"none","name":"none","email":"none"}';
        setUser(JSON.parse(user2));
        setUserId(JSON.parse(user2).id);
        console.log(user2);
      }
    }, 2000);
    return () => {
      clearTimeout(a);
    };
  }, []);
  if (userId == '') {
    return (
      <>
        <div></div>
      </>
    );
  }
  if (userId == undefined || userId == 'none') {
    return (
      <>
        <NotAuthenticated></NotAuthenticated>
      </>
    );
  }
  const createGroup = async () => {
    setIsCreatingGroup(true);
    console.log(
      JSON.stringify({
        title: title,
        description: description,
        image: image
      })
    );
    const response = await fetch('/api/groups/addNewGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        image: image,
        userId: userId
      })
    });
    const resData = await response.json();
    console.log('on createGroup :', response);
    if (response.status === 200) {
      setStatus(1);
    } else {
      setStatus(2);
    }
    setIsCreatingGroup(false);
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const descHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdescription(event.target.value);
  };
  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  const clickHandler = (e: any) => {
    e.preventDefault();
    if (
      title.trim().length !== 0 &&
      description.trim().length !== 0 &&
      image.trim().length !== 0
    ) {
      // addedUser.length !== 0
      console.log('called the post request');
      createGroup();
      if (status === 1) {
        setTitle('');
        setdescription('');
        setImage('');
      }
      return;
    }

    if (title.trim().length === 0) {
      setError1(true);
    }
    if (description.trim().length === 0) {
      setError2(true);
    }
    if (image.trim().length === 0) {
      setError3(true);
    }
  };
  return (
    <NoSsr>
      <main
        className="p-4 md:p-10 mx-auto max-w-7xl"
        style={{ margin: 'auto' }}
      >
        <Flex justifyContent="evenly">
          <Card
            className="max-w-lg "
            // sx={{ maxWidth: '' }}
            // style={{ margin: 'auto', textAlign: 'center', padding: '1rem' }}
          >
            <form>
              {/* <div style={{display:"flex", justifyContent:"center",flexWrap: "wrap"}}> */}
              <Title>Title</Title>
              <TextInput
                error={error1}
                placeholder="Enter the Title of group"
                value={title}
                onChange={titleHandler}
              />
              <Title className="mt-6">Description</Title>
              <TextInput
                error={error2}
                placeholder="describe your Group"
                value={description}
                onChange={descHandler}
              />
              <Title className="mt-6">Image</Title>
              <TextInput
                error={error3}
                placeholder="provide LINK for your image"
                value={image}
                onChange={imageHandler}
              />
              <Flex className="justify-center">
                <Button className="mt-9" color={'green'} onClick={clickHandler}>
                  <Flex>
                    <span style={{ margin: '2px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <span> Create Group</span>
                  </Flex>
                </Button>
              </Flex>
              <Flex justifyContent="center" className="flex-col mt-4">
                {isCreatingGroup && (
                  <>
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                    <Text className="mt-2" color="blue">
                      {' '}
                      Submitting The Form
                    </Text>
                  </>
                )}
              </Flex>
              <Flex>
                {status === 1 && !isCreatingGroup && (
                  <Text className="mt-2 text-center m-auto" color="green">
                    SuccessFully Created the Group
                  </Text>
                )}
                {status === 2 && !isCreatingGroup && (
                  <Text className="mt-2 text-center m-auto" color="red">
                    Failed to create Group
                  </Text>
                )}
              </Flex>
            </form>
          </Card>
        </Flex>
      </main>
    </NoSsr>
  );
};

export default NewGroup;
