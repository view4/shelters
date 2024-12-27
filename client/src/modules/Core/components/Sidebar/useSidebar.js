import cx from "classnames";
import { useMemo } from "react";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Sidebar from "./index";
import { CHEVRON_RIGHT_CX } from "modules/Core/styles/consts";
import SidebarItems from "./SidebarItems";
import RedirectButton from "../ui-kit/RedirectButton";
// import AuthLinks from "modules/Auth/components/AuthLinks";
import Container from "../ui-kit/Container";
import styles from "./styles.module.scss";

export default ({ children, className, links, ...props } = {}) => {
  const { isOpen, open, close } = useIsOpen();
  const indicator = useMemo(
    () => <span onClick={open} className={cx(CHEVRON_RIGHT_CX)} />,
    [open]
  );
  const c = useMemo(
    () => (
      <>
        {children ?? (links && <SidebarItems links={links} />)}
        <Container mt3 flex col alignCenter maxWidth>
          {/* <AuthLinks className={cx(styles.auth)} Connected={Connected} /> */}
        </Container>
      </>
    ),

    [children, links]
  );
  const drawer = useMemo(
    () => (
      <Sidebar
        isOpen={isOpen}
        close={close}
        children={c}
        className={className}
        {...props}
      />
    ),
    [isOpen, close, c]
  );

  return {
    indicator,
    drawer,
    open,
    close,
  };
};

const Connected = () => (
  <RedirectButton text={"Logout"} to={"/logout"} nature={"grey-bg"} />
);
