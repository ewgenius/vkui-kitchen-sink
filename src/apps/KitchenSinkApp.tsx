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
} from '@vkontakte/vkui';
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
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
} from '@vkontakte/icons';
import bridge from '../utils/vkBridge';
import { ChipsSelect } from '@vkontakte/vkui/unstable';

const colors = [
  { value: '1', label: 'Красный' },
  { value: '2', label: 'Синий' },
];

const Chips = () => {
  const [selectedColors, setSelectedColors] = useState([
    { value: '1', label: 'Красный' },
  ]);

  const colorsChipsProps = {
    value: selectedColors,
    onChange: setSelectedColors,
    options: colors,
    top: 'Выберите или добавьте цвета',
    placeholder: 'Не выбраны',
    creatable: true,
    creatableText: 'Создать значение',
  };

  return (
    <Group>
      <FormItem top="Выберите или добавьте цвета">
        <ChipsSelect {...colorsChipsProps} />
      </FormItem>
    </Group>
  );
};

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

export interface KitchenSinkAppProps {
  embedded?: boolean;
  ssrValue?: string;
}

export const App = withAdaptivity(
  ({ viewWidth, ssrValue }: AdaptivityProps & KitchenSinkAppProps) => {
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
                <Group>{ssrValue}</Group>
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
              <Chips />
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
  ssrValue,
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
        webviewType={WebviewType.INTERNAL}
      >
        <AdaptivityProvider>
          <AppRoot embedded={embedded}>
            <App ssrValue={ssrValue} />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </KitchenSinkContext.Provider>
  );
}
