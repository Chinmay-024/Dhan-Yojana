import { Card, Title, Text, Flex } from '@tremor/react';
import Search from './search';
import style from './page.module.css';


export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Passion+One:wght@700&family=Roboto:wght@100&display=swap');
      </style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>
          <h2 className={`text-9xl ${style.heading}`}>Dhan</h2>
          <h2 className={`text-9xl ${style.heading}`}>Yojana</h2>
          <Text className="text-2xl text-center">
            {/* Split the bill, not the friendship */}
            {/* Split with ease, together or alone, with our app */}
            Keep track, stay on track
          </Text>
        </div>
        <Flex className={style.container}>
          <Card className={`w-1/3 m-3 h-80 ${style.card}`}>
            <Title className='text-center text-2xl'>Manage your expenses on the go with Dhan Yojana </Title>
            <div><Flex className={`${style.element2}`} justifyContent="center" alignItems="baseline"><span className={`material-symbols-outlined ${style.icon}`}>account_balance</span></Flex>
            </div>
          </Card> 
          <Card className={`w-1/3 m-3 h-80 ${style.card}`}>
            <Title className='text-center text-2xl'>Keep track of expenses, no matter the currency</Title>
            <div><Flex className={`${style.element}`} justifyContent="center" alignItems="baseline"><span className={`material-symbols-outlined ${style.icon}`}>currency_exchange</span></Flex>
            </div>
          </Card>
          <Card className={`w-1/3 m-3 h-80 ${style.card}`}> 
          <Title className='text-center text-2xl'>No more financial headaches,save smarter</Title>
          <div><Flex justifyContent="center" alignItems="baseline"><span className={`material-symbols-outlined  ${style.icon} ${style.bounce}`}>Savings</span></Flex>
          </div>
        </Card>
        </Flex>
      </main>
    </>
  );
}
