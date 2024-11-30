import { Card, Title } from "@mantine/core";
import { PageLayout } from "./components/PageLayout";

const Home = () => {
  return (
    <PageLayout>
      <Card w={514} h={696} p="md">
        <Title order={3}>Let's try</Title>
      </Card>
    </PageLayout>
  );
};

export default Home;
