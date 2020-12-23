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
} from '@vkontakte/vkui';
import { FC, useEffect } from 'react';
import bridge from '../utils/vkBridge';

export const VKMiniApp: FC<HasInsets> = withInsets(({ insets }) => {
  useEffect(() => {
    const listener = ({ detail: { type, data } }) => {};

    bridge.subscribe(listener);
    bridge.send('VKWebAppInit');
  }, []);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <View activePanel="panel">
            <Panel id="panel">
              <PanelHeader>Test App</PanelHeader>
              <Group>
                <FormItem>
                  <Input />
                </FormItem>
                <Div>{JSON.stringify(insets, null, 2)}</Div>
              </Group>
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
});

export default VKMiniApp;
