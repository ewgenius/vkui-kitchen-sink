import { Icon28SunOutline, Icon28MoonOutline } from '@vkontakte/icons';
import { PanelHeaderButton, Scheme } from '@vkontakte/vkui';
import { useCallback, useContext } from 'react';
import { KitchenSinkContext } from './KitchenSinkContext';

export const SchemeToggle = () => {
  const { scheme, setScheme } = useContext(KitchenSinkContext);
  const toggleScheme = useCallback(
    () =>
      setScheme(
        scheme === Scheme.BRIGHT_LIGHT ? Scheme.SPACE_GRAY : Scheme.BRIGHT_LIGHT
      ),
    [scheme]
  );

  return (
    <PanelHeaderButton onClick={toggleScheme}>
      {scheme === Scheme.BRIGHT_LIGHT ? (
        <Icon28MoonOutline />
      ) : (
        <Icon28SunOutline />
      )}
    </PanelHeaderButton>
  );
};
