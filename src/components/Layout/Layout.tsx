import React, { FC, PropsWithChildren, useState } from "react";
import { Container, Content, OpenNavigationButton } from "./styles";
import { Navigation } from "../Navigation/Navigation";
import { BarsIcon } from "../../icons/BarsIcon";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isNavigationOpened, setIsNavigationOpened] = useState<boolean>(false);

  return (
    <Container>
      {isNavigationOpened ? (
        <Navigation onClose={() => setIsNavigationOpened(false)} />
      ) : (
        <OpenNavigationButton onClick={() => setIsNavigationOpened(true)}>
          <BarsIcon />
        </OpenNavigationButton>
      )}
      <Content>{children}</Content>
    </Container>
  );
};
