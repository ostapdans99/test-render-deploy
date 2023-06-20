import { FC } from "react";

import { Header } from "./components/Header";
import { UserInfo } from "./components/UserInfo";
import { ILayoutProps } from "./types";
import { Container, Main } from "./styles";

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>
        {children}
        <UserInfo />
      </Main>
    </Container>
  );
};

export default Layout;
