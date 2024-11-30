type PageLayoutProps = { children: ReactNode };

import { AppShell, BackgroundImage } from "@mantine/core";
import { ReactNode } from "react";

export const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;
  return (
    <AppShell px={104} py={130}>
      <BackgroundImage
        src="src/assets/background.png"
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        radius={0}
      />

      {children}
    </AppShell>
  );
};
