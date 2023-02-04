import { Stack } from '@fluentui/react';
import Menu from '../Menu/Menu';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <Stack horizontal>
      <Menu />
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </Stack>
  );
};

export default Layout;
