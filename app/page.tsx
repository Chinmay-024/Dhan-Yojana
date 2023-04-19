'use client';

import { Card, Title, Text, Flex } from '@tremor/react';
import Search from './search';
import style from './page.module.css';
import gif from './qwe.gif';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { NoSsr } from '@mui/material';

export default async function IndexPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // introduce a 3-second delay
  }, []);
  return (
    <NoSsr>
      {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Passion+One:wght@700&family=Roboto:wght@100&display=swap');
      </style> */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Passion+One:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=block"
      />
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className={`${style.title}`}>
          <div>
            <h2 className={`text-9xl ${style.heading}`}>Dhan</h2>
            <h2
              className={`text-9xl ${style.heading}`}
              style={{ marginBottom: '1.5rem' }}
            >
              Yojana
            </h2>
            <Text
              className="text-2xl text-center"
              style={{ marginTop: '1rem' }}
            >
              {/* Split the bill, not the friendship */}
              {/* Split with ease, together or alone, with our app */}
              Keep track, stay on track
            </Text>
          </div>
          <div>
            <Image className={`${style.image}`} alt="None" src={gif} />
          </div>
        </div>
        <Flex className={style.container}>
          <Card className={`w-1/3 m-3 h-80 ${style.card}`}>
            <Title className="text-center text-2xl">
              Manage your expenses on the go with Dhan Yojana{' '}
            </Title>
            <div>
              <Flex
                className={`${style.element2}`}
                justifyContent="center"
                alignItems="baseline"
              >
                <span className={`material-symbols-outlined ${style.icon}`}>
                  account_balance
                </span>
              </Flex>
            </div>
          </Card>
          <Card className={`w-1/3 m-3 h-80 ${style.card}`}>
            <Title className="text-center text-2xl">
              Keep track of expenses, no matter the currency
            </Title>
            <div>
              <Flex
                className={`${style.element}`}
                justifyContent="center"
                alignItems="baseline"
              >
                <span className={`material-symbols-outlined ${style.icon}`}>
                  currency_exchange
                </span>
              </Flex>
            </div>
          </Card>
          <Card className={`w-1/3 m-3 h-80 ${style.card}`}>
            <Title className="text-center text-2xl">
              No more financial headaches,save smarter
            </Title>
            <div>
              <Flex justifyContent="center" alignItems="baseline">
                <span
                  className={`material-symbols-outlined  ${style.icon} ${style.bounce}`}
                >
                  Savings
                </span>
              </Flex>
            </div>
          </Card>
        </Flex>
      </main>
    </NoSsr>
  );
}
