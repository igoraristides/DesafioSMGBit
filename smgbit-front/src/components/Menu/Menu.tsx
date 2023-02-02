import {
  classNamesFunction,
  Stack,
  styled,
  Image,
  Nav,
  INavLinkGroup,
} from "@fluentui/react";
import { getStyles } from "./Menu.styles";
import {
  IMenuProps,
  IMenuStyles,
  IMenuStylesProps,
  NavKeys,
} from "./Menu.types";

import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const getClassNames = classNamesFunction<IMenuStylesProps, IMenuStyles>();

const Menu: React.FC<IMenuProps> = (props) => {
  const { styles, theme } = props;

  const classNames = getClassNames(styles, { theme });

  const navigate = useNavigate();

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Upload de arquivos",
          url: "",
          key: NavKeys.UPLOAD,
          icon: "Upload",
          target: "_blank",
          onClick: () => navigate("/"),
        },
        {
          name: "Viagens",
          url: "",
          icon: "DeliveryTruck",
          key: NavKeys.VIEW,
          target: "_blank",
          onClick: () => navigate("/view-trip"),
        },
      ],
    },
  ];

  return (
    <Stack
      verticalFill
      horizontalAlign="center"
      style={{ borderRight: "2px solid rgb(237, 235, 233)", height: "100vh" }}
    >
      <Image
        src={Logo}
        alt="logo"
        width={100}
        height={100}
        className={classNames.logo}
      />
      <Nav
        selectedKey={NavKeys.UPLOAD}
        className={classNames.root}
        groups={navLinkGroups}
      />
    </Stack>
  );
};

export default styled<IMenuProps, IMenuStylesProps, IMenuStyles>(
  Menu,
  getStyles
);
