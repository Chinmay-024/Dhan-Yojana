'use client';

import { SetStateAction, useEffect, useState } from 'react';
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

const ExpenseForm = () => {
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
      const test_url = `/api/user/getAllUser`;
      const res = await fetch(test_url);
      console.log(test_url);
      const resData = await res.json();
      setFriends(resData.users);
    };
    getData();
  }, []);
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

    selectedPayers.forEach((friend) => {
      if (amountsP[friend.email] == 0) return;
      users[friend.email] = {
        email: friend.email,
        name: friend.name,
        amount: amountsP[friend.email] || 0,
        owned: true
      };
    });

    selectedOwers.forEach((friend) => {
      if (amountsO[friend.email] == 0) return;
      if (amountsP[friend.email]) {
        users[friend.email] = {
          email: friend.email,
          name: friend.name,
          amount: amountsP[friend.email] - amountsO[friend.email] || 0,
          owned: true
        };
        if (users[friend.email].amount < 0) {
          users[friend.email].amount *= -1;
          users[friend.email].owned = false;
        }
      } else {
        users[friend.email] = {
          email: friend.email,
          name: friend.name,
          amount: amountsO[friend.email] || 0,
          owned: false
        };
      }
    });

    const usersData: UserD[] = [];
    for (const key in users) {
      const user = users[key];
      usersData.push(user);
    }
    console.log(usersData);
    var data = {
      title,
      type,
      totalAmount,
      currency,
      groupId: null,
      users: usersData
    };
    // console.log(data);

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
    // router.replace('/');
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
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setTitle(event.target.value)}
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
                  onChange={(event: { target: { value: string } }) =>
                    setType(event.target.value as string)
                  }
                >
                  <MenuItem value={'Food'}>Food</MenuItem>
                  <MenuItem value={'Housing'}>Housing</MenuItem>
                  <MenuItem value={'Transportation'}>Transportation</MenuItem>
                  <MenuItem value={'Clothing'}>Clothing</MenuItem>
                  <MenuItem value={'Medical'}>Medical</MenuItem>
                  <MenuItem value={'Settle'}>Settle</MenuItem>
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
                      onChange={(event: { target: { value: string } }) =>
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
                  onChange={(e: { target: { value: string } }) =>
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
                    onChange={(event: { target: { value: string } }) =>
                      setCurrency(event.target.value as string)
                    }
                  >
                    <MenuItem value={'USD'}>US dollar (USD)</MenuItem>
                    <MenuItem value={'EUR'}>Euro (EUR)</MenuItem>
                    <MenuItem value={'JPY'}>Japanese yen (JPY)</MenuItem>
                    <MenuItem value={'GBP'}>Pound sterling (GBP)</MenuItem>
                    <MenuItem value={'INR'}>Indian Rupee (INR)</MenuItem>
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
                      onChange={(event: { target: { value: string } }) =>
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

export default ExpenseForm;
