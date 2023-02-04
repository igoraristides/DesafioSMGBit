import { classNamesFunction, Stack, styled, Image, Nav, INavLinkGroup } from '@fluentui/react';
import { getStyles } from './Menu.styles';
import { IMenuProps, IMenuStyles, IMenuStylesProps, NavKeys } from './Menu.types';

import Logo from '../../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VerrificarRota } from '../../utils/helpers';

const getClassNames = classNamesFunction<IMenuStylesProps, IMenuStyles>();

const Menu: React.FC<IMenuProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  const navigate = useNavigate();

  const location = useLocation();

  const [chaveSelecionada, setChaveSelecionada] = useState<string | undefined>(VerrificarRota(location.pathname));

  useEffect(() => setChaveSelecionada(VerrificarRota(location.pathname)), [location.pathname]);

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'Upload de arquivos',
          url: '',
          key: NavKeys.UPLOAD,
          icon: 'Upload',
          target: '_blank',
          onClick: () => navigate('/'),
        },
        {
          name: 'Consultar Viagens',
          url: '',
          icon: 'DeliveryTruck',
          key: NavKeys.VISUALIZAR,
          target: '_blank',
          onClick: () => navigate('/visualizar'),
        },
        {
          name: 'Consultar Frete',
          url: '',
          icon: 'Money',
          key: NavKeys.FRETE,
          target: '_blank',
          onClick: () => navigate('/fretes'),
        },
      ],
    },
  ];

  return (
    <Stack verticalFill horizontalAlign="center" style={{ borderRight: '2px solid rgb(237, 235, 233)', height: '100vh' }}>
      <Image src={Logo} alt="logo" width={100} height={100} className={classNames.logo} />
      <Nav selectedKey={chaveSelecionada} className={classNames.root} groups={navLinkGroups} />
    </Stack>
  );
};

export default styled<IMenuProps, IMenuStylesProps, IMenuStyles>(Menu, getStyles);
