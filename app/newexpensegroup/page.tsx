'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button, FormControl, TextField } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
// import { Card } from "@tremor/react";
import Card from '@mui/material/Card';

interface Group {
  name: string;
  members: Member[];
}

interface Member {
  id: number;
  name: string;
}

function GroupPage() {
  // mock data for the group and its members
  const group: Group = {
    name: "My Group",
    members: [
      { id: 11, name: "John" },
      { id: 12, name: "Jane" },
      { id: 13, name: "Bob" },
      { id: 14, name: "John" },
      { id: 15, name: "Jane" },
      { id: 16, name: "Bob" },
    ],
  };

  // state to hold the amount values for each member
  const [amounts, setAmounts] = useState<{ [key: number]: number }>({});
  const titleInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  // function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredTitle = titleInputRef.current?.value;
    const enteredAmount = amountInputRef.current?.value;

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
    };

    // calculate the sum of all amounts
    const totalAmount = Object.values(amounts).reduce(
      (acc, curr) => acc + curr,
      0
    );

    // check if the sum of all amounts is equal to the total amount
    if (totalAmount !== parseFloat(enteredAmount)) {
      alert("Sum of all amounts should be equal to the total amount");
      return;
    }

    console.log(expenseData);
    console.log(amounts);
    // send the amounts data to the server here
    setAmounts({});
  };

  return (
    <main
      className="p-4 md:p-10 mx-auto max-w-7xl"
      style={{ margin: "auto" }}
    >
        <Card sx={{ maxWidth: '50rem' }} style={{ margin: "auto", textAlign: "center" ,padding:"1rem"}}>
        <h2 className={`text-4xl`}>{group.name}</h2>

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <div style={{display:"flex", justifyContent:"center",flexWrap: "wrap"}}>
          <FormControl>
            <TextField
              id="standard-basic"
              label="Title"
              required
              variant="standard"
              inputRef={titleInputRef}
              style={{ marginTop: "1rem" }}
            />
            <TextField
              id="standard-basic"
              label="Total Amount"
              required
              type="number"
              variant="standard"
              inputRef={amountInputRef}
              style={{ marginTop: "1rem" }}
            />
          </FormControl>
          <div style={{ textAlign: "center" }}>
            <ul>
                {group.members.map((member) => (
                <li key={member.id} style={{display:'flex', justifyContent:"center"}}>
                    <span style={{marginTop:'2.3rem', marginRight:'1rem', marginLeft: '2rem'}}>{member.name}</span>
                    <TextField id="standard-basic" label="Amount" variant="standard"  style={{marginTop:'1rem'}}
                    type="number"
                    value={amounts[member.id] || ""}
                    onChange={(event) =>
                        setAmounts({
                        ...amounts,
                        [member.id]: parseFloat(event.target.value) || 0,
                        })
                    }
                    />
                </li>
                ))}
                </ul>
            </div>
          </div>
          <FormControl >
            <div></div>
            <Button variant="outlined" type="submit" style={{marginTop:"1.5rem"}} endIcon={<PaymentsIcon />}>Submit</Button>
          </FormControl>
        </form>
      </Card> 
    </main>
  );
}

export default GroupPage;
