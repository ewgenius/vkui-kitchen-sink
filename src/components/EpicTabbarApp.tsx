import {
  Icon28ServicesOutline,
  Icon56MentionOutline,
  Icon28MessageOutline,
  Icon28ClipOutline,
  Icon28UserCircleOutline,
  Icon28NewsfeedOutline,
} from '@vkontakte/icons';
import {
  AppRoot,
  AdaptivityProps,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SplitCol,
  SplitLayout,
  View,
  ViewWidth,
  WebviewType,
  withAdaptivity,
  Placeholder,
  TabbarItem,
  Epic,
  Tabbar,
  ConfigProvider,
  AdaptivityProvider,
} from '@vkontakte/vkui';
import { useState } from 'react';

export const App = withAdaptivity(
  ({ viewWidth }: AdaptivityProps) => {
    const [activeStory, setActiveStory] = useState('profile');
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isDesktop = viewWidth >= ViewWidth.TABLET;

    return (
      <SplitLayout
        header={<PanelHeader separator={false} />}
        style={{ justifyContent: 'center' }}
      >
        <SplitCol
          animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? '560px' : '100%'}
          maxWidth={isDesktop ? '560px' : '100%'}
        >
          <Epic
            activeStory={activeStory}
            tabbar={
              <Tabbar>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'feed'}
                  data-story="feed"
                  text="Новости"
                >
                  <Icon28NewsfeedOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'services'}
                  data-story="services"
                  text="Сервисы"
                >
                  <Icon28ServicesOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'messages'}
                  data-story="messages"
                  label="12"
                  text="Сообщения"
                >
                  <Icon28MessageOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'clips'}
                  data-story="clips"
                  text="Клипы"
                >
                  <Icon28ClipOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'profile'}
                  data-story="profile"
                  text="Профиль"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
              </Tabbar>
            }
          >
            <View id="feed" activePanel="feed">
              <Panel id="feed">
                <PanelHeader left={<PanelHeaderBack />}>Новости</PanelHeader>
                <Group>
                  <Placeholder icon={<Icon56MentionOutline />}>
                    Введите адрес страницы в поле поиска
                  </Placeholder>
                </Group>
              </Panel>
            </View>
            <View id="services" activePanel="services">
              <Panel id="services">
                <PanelHeader>Сервисы</PanelHeader>
                <Group>
                  <Placeholder icon={<Icon56MentionOutline />}>
                    Введите адрес страницы в поле поиска
                  </Placeholder>
                </Group>
              </Panel>
            </View>
            <View id="messages" activePanel="messages">
              <Panel id="messages">
                <PanelHeader>Сообщения</PanelHeader>
                <Group>
                  <Placeholder icon={<Icon56MentionOutline />}>
                    Введите адрес страницы в поле поиска
                  </Placeholder>
                </Group>
              </Panel>
            </View>
            <View id="clips" activePanel="clips">
              <Panel id="clips">
                <PanelHeader>Клипы</PanelHeader>
                <Group>
                  <Placeholder icon={<Icon56MentionOutline />}>
                    Введите адрес страницы в поле поиска
                  </Placeholder>
                </Group>
              </Panel>
            </View>
            <View id="profile" activePanel="profile">
              <Panel id="profile">
                <PanelHeader>Профиль</PanelHeader>
                <Group>
                  <Placeholder icon={<Icon56MentionOutline />}>
                    Введите адрес страницы в поле поиска
                  </Placeholder>
                </Group>
              </Panel>
            </View>
          </Epic>
        </SplitCol>
      </SplitLayout>
    );
  },
  {
    viewWidth: true,
  }
);

export default function EpicTabbarApp() {
  return (
    <ConfigProvider isWebView={true} webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
