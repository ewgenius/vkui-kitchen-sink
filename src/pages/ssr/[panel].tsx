import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import {
  ConfigProvider,
  AdaptivityProvider,
  ViewWidth,
  AppRoot,
  SplitCol,
  SplitLayout,
  View,
  Panel,
  PanelHeader,
  Group,
  CellButton,
  Placeholder,
} from '@vkontakte/vkui';
import {
  Icon56ArchiveOutline,
  Icon56ArticleOutline,
  Icon56ServicesOutline,
} from '@vkontakte/icons';

export interface Props {
  isDesktop: boolean;
}

const Navigation = ({ isDesktop }) => {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <Link
          key={`link-${i}`}
          href={`/ssr/panel${i}?mode=${isDesktop ? 'desktop' : 'mobile'}`}
          passHref
        >
          <CellButton Component="a">Panel {i}</CellButton>
        </Link>
      ))}
    </>
  );
};

export default function Index({ isDesktop }: Props) {
  const { query } = useRouter();
  const panel = (query.panel as string) || 'panel1';
  return (
    <>
      <Head>
        <title>VKUI Kitchen Sink (SSR)</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ConfigProvider isWebView>
        <AdaptivityProvider
          viewWidth={isDesktop ? ViewWidth.DESKTOP : ViewWidth.MOBILE}
          hasMouse={isDesktop}
        >
          <AppRoot>
            <SplitLayout
              header={<PanelHeader shadow separator={false} />}
              style={{ justifyContent: 'center' }}
            >
              {isDesktop && (
                <SplitCol fixed width="280px" maxWidth="280px">
                  <Panel>
                    <PanelHeader>test</PanelHeader>
                    <Group>
                      <Navigation isDesktop={isDesktop} />
                    </Group>
                  </Panel>
                </SplitCol>
              )}
              <SplitCol
                spaced={isDesktop}
                animate={!isDesktop}
                width="580px"
                maxWidth="580px"
              >
                <View activePanel={panel}>
                  <Panel id="panel1">
                    <PanelHeader>Panel 1</PanelHeader>
                    {!isDesktop && (
                      <Group>
                        <Navigation isDesktop={isDesktop} />
                      </Group>
                    )}
                    <Group>
                      <Placeholder icon={<Icon56ServicesOutline />} />
                    </Group>
                  </Panel>
                  <Panel id="panel2">
                    <PanelHeader>Panel 2</PanelHeader>
                    {!isDesktop && (
                      <Group>
                        <Navigation isDesktop={isDesktop} />
                      </Group>
                    )}
                    <Group>
                      <Placeholder icon={<Icon56ArchiveOutline />} />
                    </Group>
                  </Panel>
                  <Panel id="panel3">
                    <PanelHeader>Panel 3</PanelHeader>
                    {!isDesktop && (
                      <Group>
                        <Navigation isDesktop={isDesktop} />
                      </Group>
                    )}
                    <Group>
                      <Placeholder icon={<Icon56ArticleOutline />} />
                    </Group>
                  </Panel>
                </View>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  return {
    props: {
      isDesktop: query && query.mode === 'desktop',
    },
  };
};
