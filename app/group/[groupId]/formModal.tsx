'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const Adduser = ({ userData ,addCommentHandler }: any) => {
  const [error4, setError4] = useState<boolean>(false);
  const [addedUser, setAddedUser] = useState<
    Array<{ email: string; name: string }>
  >([]);
  console.log('in modal', userData);
  const addUserHandler = (value: String) => {
    const val = Number(value);
    const f = addedUser.find((user) => {
      return user.email === userData[val].email;
    });
    console.log(f, userData[val].name);
    if (f === undefined) {
      setAddedUser((prevState) => {
        return [
          ...prevState,
          { name: userData[val].name, email: userData[val].email }
        ];
      });
    }

    // })
  };

  const removeUserHandler = (event: any) => {
    const email = event.currentTarget.getAttribute('data-email');
    let newstate = [...addedUser];
    newstate = newstate.filter((obj) => obj.email !== email);
    setAddedUser(newstate);
  };

  const submitHandler = (e:any) => {
    e.preventDefault();
    
    addCommentHandler(addedUser);
  }
  return (
    <Flex className="flex-col">
      <Card className="max-100 mt-2 mb-3">
        <Title>Add users</Title>
        <Dropdown
          className="mt-2"
          onValueChange={addUserHandler}
          placeholder="user"
        >
          {userData &&
            userData.map((user: any, i: any) => (
              <DropdownItem key={i} value={String(i)} text={`${user.name}`} />
            ))}
        </Dropdown>
      </Card>
      <Card>
        <Title className="text-center">Added</Title>
        <List>
          {addedUser.map((user, i) => (
            <ListItem key={i + 1} className="block">
              <div className="flex flex-col">
                <div>
                  <Flex justifyContent='between'>
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
        <form>
        <Flex justifyContent='center'>
          <Button
            size="xl"
            onClick={submitHandler}
            style={{ marginTop: '1.5rem' }}
            color="emerald"
          >
            Add
          </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
};

export default Adduser;
