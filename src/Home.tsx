import {
  Button,
  Card,
  Checkbox,
  Flex,
  Group,
  Select,
  Stack,
  Switch,
  TagsInput,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { DateInput } from "@mantine/dates";
import { useQuery, useMutation } from "react-query";
import { PageLayout } from "./components/PageLayout";
import { useForm, Controller } from "react-hook-form";
import { CardsEmptyState } from "./components/CardsEmptyState/CardsEmptyState";
import { getListTopics } from "./shared/services/topics.service";
import { getListTechStacks } from "./shared/services/tech-stacks.service";
import { HomeTypeResolver } from "./Home.yup";

import { RecommendationCard } from "./components/RecommendationCard";
import { RecommendationCardProps } from "./components/RecommendationCard/RecommendationCard";
import { getListTeamMembers } from "./shared/services/team-member.service";

let recommendations: RecommendationCardProps[] = [];

const Home = () => {
  const formMethods = useForm({
    resolver: HomeTypeResolver,
    mode: "all",
    defaultValues: {
      techStacks: [],
      topics: [],
      seniority: "MID",
      englishLevel: "PROFICIENT",
      startDate: new Date(),
    },
  });

  const { control, watch, reset } = formMethods;

  const handleClear = () => {
    reset();
    recommendations = [];
  };

  const { mutate } = useMutation(
    ({ techStacks, topics, seniority, englishLevel }: any) =>
      getListTeamMembers(techStacks, topics, seniority, englishLevel),
    {
      onSuccess: (data) => {
        data.data.forEach((item: any) => {
          recommendations.push({
            image: "https://via.placeholder.com/150",
            name: item.name,
            english: item.english_level,
            techStack: item.tags_to_team_members.map((tag: any) => {
              return {
                stack: tag.tags.name,
                seniority: tag.seniority,
              };
            }),
            topics: [],
            aoScore: item.score,
            teamScore: 10.1,
            hourRate: 50,
          });
        });
      },
    }
  );

  const handleShowMatches = () => {
    const values = watch();
    mutate({
      techStacks: values.techStacks ?? [],
      topics: values.topics ?? [],
      seniority: values.seniority ?? "MID",
      englishLevel: values.englishLevel ?? "PROFICIENT",
    });
  };

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
    dataTopics?.data.map((item: { id: string; name: string }) => ({
      value: String(item.id),
      label: item.name,
    })) ?? [];

  const techStacks =
    dataTechStacks?.data.map((item: { id: string; name: string }) => ({
      value: String(item.id),
      label: item.name,
    })) ?? [];

  return (
    <PageLayout>
      <Flex m={0} align="center" gap={66} direction="row" h="100%">
        <Card miw={514} h={724} p="md" style={{ borderRadius: 16 }}>
          <Stack gap={8} mb={32}>
            <Title order={3}>Let's try</Title>
            <Text size="sm" c="#868E96">
              Choose at least tech stack
            </Text>
          </Stack>
          <Stack gap={16}>
            <Stack gap={4}>
              <Controller
                name="techStacks"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    placeholder="Enter tech stacks"
                    label="Tech Stacks"
                    size="md"
                    data={techStacks}
                    {...field}
                  />
                )}
              />
            </Stack>

            <Stack gap={4}>
              <Controller
                name="topics"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    placeholder="Enter topics"
                    label="Topics"
                    size="md"
                    data={topics}
                    {...field}
                  />
                )}
              />
              <Text c="#868E96" size="sm">
                E.g. Bank, Health, Big Team
              </Text>
            </Stack>

            <Stack gap={4}>
              <Text size="md" style={{ fontWeight: 600 }}>
                Seniority
              </Text>
              <Controller
                name="seniority"
                control={control}
                render={({ field }) => (
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
                    {...field}
                  />
                )}
              />
              <Checkbox mt={4} c="#868E96" label="Set as priority" />
            </Stack>

            <Stack gap={4}>
              <Text size="md" style={{ fontWeight: 600 }}>
                English Level
              </Text>
              <Controller
                name="englishLevel"
                control={control}
                render={({ field }) => (
                  <Select
                    size="md"
                    placeholder="Select"
                    data={["BASIC", "PROFICIENT", "ADVANCED"]}
                    {...field}
                  />
                )}
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

        <Stack>
          <Group justify="space-between">
            <Title order={3}>Your top recommendations</Title>
            <Button
              variant="subtle"
              color="grape.6"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              View candidate list
            </Button>
          </Group>

          {!recommendations.length ? (
            <CardsEmptyState />
          ) : (
            <Carousel
              slideGap="20"
              align="center"
              maw={833}
              w={833}
              controlSize={32}
              containScroll="trimSnaps"
              slideSize="33.333333%"
              styles={{
                control: {
                  transform: "translateY(-52px)",
                },
              }}
            >
              {recommendations.map((recommendation, index) => (
                <Carousel.Slide key={index}>
                  <RecommendationCard
                    key={recommendation.name + index}
                    {...recommendation}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
        </Stack>
      </Flex>
    </PageLayout>
  );
};

export default Home;
