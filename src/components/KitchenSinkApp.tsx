import { Icon28SunOutline, Icon28MoonOutline } from '@vkontakte/icons';
import { NavigatorProvider } from '@vkontakte/router';
import {
  ConfigProvider,
  AdaptivityProvider,
  AdaptivityProps,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
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
import {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import styles from './KitchenSinkApp.module.css';
import { KitchenSinkContext } from './KitchenSinkContext';

export interface LayoutProps extends PropsWithChildren<AdaptivityProps> {}

export const Layout = withAdaptivity(
  ({ viewWidth, children }: LayoutProps) => {
    const platform = usePlatform();
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    const hasPanel = platform !== VKCOM;

    return (
      <NavigatorProvider>
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
      </NavigatorProvider>
    );
  },
  {
    viewWidth: true,
  }
);

export const App = withAdaptivity(
  ({ viewWidth }: AdaptivityProps) => {
    const { scheme, setScheme } = useContext(KitchenSinkContext);
    const toggleScheme = useCallback(
      () =>
        setScheme(
          scheme === Scheme.BRIGHT_LIGHT
            ? Scheme.SPACE_GRAY
            : Scheme.BRIGHT_LIGHT
        ),
      [scheme]
    );
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
                right={
                  <PanelHeaderButton onClick={toggleScheme}>
                    {scheme === Scheme.BRIGHT_LIGHT ? (
                      <Icon28MoonOutline />
                    ) : (
                      <Icon28SunOutline />
                    )}
                  </PanelHeaderButton>
                }
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
    <AppRoot embedded={embedded}>
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
            <App />
          </AdaptivityProvider>
        </ConfigProvider>
      </KitchenSinkContext.Provider>
    </AppRoot>
  );
}
