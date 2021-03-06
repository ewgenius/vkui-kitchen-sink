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
  Header,
  Title,
  Div,
  Text,
  Caption,
  PanelHeaderBack,
  FormItem,
  Textarea,
  Link,
  HorizontalScroll,
  HorizontalCell,
  Avatar,
  PanelHeaderContent,
  ANDROID,
  PanelHeaderButton,
} from '@vkontakte/vkui';
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
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
  Icon28LightbulbStarOutline,
  Icon16Dropdown,
  Icon28Settings,
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

export interface NavigationItem {
  path: string;
  title: string;
  icon: ReactNode;
}

export const navigation: NavigationItem[] = [
  { path: '/', title: 'Компоненты', icon: <Icon28ServicesOutline /> },
  { path: '/', title: 'Внешний Вид', icon: <Icon28PaletteOutline /> },
  { path: '/', title: 'VK Icons', icon: <Icon28LightbulbStarOutline /> },
];

export interface KitchenSinkAppProps
  extends Pick<AdaptivityProps, 'viewWidth' | 'hasMouse'> {
  embedded?: boolean;
}

export const App = withAdaptivity(
  ({ viewWidth }: AdaptivityProps) => {
    const [panel, setPanel] = useState('1');
    const [modal, setModal] = useState(null);
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    const { setScheme } = useContext(KitchenSinkContext);

    const [opened, setOpened] = useState(false);
    const toggleOpened = useCallback(() => setOpened(!opened), [opened]);

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
          <ModalRoot activeModal={modal} onClose={() => setModal(null)}>
            <ModalPage
              id="modal1"
              header={<ModalPageHeader>Test</ModalPageHeader>}
            >
              <Group>
                <FormItem>
                  <Textarea placeholder="Описание" />
                </FormItem>
              </Group>
              <Group
                header={
                  <Header aside={<Link>Показать все</Link>}>
                    Мини-приложения
                  </Header>
                }
              >
                <HorizontalScroll>
                  <div style={{ display: 'flex' }}>
                    <HorizontalCell size="s" header="Промокот">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-54.userapi.com/c850536/v850536134/15096d/6806J7q6YwM.jpg"
                      />
                    </HorizontalCell>
                    <HorizontalCell size="s" header="Разделите счёт">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-20.userapi.com/c857416/v857416681/fc6d0/06XQvs4SyiE.jpg"
                      />
                    </HorizontalCell>
                    <HorizontalCell size="s" header="Рассылки">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-50.userapi.com/c850536/v850536397/129313/qdVJ7A7xd70.jpg"
                      />
                    </HorizontalCell>
                    <HorizontalCell size="s" header="Тексты песен">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-41.userapi.com/Zf2HluZJZDYjTbxhnSfeYnHtttBYsYbdjJ3QJQ/aDcJQrVVnbQ.jpg"
                      />
                    </HorizontalCell>
                    <HorizontalCell size="s" header="Промокот">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-54.userapi.com/c850536/v850536134/15096d/6806J7q6YwM.jpg"
                      />
                    </HorizontalCell>
                    <HorizontalCell size="s" header="Разделите счёт">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-20.userapi.com/c857416/v857416681/fc6d0/06XQvs4SyiE.jpg"
                      />
                    </HorizontalCell>
                    <HorizontalCell size="s" header="Рассылки">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-50.userapi.com/c850536/v850536397/129313/qdVJ7A7xd70.jpg"
                      />
                    </HorizontalCell>
                    <HorizontalCell size="s" header="Тексты песен">
                      <Avatar
                        size={56}
                        mode="app"
                        src="https://sun9-41.userapi.com/Zf2HluZJZDYjTbxhnSfeYnHtttBYsYbdjJ3QJQ/aDcJQrVVnbQ.jpg"
                      />
                    </HorizontalCell>
                  </div>
                </HorizontalScroll>
              </Group>
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
              {navigation.map(({ title, icon }, i) => (
                <SimpleCell key={`nav_${i}`} before={icon}>
                  {title}
                </SimpleCell>
              ))}
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
                  {navigation.map(({ title, icon }, i) => (
                    <TabbarItem key={`tab_${i}`} text={title}>
                      {icon}
                    </TabbarItem>
                  ))}
                </Tabbar>
              )
            }
          >
            <View id="1" activePanel={panel}>
              <Panel id="1">
                <PanelHeader right={<Search className={styles.search} />}>
                  Компоненты
                </PanelHeader>
                <Group>
                  <SimpleCell onClick={() => setModal('modal1')}>
                    Open modal
                  </SimpleCell>
                </Group>
                <Group>
                  <CardGrid size="m">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                      <Card key={i} onClick={() => setPanel('2')}>
                        <div className={styles.card}>test</div>
                      </Card>
                    ))}
                  </CardGrid>
                </Group>
              </Panel>

              <Panel id="2">
                <PanelHeader
                  left={<PanelHeaderBack onClick={() => setPanel('1')} />}
                  right={
                    <PanelHeaderButton>
                      <Icon28Settings />
                    </PanelHeaderButton>
                  }
                >
                  <PanelHeaderContent
                    onClick={toggleOpened}
                    aside={
                      <Icon16Dropdown
                        style={{
                          transform: `rotate(${opened ? '180deg' : '0'})`,
                        }}
                      />
                    }
                  >
                    Clickable header updated
                  </PanelHeaderContent>
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

export default function KitchenSinkApp({
  embedded,
  ...adaptivityProps
}: KitchenSinkAppProps) {
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
        platform={ANDROID}
        webviewType={WebviewType.INTERNAL}
      >
        <AdaptivityProvider {...adaptivityProps}>
          <AppRoot embedded={embedded}>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </KitchenSinkContext.Provider>
  );
}
