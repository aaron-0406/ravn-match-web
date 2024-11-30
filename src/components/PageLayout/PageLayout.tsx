type PageLayoutProps = { children: ReactNode };

import { AppShell, BackgroundImage } from "@mantine/core";
import { ReactNode } from "react";

export const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;
  return (
    <AppShell
      // header={{ height: 60 }}
      // navbar={{
      //   width: 300,
      //   breakpoint: "sm",
      // }}

      padding="md"
    >
      {/* <Image src="src/assets/background.png" /> */}

      <BackgroundImage
        src="src/assets/background.png"
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundColor: "",
        }}
        radius={0}
      />
      {/* <Container
        style={{ backgroundColor: "#fff", position: "fixed", zIndex: -2 }}
        fluid
        w="100%"
        h="100%"
      > */}
      {children}
      {/* </Container> */}
    </AppShell>
  );
};
