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
import { useQuery } from "react-query";
import { PageLayout } from "./components/PageLayout";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { CardsEmptyState } from "./components/CardsEmptyState/CardsEmptyState";
import { getListTopics } from "./shared/services/topics.service";
import { getListTechStacks } from "./shared/services/tech-stacks.service";
import { HomeTypeResolver } from "./Home.yup";

import { RecommendationCard } from "./components/RecommendationCard";
import { RecommendationCardProps } from "./components/RecommendationCard/RecommendationCard";

const recommendations: RecommendationCardProps[] = [
  {
    image: "https://ca.slack-edge.com/T7LE1KVBL-U061TGY0C1Y-3540f8312975-512",
    name: "Alice Johnson",
    english: "advanced",
    techStack: {
      React: "senior",
      NodeJS: "mid",
      Python: "junior",
    },
    topics: ["Web Development", "UI/UX Design", "Agile"],
    aoScore: 9.2,
    teamScore: 8.8,
    needsVisibility: true,
    hourRate: 75,
  },
  {
    name: "Brayan Vera Vera Vera Vera Vera Vera",
    english: "advanced",
    aoScore: 5,
    teamScore: 5,
    topics: ["CRM", "PROJECT MIGRATION", "CMS", "BIG TEAMS"],
    techStack: { React: "senior", NextJS: "mid" },
    hourRate: 18,
    image:
      "https://s3-alpha-sig.figma.com/img/9d01/83af/c322debcf9d03f65910717c58d7c6fe0?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UluUu6s1obEOluo6rSdA9Ym4iTqkJT-M-JnqYzw3ZyMNmhI6WdF0T4xD5Ph4LXA6QxYTCobz-vKxpYln-7ugj-S62PKW0F10OrwHfiKTOixM0z2R~JVsCdCCizdwoThENP1~Q7L04AHP7owrjkZ~vMP8ebOWuvCRAQNf9AOXkNEycCQMeEClfHbzoLHCmJe17mdeY3Zm8Jjk3-nI3Hrvpr1Hr5fVPjzVwmp~WVUV~9AMnHyKCNv639MLZ3BROEwBYrY7~WnT~r9VnSHzJJkPlHyZhesPDxKbrNx6l4rO~uTCvMev0XWPauoCMtLySAsR4hb1h4VUj-YTMSKdIDHfqw__",
  },
  {
    image: "https://ca.slack-edge.com/T7LE1KVBL-U039Y082Z40-9b05584e2055-512",
    name: "Bob Smith",
    english: "intermediate",
    techStack: {
      Java: "mid",
      Spring: "junior",
      Kubernetes: "junior",
    },
    topics: ["Backend Development", "DevOps", "Cloud Computing"],
    aoScore: 8.5,
    teamScore: 7.9,
    hourRate: 60,
  },
  {
    image: "https://ca.slack-edge.com/T7LE1KVBL-U037GMW90RL-95b4e9c08ea6-512",
    name: "Catherine Lee",
    english: "proficient",
    techStack: {
      Angular: "senior",
      TypeScript: "mid",
      Firebase: "junior",
    },
    topics: ["Frontend Development", "State Management", "Testing"],
    aoScore: 9.0,
    teamScore: 8.7,
    hourRate: 70,
  },
  {
    image: "https://via.placeholder.com/150",
    name: "David Wong",
    english: "basic",
    techStack: {
      PHP: "mid",
      Laravel: "mid",
      MySQL: "senior",
    },
    topics: ["Web Development", "Database Management", "CMS"],
    aoScore: 7.8,
    teamScore: 8.2,
    hourRate: 50,
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Emily Brown",
    english: "advanced",
    techStack: {
      Python: "senior",
      TensorFlow: "mid",
      Pandas: "mid",
    },
    topics: ["Data Science", "Machine Learning", "Data Visualization"],
    aoScore: 9.5,
    teamScore: 9.0,
    needsVisibility: false,
    hourRate: 100,
  },
];

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
  };

  const handleShowMatches = () => {
    const values = watch();
    console.log("Form Values: ", values);
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
        </Stack>

        {!recommendations.length ? <CardsEmptyState /> : null}
      </Flex>
    </PageLayout>
  );
};

export default Home;
