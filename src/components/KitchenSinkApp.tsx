import {
  AdaptivityProps,
  AdaptivityProvider,
  Avatar,
  Cell,
  ConfigProvider,
  Group,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  View,
  ViewWidth,
  withAdaptivity,
} from '@vkontakte/vkui';
import styles from './KitchenSinkApp.module.css';

export const App = withAdaptivity(
  ({ viewWidth }: AdaptivityProps) => {
    return (
      <SplitLayout
        className={styles['KitchenSinkApp-layout']}
        header={<PanelHeader separator={false} />}
      >
        {viewWidth >= ViewWidth.TABLET && (
          <SplitCol fixed width="280px" maxWidth="280px">
            <Panel>
              <PanelHeader>VKUI</PanelHeader>
              <Cell>1</Cell>
              <Cell>1</Cell>
              <Cell>1</Cell>
              <Cell>1</Cell>
              <Cell>1</Cell>
              <Cell>1</Cell>
            </Panel>
          </SplitCol>
        )}

        <SplitCol
          spaced={viewWidth >= ViewWidth.TABLET}
          animate={viewWidth <= ViewWidth.MOBILE}
          width={viewWidth >= ViewWidth.SMALL_TABLET ? '768px' : '100%'}
          maxWidth="768px"
        >
          <View activePanel="1">
            <Panel id="1">
              <PanelHeader right={<Avatar size={36} />}>test</PanelHeader>
              <Group>
                <div style={{ height: 2000 }} />
              </Group>
            </Panel>
          </View>
        </SplitCol>

        {/* <SplitCol fixed maxWidth="280px">
          {viewWidth >= ViewWidth.DESKTOP && (
            <Panel>
              <PanelHeader />
              <Group></Group>
            </Panel>
          )}
        </SplitCol> */}
      </SplitLayout>
    );
  },
  {
    viewWidth: true,
  }
);

export default function KitchenSinkApp() {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
