import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import KitchenSinkApp from '../apps/KitchenSinkApp';
import { ViewWidth } from '@vkontakte/vkui';
import { GetServerSideProps } from 'next';

export interface Props {
  isDesktop: boolean;
}

export default function Index({ isDesktop }: Props) {
  return (
    <>
      <Head>
        <title>VKUI Kitchen Sink (SSR)</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <KitchenSinkApp
        viewWidth={isDesktop ? ViewWidth.DESKTOP : ViewWidth.MOBILE}
        hasMouse={isDesktop}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  return {
    props: {
      isDesktop: query && query.view === 'desktop',
    },
  };
};
