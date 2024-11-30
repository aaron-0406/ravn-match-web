import { BackgroundImage, Card, Flex, Title } from "@mantine/core";

export const CardsEmptyState = () => {
  return (
    <Flex opacity={0.5} w={766} h={513} pos="relative">
      <BackgroundImage src="src/assets/card-empty-state.png" />
      <Card
        style={{
          position: "absolute",
          backgroundColor: "#0009",
          borderRadius: 20,
          textAlign: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        w={316}
        h={104}
        mx="auto"
      >
        <Title c="#fff" order={3} opacity={1}>
          Your recommendations will appear here
        </Title>
      </Card>
    </Flex>
  );
};
