import {
  Icon24AddOutline,
  Icon28ServicesCircleFillBlue,
  Icon28ServicesOutline,
} from '@vkontakte/icons';
import {
  AdaptivityProps,
  AppRoot,
  Cell,
  Group,
  Panel,
  PanelHeader,
  SimpleCell,
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
              <PanelHeader
                left={<img style={{ height: 36 }} src="/logo.png" />}
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
  return (
    <AppRoot>
      <App />
    </AppRoot>
  );
}
