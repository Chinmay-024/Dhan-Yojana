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
  Text,
  Subtitle
} from '@tremor/react';
import { Card } from '@tremor/react';

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

const NewGroup = () => {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [error1, setError1] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [error3, setError3] = useState<boolean>(false);
  const [addedUser, setAddedUser] = useState<
    Array<{ email: string; name: string }>
  >([]);

  const addUserHandler = (value: String) => {
    const val = Number(value);
    const f = addedUser.find((user) => {
      return user.email === users[val].email;
    });
    console.log(f, users[val].name);
    if (f === undefined) {
      setAddedUser((prevState) => {
        return [
          ...prevState,
          { name: users[val].name, email: users[val].email }
        ];
      });
    }

    // })
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

  const clickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      title.trim().length !== 0 &&
      description.trim().length !== 0 &&
      image.trim().length !== 0
    ) {
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
    <main className="p-4 md:p-10 mx-auto max-w-7xl" style={{ margin: 'auto' }}>
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
          </form>
        </Card>
        <Card className="max-w-xs">
          <Card className="max-w-xs">
            <Title>Add users</Title>
            <Dropdown
              className="mt-2"
              onValueChange={addUserHandler}
              placeholder="user"
            >
              {users.map((user, i) => (
                <DropdownItem key={i} value={String(i)} text={`${user.name}`} />
              ))}
            </Dropdown>
          </Card>
          <Card>
            <Title className='text-center'>Added</Title>
            <List>
              {addedUser.map((user, i) => (
                <ListItem key={i + 1} className="mx-auto" >
                  <div className='flex flex-col items-center justify-center'>
                    <div>
                      <Text>{user.name}</Text>
                    </div>
                    <div>
                      <Subtitle>{user.email}</Subtitle>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </Card>
        </Card>
      </Flex>
    </main>
  );
};

export default NewGroup;
