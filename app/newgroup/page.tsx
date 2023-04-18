'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
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
import { authOptions } from '../../pages/api/auth/[...nextauth]';

const friends = [
  { id: 11, name: 'John' },
  { id: 12, name: 'Jane' },
  { id: 13, name: 'Bob' },
  { id: 14, name: 'Alice' }
];

const users = [
  { name: 'John Doe', email: 'johndoe@example.com' },
  { name: 'Jane Smith', email: 'janesmith@example.com' },
  { name: 'Bob Johnson', email: 'bobjohnson@example.com' },
  { name: 'Alice Williams', email: 'alicewilliams@example.com' }
  // Add as many objects as you need...
];

const NewGroup = async() => {
  const {user} = await getServerSession(authOptions);
  const [title, setTitle] = useState('');
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
        userId: user.id,
      })
    });
    const resData = await response.json();
    console.log('on createGroup :', response);
    if (response.status === 200) {
      setStatus(1);
    }
    else{
      setStatus(2);
    }
    setIsCreatingGroup(false);
  };

  // const addUserHandler = (value: String) => {
  //   const val = Number(value);
  //   const f = addedUser.find((user) => {
  //     return user.email === users[val].email;
  //   });
  //   console.log(f, users[val].name);
  //   if (f === undefined) {
  //     setAddedUser((prevState) => {
  //       return [
  //         ...prevState,
  //         { name: users[val].name, email: users[val].email }
  //       ];
  //     });
  //   }

  //   // })
  // };

  // const removeUserHandler = (event: any) => {
  //   const email = event.currentTarget.getAttribute('data-email');
  //   let newstate = [...addedUser];
  //   newstate = newstate.filter((obj) => obj.email !== email);
  //   setAddedUser(newstate);
  // };

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
      if(status===1){
          setTitle('');
          setdescription('');
          setImage('');
      }
      return;
    }
    // if (addedUser.length === 0) {
    //   setError4(true);
    // }
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
              <Flex justifyContent='center' className='flex-col mt-4'>
              {isCreatingGroup && (
                <>
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
                <Text className='mt-2' color='blue'> Submitting The Form</Text></>
              )}
              </Flex>
              <Flex>
                {status===1 && !isCreatingGroup &&  <Text className='mt-2 text-center m-auto' color='green'>SuccessFully Created the Group</Text>}
                {status===2 && !isCreatingGroup &&  <Text className='mt-2 text-center m-auto' color='red'>Failed to create Group</Text>}
              </Flex>
            </form>
          </Card>
        </Flex>
      </main>
    </NoSsr>
  );
};

export default NewGroup;

{
  /* <Card
            className="max-w-xs"
            style={{ border: `${error4 ? '1px solid red' : ''}` }}
          >
            <Card className="max-w-xs">
              <Title>Add users</Title>
              <Dropdown
                className="mt-2"
                onValueChange={addUserHandler}
                placeholder="user"
              >
                {users.map((user, i) => (
                  <DropdownItem
                    key={i}
                    value={String(i)}
                    text={`${user.name}`}
                  />
                ))}
              </Dropdown>
            </Card>
            <Card>
              <Title className="text-center">Added</Title>
              <List>
                {addedUser.map((user, i) => (
                  <ListItem key={i + 1} className="block">
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <Flex>
                          <Text color="stone">{user.name}</Text>
                          <span
                            onClick={removeUserHandler}
                            data-email={`${user.email}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1"
                              stroke="currentColor"
                              className="w-4 h-4 ml-2"
                              color="red"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </span>
                        </Flex>
                      </div>
                      <div>
                        <Text color="gray">{user.email}</Text>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Card> */
}
