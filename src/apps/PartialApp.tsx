import { Icon20Add } from '@vkontakte/icons';
import {
  AdaptivityProvider,
  Button,
  ConfigProvider,
  Group,
  WebviewType,
  classNames,
  Header,
  SimpleCell,
  FormLayout,
  FormItem,
  Input,
} from '@vkontakte/vkui';
import styles from './PartialApp.module.css';

function VKUINavigation() {
  return (
    <>
      <Group header={<Header>VKUI Navigation</Header>}>
        <SimpleCell>item 1</SimpleCell>
        <SimpleCell>item 2</SimpleCell>
        <SimpleCell>item 3</SimpleCell>
        <SimpleCell>item 4</SimpleCell>
      </Group>
      <Group>
        <Button stretched size="l" before={<Icon20Add />}>
          test button
        </Button>
      </Group>
    </>
  );
}

function VKUIForm() {
  return (
    <FormLayout>
      <FormItem top="email">
        <Input placeholder="email" />
      </FormItem>

      <FormItem top="password">
        <Input placeholder="password" />
      </FormItem>

      <FormItem>
        <Button size="l" type="submit" stretched>
          Submit
        </Button>
      </FormItem>
    </FormLayout>
  );
}

export default function PartialApp() {
  return (
    <ConfigProvider isWebView={true} webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <div className={styles.layout}>
          <main className={styles.main}>
            <h4>non-VKUI content</h4>
            <section>
              <form>
                <input placeholder="email" />
                <input placeholder="password" />
                <button>submit</button>
              </form>
            </section>

            <h4>VKUI Form</h4>
            <section className="vkui__root">
              <VKUIForm />
            </section>
          </main>
          <nav className={classNames('vkui__root', styles.nav)}>
            <VKUINavigation />
          </nav>
        </div>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
