import {
  Icon28ServicesOutline,
  Icon28SunOutline,
  Icon28MoonOutline,
} from '@vkontakte/icons';
import {
  AdaptivityProps,
  AppRoot,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  Scheme,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Switch,
  View,
  ViewWidth,
  WebviewType,
  withAdaptivity,
} from '@vkontakte/vkui';
import { useCallback, useContext, useState } from 'react';
import styles from './KitchenSinkApp.module.css';
import { KitchenSinkContext } from './KitchenSinkContext';

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
              <SimpleCell before={<Icon28ServicesOutline />}>Panels</SimpleCell>
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
              <PanelHeader>Modals</PanelHeader>
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

export default function KitchenSinkApp() {
  const [scheme, setScheme] = useState<Scheme>(Scheme.BRIGHT_LIGHT);
  return (
    <KitchenSinkContext.Provider
      value={{
        scheme,
        setScheme,
      }}
    >
      <AppRoot
        scheme={scheme}
        isWebView={true}
        webviewType={WebviewType.INTERNAL}
      >
        <App />
      </AppRoot>
    </KitchenSinkContext.Provider>
  );
}
