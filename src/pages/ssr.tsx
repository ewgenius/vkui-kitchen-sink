import React, { FC } from 'react';
import Head from 'next/head';
import { SSRWrapper } from '@vkontakte/vkui';
import KitchenSinkApp from '../apps/KitchenSinkApp';
import { GetServerSideProps } from 'next';

export interface SSRPageProps {
  ssrValue: string;
}

export const SSRPage: FC<SSRPageProps> = ({ ssrValue }) => {
  return (
    <>
      <Head>
        <title>VKUI Kitchen Sink (SSR)</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <SSRWrapper>
        <KitchenSinkApp ssrValue={ssrValue} />
      </SSRWrapper>
    </>
  );
};

export default SSRPage;

export const getServerSideProps: GetServerSideProps<SSRPageProps> = async () => {
  return {
    props: {
      ssrValue: 'SSR: ' + Date.now(),
    },
  };
};
