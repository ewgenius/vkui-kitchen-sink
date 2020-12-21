import { NavigatorProvider, WithNavigator } from '@vkontakte/router';
import {
  ConfigProvider,
  AdaptivityProvider,
  AdaptivityProps,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Scheme,
  SimpleCell,
  SplitCol,
  SplitLayout,
  View,
  ViewWidth,
  WebviewType,
  withAdaptivity,
  usePlatform,
  VKCOM,
  AppRoot,
} from '@vkontakte/vkui';
import { PropsWithChildren, ReactElement, useState } from 'react';
import styles from './KitchenSinkApp.module.css';
import { KitchenSinkContext } from './KitchenSinkContext';
import { SchemeToggle } from '../components/SchemeToggle';

export interface NaviagtionItem {
  route: string;
  title: string;
  icon: ReactElement;
}
export interface LayoutProps
  extends PropsWithChildren<AdaptivityProps>,
    WithNavigator {
  navigationItems: NaviagtionItem[];
}

export const Layout = withAdaptivity(
  ({ viewWidth, children, page }: LayoutProps) => {
    const platform = usePlatform();
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    const hasPanel = platform !== VKCOM;

    return (
      <SplitLayout
        className={styles.layout}
        header={hasPanel && <PanelHeader separator={false} />}
      >
        {isDesktop && (
          <SplitCol fixed width="280px" maxWidth="280px"></SplitCol>
        )}

        <SplitCol
          animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? '560px' : '100%'}
          maxWidth={isDesktop ? '560px' : '100%'}
        >
          {children}
        </SplitCol>
      </SplitLayout>
    );
  },
  {
    viewWidth: true,
  }
);

export const App = withAdaptivity(
  ({ viewWidth }: AdaptivityProps) => {
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    return (
      <SplitLayout
        className={styles.layout}
        header={<PanelHeader separator={false} />}
      >
        {isDesktop && (
          <SplitCol fixed width="280px" maxWidth="280px">
            <Panel>
              <PanelHeader
                left={<img style={{ height: 36 }} src="/logo.png" />}
                right={<SchemeToggle />}
              />
              <SimpleCell>Panels</SimpleCell>
              <SimpleCell>Modals</SimpleCell>
              <SimpleCell>Cells</SimpleCell>
            </Panel>
          </SplitCol>
        )}

        <SplitCol
          animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? '560px' : '100%'}
          maxWidth={isDesktop ? '560px' : '100%'}
        >
          <View activePanel="1">
            <Panel id="1">
              <PanelHeader left={<PanelHeaderBack />}>
                Super long header text which should be ellipsized
              </PanelHeader>
              <Group>
                <div style={{ height: 200 }} />
              </Group>
              <Group>
                <div style={{ height: 200 }} />
              </Group>
              <Group>
                <div style={{ height: 200 }} />
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    );
  },
  {
    viewWidth: true,
  }
);

export default function KitchenSinkApp({ embedded }: { embedded?: boolean }) {
  const [scheme, setScheme] = useState<Scheme>(Scheme.BRIGHT_LIGHT);
  return (
    <KitchenSinkContext.Provider
      value={{
        scheme,
        setScheme,
      }}
    >
      <ConfigProvider
        scheme={scheme}
        isWebView={true}
        webviewType={WebviewType.INTERNAL}
      >
        <AdaptivityProvider>
          <AppRoot embedded={embedded}>
            <NavigatorProvider
              routes={[
                {
                  name: 'Home',
                },
              ]}
              config={{
                defaultRoute: 'Home',
                rootPage: '',
              }}
            >
              <App />
            </NavigatorProvider>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </KitchenSinkContext.Provider>
  );
}
