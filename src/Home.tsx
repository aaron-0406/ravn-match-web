import {
  Button,
  Card,
  Checkbox,
  Flex,
  Select,
  Stack,
  Switch,
  TagsInput,
  Text,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useQuery } from "react-query";
import { PageLayout } from "./components/PageLayout";
import { CardsEmptyState } from "./components/CardsEmptyState/CardsEmptyState";
import { getListTopics } from "./shared/services/topics.service";
import { getListTechStacks } from "./shared/services/tech-stacks.service";

const Home = () => {
  const handleClear = () => 0;
  const handleShowMatches = () => 0;

  const { data: dataTopics } = useQuery(
    "key-topic",
    async () => {
      return await getListTopics();
    },
    {
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  const { data: dataTechStacks } = useQuery(
    "key-tech-stacks",
    async () => {
      return await getListTechStacks();
    },
    {
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  const topics =
    dataTopics?.data.map((item: { name: string }) => item.name) ?? [];

  const techStacks =
    dataTechStacks?.data.map((item: { name: string }) => item.name) ?? [];

  return (
    <PageLayout>
      <Flex m={0} align="center" gap={66}>
        <Card miw={514} h={724} p="md" style={{ borderRadius: 16 }}>
          <Stack gap={8} mb={32}>
            <Title order={3}>Let's try</Title>
            <Text size="sm" c="#868E96">
              Choose at least tech stack
            </Text>
          </Stack>
          <Stack gap={16}>
            <Stack gap={4}>
              <TagsInput
                placeholder="Enter tech stacks"
                label="Tech Stacks"
                size="md"
                data={techStacks}
              />
            </Stack>

            <Stack gap={4}>
              <TagsInput
                placeholder="Enter topics"
                size="md"
                label="Topics"
                data={topics}
              />
              <Text c="#868E96" size="sm">
                E.g. Bank, Health, Big Team
              </Text>
            </Stack>

            <Stack gap={4}>
              <Text size="md" style={{ fontWeight: 600 }}>
                Seniority
              </Text>
              <Select
                size="md"
                placeholder="Select"
                data={[
                  "TRAINEE",
                  "JUNIOR",
                  "JUNIOR_MID",
                  "MID",
                  "MID_SENIOR",
                  "SENIOR",
                ]}
              />
              <Checkbox mt={4} c="#868E96" label="Set as priority" />
            </Stack>

            <Stack gap={4}>
              <Text size="md" style={{ fontWeight: 600 }}>
                English Level
              </Text>
              <Select
                size="md"
                placeholder="Select"
                data={["BASIC", "PROFICIENT", "ADVANCED"]}
              />
              <Checkbox mt={4} c="#868E96" label="Set as priority" />
            </Stack>

            <DateInput placeholder="Select" label="Start date" size="md" />

            <Switch
              size="md"
              label="Give visibility to unnoticed team members   "
            />
          </Stack>
          <Flex mt={32} w="100%" gap={8}>
            <Button
              size="md"
              style={{ borderRadius: 8 }}
              w={120}
              onClick={handleClear}
              variant="outline"
            >
              Clear
            </Button>
            <Button
              size="md"
              w="100%"
              onClick={handleShowMatches}
              variant="filled"
              style={{ borderRadius: 8 }}
            >
              Show matches
            </Button>
          </Flex>
        </Card>

        <CardsEmptyState />
      </Flex>
    </PageLayout>
  );
};

export default Home;
