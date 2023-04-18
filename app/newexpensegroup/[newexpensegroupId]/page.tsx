'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  FormHelperText
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PaymentsIcon from '@mui/icons-material/Payments';
import Card from '@mui/material/Card';
import { Button } from '@tremor/react';
import { BanknotesIcon } from '@heroicons/react/24/outline';

interface Friend {
  email: string;
  name: string;
  image: string;
}

interface UserD {
  email: string;
  name: string;
  amount: number;
  owned: boolean;
}

// const friends: Friend[] = [
//   { email: '11', name: 'John' },
//   { email: '12', name: 'Jane' },
//   { email: '13', name: 'Bob' },
//   { email: '14', name: 'Alice' }
// ];

const ExpenseFormGroup = ({
  params
}: {
  params: { newexpensegroupId: string };
}) => {
  const router = useRouter();

  const [selectedPayers, setSelectedPayers] = useState<Friend[]>([]);
  const [selectedOwers, setSelectedOwers] = useState<Friend[]>([]);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [amountsP, setAmountsP] = useState<{ [key: string]: number }>({});
  const [amountsO, setAmountsO] = useState<{ [key: string]: number }>({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [errorP, setErrorP] = useState('');
  const [errorO, setErrorO] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    // Initialize state only on the client-side
    setTitle('');
    setType('');
    setAmountsO({});
    setAmountsP({});
    setCurrency('');
    setTotalAmount(0);
    setErrorP('');
    setErrorO('');

    const getData = async () => {
      console.log('Hu' + params.newexpensegroupId);
      var data = {
        groupId: params.newexpensegroupId
      };
      const JSONdata = JSON.stringify(data);
      const endpoint = '/api/groups/findFriends';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSONdata
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();

      setFriends(result.users);
    };
    getData();
  }, [params.newexpensegroupId]);

  const handlePayerSelect = (event: SelectChangeEvent) => {
    const friendId = event.target.value as string;
    const friend = friends.find((f) => f.email === friendId);

    setSelectedPayers((prevSelectedPayers) => {
      // Only add the friend if it's not already selected
      if (friend && !prevSelectedPayers.some((f) => f.email === friend.email)) {
        setErrorP('');
        return [...prevSelectedPayers, friend];
      }
      setErrorP(`${friend?.name} is already added to Payer`);
      return prevSelectedPayers;
    });
    setAmountsP((prevAmounts) => {
      return { ...prevAmounts, [friendId]: 0 };
    });
  };

  const handleOwerSelect = (event: SelectChangeEvent) => {
    const friendId = event.target.value as string;
    const friend = friends.find((f) => f.email === friendId);

    setSelectedOwers((prevSelectedOwers) => {
      // Only add the friend if it's not already selected
      if (friend && !prevSelectedOwers.some((f) => f.email === friend.email)) {
        setErrorO('');
        return [...prevSelectedOwers, friend];
      }
      setErrorO(`${friend?.name} is already added to Ower`);
      return prevSelectedOwers;
    });
    setAmountsO((prevAmounts) => {
      return { ...prevAmounts, [friendId]: 0 };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var totalOwe = 0;
    selectedOwers.forEach((o) => {
      totalOwe += amountsO[o.email];
    });
    console.log(totalOwe);
    var totalPay = 0;
    selectedPayers.forEach((o) => {
      totalPay += amountsP[o.email];
    });
    console.log(totalPay);

    // check if the sum of all amounts is equal to the total amount
    if (totalOwe !== parseFloat(totalAmount.toString())) {
      alert('Sum of all OWED amounts should be equal to the total amount');
      return;
    }
    if (totalPay !== parseFloat(totalAmount.toString())) {
      alert('Sum of all PAID amounts should be equal to the total amount');
      return;
    }

    const users: {
      [key: string]: {
        email: string;
        name: string;
        amount: number;
        owned: boolean;
      };
    } = {};

    const usersData: UserD[] = [];
    let user;
    selectedPayers.forEach((friend) => {
      if (amountsP[friend.email] == 0) return;
      user = {
        email: friend.email,
        name: friend.name,
        amount: amountsP[friend.email] || 0,
        owned: true
      };
      usersData.push(user);
    });

    selectedOwers.forEach((friend) => {
      if (amountsO[friend.email] == 0) return;
      user = {
        email: friend.email,
        name: friend.name,
        amount: amountsP[friend.email] || 0,
        owned: false
      };
      usersData.push(user);
    });

    console.log(usersData);
    var data = {
      title,
      type,
      totalAmount,
      currency,
      groupId: parseInt(params.newexpensegroupId),
      users: usersData
    };
    console.log(data);

    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/payments/addPayment';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    setTitle('');
    setType('');
    setAmountsO({});
    setAmountsP({});
    setCurrency('');
    setTotalAmount(0);
    setErrorP('');
    setErrorO('');
    router.replace(`/group/${params.newexpensegroupId}`);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl" style={{ margin: 'auto' }}>
      <Card
        sx={{ maxWidth: '50rem' }}
        style={{ margin: 'auto', textAlign: 'center', padding: '1rem' }}
      >
        <Typography
          variant="h4"
          component="h2"
          style={{ marginBottom: '1rem' }}
        >
          ADD EXPENSE
        </Typography>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <FormControl>
              <TextField
                label="Title"
                value={title}
                required
                onChange={(event) => setTitle(event.target.value)}
                margin="normal"
              />
              <FormControl style={{ marginTop: '1rem' }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  required
                  label="Type"
                  onChange={(event) => setType(event.target.value as string)}
                >
                  <MenuItem value={'Food'}>Food</MenuItem>
                  <MenuItem value={'Housing'}>Housing</MenuItem>
                  <MenuItem value={'Transportation'}>Transportation</MenuItem>
                  <MenuItem value={'Clothing'}>Clothing</MenuItem>
                  <MenuItem value={'Medical'}>Medical</MenuItem>
                  <MenuItem value={'Miscellaneous'}>Miscellaneous</MenuItem>
                </Select>
              </FormControl>
              <div>
                <FormControl fullWidth style={{ marginTop: '1.5rem' }}>
                  <InputLabel id="demo-simple-select-label">
                    Select Payers
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={'Select Payers'}
                    label="Select Payers"
                    onChange={handlePayerSelect}
                    error={!!errorP}
                  >
                    {friends.map((friend) => (
                      <MenuItem key={friend.email} value={friend.email}>
                        {friend.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errorP}</FormHelperText>
                </FormControl>
              </div>
              <div style={{ marginTop: '1rem' }}>
                {selectedPayers.map((friend, index) => (
                  <div key={friend.email}>
                    <Typography variant="body1">{friend.name}</Typography>
                    <TextField
                      type="number"
                      label="Amount"
                      value={amountsP[friend.email] || ''}
                      onChange={(event) =>
                        setAmountsP({
                          ...amountsP,
                          [friend.email]: parseFloat(event.target.value) || 0
                        })
                      }
                      margin="normal"
                    />
                  </div>
                ))}
              </div>
            </FormControl>
            <FormControl style={{ marginLeft: '1rem' }}>
              <FormControl fullWidth>
                <TextField
                  label="Total Amount"
                  variant="outlined"
                  required
                  value={totalAmount}
                  onChange={(e) =>
                    setTotalAmount(parseInt(e.target.value) || 0)
                  }
                  margin="normal"
                />

                <FormControl style={{ marginTop: '1rem' }}>
                  <InputLabel id="demo-simple-select-label">
                    Currency
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    required
                    label="Currency"
                    onChange={(event) =>
                      setCurrency(event.target.value as string)
                    }
                  >
                    <MenuItem value={'US dollar (USD)'}>
                      US dollar (USD)
                    </MenuItem>
                    <MenuItem value={'Euro (EUR)'}>Euro (EUR)</MenuItem>
                    <MenuItem value={'Japanese yen (JPY)'}>
                      Japanese yen (JPY)
                    </MenuItem>
                    <MenuItem value={'Pound sterling (GBP)'}>
                      Pound sterling (GBP)
                    </MenuItem>
                    <MenuItem value={'Indian Rupee (INR)'}>
                      Indian Rupee (INR)
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl style={{ marginTop: '1.5rem' }}>
                  <InputLabel id="demo-simple-select-label">
                    Select Owers
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={'Select Owers'}
                    label="Select Owers"
                    onChange={handleOwerSelect}
                    error={!!errorO}
                  >
                    {friends.map((friend) => (
                      <MenuItem key={friend.email} value={friend.email}>
                        {friend.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errorO}</FormHelperText>
                </FormControl>
              </FormControl>
              <div style={{ marginTop: '1rem' }}>
                {selectedOwers.map((friend, index) => (
                  <div key={friend.email}>
                    <Typography variant="body1">{friend.name}</Typography>
                    <TextField
                      type="number"
                      label="Amount"
                      value={amountsO[friend.email] || ''}
                      onChange={(event) =>
                        setAmountsO({
                          ...amountsO,
                          [friend.email]: parseFloat(event.target.value) || 0
                        })
                      }
                      margin="normal"
                    />
                  </div>
                ))}
              </div>
            </FormControl>
          </div>
          <Button
            type="submit"
            icon={BanknotesIcon}
            size="xl"
            style={{ marginTop: '1.5rem' }}
            color="emerald"
          >
            Submit
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default ExpenseFormGroup;
