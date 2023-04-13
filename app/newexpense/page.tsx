'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuItem, TextField, Button, Typography, FormControl } from '@mui/material';
import PaymentsIcon from "@mui/icons-material/Payments";
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';

const friends = [
  { id: 11, name: "John" },
  { id: 12, name: "Jane" },
  { id: 13, name: "Bob" },
  { id: 14, name: "Alice" },
];

const ExpenseForm = () => {
  const router = useRouter();

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [title, setTitle] = useState("");
  const [amounts, setAmounts] = useState<{ [key: number]: number }>({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  const handleFriendSelect = (event) => {
    const friendId = parseInt(event.target.value);
    const friend = friends.find((f) => f.id === friendId);
    setSelectedFriends((prevSelectedFriends) => {
      // Only add the friend if it's not already selected
      if (!prevSelectedFriends.some((f) => f.id === friend.id)) {
        return [...prevSelectedFriends, friend];
      }
      setError(`${friend.name} is already selected`);
      return prevSelectedFriends;
    });
    setAmounts((prevAmounts) => {
      return { ...prevAmounts, [friendId]: 0 };
    });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // calculate the sum of all amounts
    const total_amount = Object.values(amounts).reduce(
      (acc, curr) => acc + curr,
      0
    );

    // check if the sum of all amounts is equal to the total amount
    if (total_amount !== parseFloat(totalAmount)) {
      alert("Sum of all amounts should be equal to the total amount");
      return;
    }

    const expenses = {};
    selectedFriends.forEach((friend) => {expenses[friend.id] = {
        id: friend.id,
        name: friend.name,
        amount: amounts[friend.id],
      };      
    });

    console.log(expenses);
    router.replace('/');
  };
  

  return (
    <main
      className="p-4 md:p-10 mx-auto max-w-7xl"
      style={{ margin: "auto" }}
    >
        <Card sx={{ maxWidth: '50rem' }} style={{ margin: "auto", textAlign: "center" ,padding:"1rem"}}>
        
    <form onSubmit={handleSubmit}>
      <div style={{display:"flex", justifyContent:"center",flexWrap: "wrap"}}>
      <FormControl>
        <Typography variant="h6" component="h2">
          Add Expense
        </Typography>
        <TextField
          label="Title"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
          margin="normal"
        />      
      <TextField
            label="Total Amount"
            variant="outlined"
            required
            value={totalAmount}
            onChange={(e) => setTotalAmount(parseInt(e.target.value) || 0)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}

          margin="normal"
          />
      </FormControl>
      <div>
        <Typography variant="h6" component="h2">
          Select Friends
        </Typography>
        <TextField
          select
          defaultValue={'Friends'}
          label="Friends"
          onChange={handleFriendSelect}
          margin="normal"
          error={!!error}
          helperText={error}
        >
          {friends.map((friend) => (
            <MenuItem key={friend.id} value={friend.id}>
              {friend.name}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <div>
          {selectedFriends.map((friend, index) => (
            <div key={friend.id}>
              <Typography variant="body1">{friend.name}</Typography>
              <TextField
                type="number"
                label="Amount"        
                value={amounts[friend.id] || ""}
                onChange={(event) =>
                    setAmounts({
                    ...amounts,
                    [friend.id]: parseFloat(event.target.value) || 0,
                    })
                }
                margin="normal"
              />
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" variant="outlined" color="primary" style={{marginTop:"1.5rem"}} endIcon={<PaymentsIcon />}>
        Submit
      </Button>
    </form>
    </Card> 
    </main>
  );
};

export default ExpenseForm;
