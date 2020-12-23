import {
  ConfigProvider,
  AdaptivityProvider,
  AdaptivityProps,
  Group,
  Panel,
  PanelHeader,
  Scheme,
  SimpleCell,
  SplitCol,
  SplitLayout,
  View,
  ViewWidth,
  WebviewType,
  withAdaptivity,
  AppRoot,
  Epic,
  Tabbar,
  TabbarItem,
  CardGrid,
  Card,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Search,
  FixedLayout,
  Separator,
  Header,
  Title,
  Div,
  Text,
  Subhead,
  Caption,
  PanelHeaderBack,
  classNames,
  FormItem,
} from '@vkontakte/vkui';
import {
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './KitchenSinkApp.module.css';
import { KitchenSinkContext } from './KitchenSinkContext';
import { SchemeToggle } from '../components/SchemeToggle';
import {
  Icon28ServicesOutline,
  Icon28PaletteOutline,
  Icon28InfoCircleOutline,
} from '@vkontakte/icons';
import bridge from '../utils/vkBridge';

export interface NaviagtionItem {
  route: string;
  title: string;
  icon: ReactElement;
}
export interface LayoutProps extends PropsWithChildren<AdaptivityProps> {
  navigationItems: NaviagtionItem[];
}

export const App = withAdaptivity(
  ({ viewWidth }: AdaptivityProps) => {
    const [panel, setPanel] = useState('1');
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    const { setScheme } = useContext(KitchenSinkContext);

    useEffect(() => {
      const listener = ({ detail: { type, data } }) => {
        if (type === 'VKWebAppUpdateConfig') {
          setScheme((data as any).scheme);
        }
      };

      bridge.subscribe(listener);
      bridge.send('VKWebAppInit');
    }, []);

    return (
      <SplitLayout
        className={styles.layout}
        header={<PanelHeader separator={false} />}
        modal={
          <ModalRoot activeModal={null}>
            <ModalPage
              id="modal1"
              header={<ModalPageHeader>Test</ModalPageHeader>}
            >
              <Group>test</Group>
            </ModalPage>
          </ModalRoot>
        }
      >
        {isDesktop && (
          <SplitCol fixed width="280px" maxWidth="280px">
            <Panel>
              <PanelHeader
                left={<img style={{ height: 36 }} src="/logo.png" />}
                right={<SchemeToggle />}
              />
              <SimpleCell before={<Icon28ServicesOutline />}>
                Компоненты
              </SimpleCell>
              <SimpleCell before={<Icon28PaletteOutline />}>
                Внешний Вид
              </SimpleCell>
            </Panel>
          </SplitCol>
        )}

        <SplitCol
          animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? '560px' : '100%'}
          maxWidth={isDesktop ? '560px' : '100%'}
        >
          <Epic
            activeStory="1"
            tabbar={
              !isDesktop && (
                <Tabbar>
                  <TabbarItem text="Компоненты">
                    <Icon28ServicesOutline />
                  </TabbarItem>
                  <TabbarItem text="Внешний Вид">
                    <Icon28PaletteOutline />
                  </TabbarItem>
                </Tabbar>
              )
            }
          >
            <View id="1" activePanel={panel}>
              <Panel id="1">
                <PanelHeader>Компоненты</PanelHeader>
                <FixedLayout vertical="top">
                  <Search />
                </FixedLayout>
                <div
                  className={classNames(styles.content, {
                    [styles.contentDesktop]: isDesktop,
                  })}
                >
                  <Separator expanded className={styles.separator} />
                  <CardGrid size="m">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                      <Card key={i} onClick={() => setPanel('2')}>
                        <div className={styles.card}>test</div>
                      </Card>
                    ))}
                  </CardGrid>
                </div>
              </Panel>

              <Panel id="2">
                <PanelHeader
                  left={<PanelHeaderBack onClick={() => setPanel('1')} />}
                >
                  Компонент
                </PanelHeader>

                <Group>test</Group>
              </Panel>
            </View>
          </Epic>
        </SplitCol>

        {isDesktop && (
          <SplitCol fixed width="280px" maxWidth="280px">
            <Panel>
              <PanelHeader />
              <Group header={<Header>Информация</Header>}>
                <Div>
                  <Title weight="bold" level="2">
                    SearchBar
                  </Title>
                  <Caption weight="regular" level="2">
                    test test test test test test test test test test test test
                    test test test test test test test test test test test test
                  </Caption>
                  <Text weight="regular">
                    test test test test test test test test test test test test
                    test test test test test test test test test test test test
                  </Text>
                </Div>
              </Group>
              <Group header={<Header>Свойства</Header>}>
                <FormItem></FormItem>
              </Group>
            </Panel>
          </SplitCol>
        )}
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
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </KitchenSinkContext.Provider>
  );
}
