import { Icon28Services, Icon28Settings } from '@vkontakte/icons';
import {
  AppRoot,
  AdaptivityProvider,
  ConfigProvider,
  Panel,
  PanelHeader,
  View,
  withInsets,
  Group,
  Input,
  HasInsets,
  FormItem,
  Div,
  Epic,
  Tabbar,
  TabbarItem,
  WebviewType,
} from '@vkontakte/vkui';
import { FC, useEffect, useState } from 'react';
import bridge from '../utils/vkBridge';

export const VKMiniApp: FC<HasInsets> = withInsets(({ insets }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    const listener = ({ detail: { type, data } }) => {
      if (data.insets) {
        console.log(data);
        setState(data.insets);
      }
    };

    bridge.subscribe(listener);
    bridge.send('VKWebAppInit');
  }, []);

  return (
    <ConfigProvider isWebView={true} webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <AppRoot>
          <Epic
            activeStory="1"
            tabbar={
              <Tabbar>
                <TabbarItem>
                  <Icon28Services />
                </TabbarItem>
                <TabbarItem>
                  <Icon28Settings />
                </TabbarItem>
              </Tabbar>
            }
          >
            <View id="1" activePanel="panel">
              <Panel id="panel">
                <PanelHeader>Test App</PanelHeader>
                <Group>
                  <Div>{JSON.stringify(insets, null, 2)}</Div>
                  <Div>{JSON.stringify(state, null, 2)}</Div>
                  <FormItem>
                    <Input />
                  </FormItem>
                </Group>
              </Panel>
            </View>
          </Epic>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
});

export default VKMiniApp;
