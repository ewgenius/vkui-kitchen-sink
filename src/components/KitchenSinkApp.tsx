import {
  AdaptivityProps,
  AppRoot,
  Avatar,
  Cell,
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
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    return (
      <SplitLayout
        className={styles.layout}
        header={<PanelHeader separator={false} />}
      >
        {isDesktop && (
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
          animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? '560px' : '100%'}
          maxWidth={isDesktop ? '560px' : '100%'}
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
      </SplitLayout>
    );
  },
  {
    viewWidth: true,
  }
);

export default function KitchenSinkApp() {
  return (
    <AppRoot>
      <App />
    </AppRoot>
  );
}
