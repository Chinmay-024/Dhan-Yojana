'use client';
import { useRef } from 'react';

import { useRouter } from 'next/navigation';
import PaymentsIcon from '@mui/icons-material/Payments';
import {Button,FormControl,TextField} from '@mui/material';
import { Card, Title, Text, Flex } from '@tremor/react';

export default function Newexpense() {
  const router = useRouter();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: { preventDefault: () => void; }) {
    console.log("Hello");
    event.preventDefault();

    const enteredTitle = titleInputRef.current?.value;
    const enteredAmount = amountInputRef.current?.value;

    const expenseData = {
      title: enteredTitle,
      Amount: enteredAmount,
    };

    console.log(expenseData);
  }
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl" style={{margin:'auto'}}>
      <Card className={`w-1/3 m-2 h-80`} style={{margin:'auto'}} >            
        <form onSubmit={submitHandler} style={{textAlign: 'center'}}>
          <FormControl >
            <TextField id="standard-basic" label="Title" required variant="standard" inputRef={titleInputRef} style={{marginTop:'1rem'}}/>
            <TextField id="standard-basic" label="Amount" required variant="standard" inputRef={amountInputRef} style={{marginTop:'1rem'}}/>
            <Button variant="contained" type="submit" style={{marginTop:"1.5rem"}} endIcon={<PaymentsIcon />}>Submit</Button>
          </FormControl>
        </form>
      </Card> 
    </main>
  );
}
