import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconFlare, IconPlus } from "@tabler/icons-react";
import { TechRow } from "../TechRow";

export type RecommendationCardProps = {
  image: string;
  name: string;
  english: "basic" | "intermediate" | "proficient" | "advanced";
  techStack: Array<{ stack: string; seniority: string }>;
  topics: string[];
  aoScore: number;
  teamScore: number;
  needsVisibility?: boolean;
  hourRate: number;
};

export const RecommendationCard = (props: RecommendationCardProps) => {
  const theme = useMantineTheme();

  const {
    english,
    image,
    name,
    techStack,
    topics,
    aoScore,
    teamScore,
    needsVisibility = false,
    hourRate,
  } = props;
  return (
    <Card w={338} h={698} radius={8}>
      <Card.Section mb={16}>
        <Image src={image} height={294} alt="Norway" />
      </Card.Section>
      <Stack h="100%">
        <Group justify="space-between">
          <Group gap={8}>
            <Title order={4} maw={206} lineClamp={1} title={name}>
              {name}
            </Title>
            {needsVisibility && (
              <IconFlare size={14} color={theme.colors.grape[6]} />
            )}
          </Group>
          <Group gap={12}>
            <Badge
              w={72}
              h={32}
              variant="light"
              size="md"
              color="green"
              radius="xs"
            >
              {(aoScore * 100).toFixed(2) + "%"}
            </Badge>
            {/* <Badge
              w={32}
              h={32}
              variant="light"
              size="md"
              color="green"
              radius="xs"
            >
              {teamScore}
            </Badge> */}
          </Group>
        </Group>
        <Group gap={8}>
          {topics.slice(0, 3).map((topic, index) => (
            <Badge
              variant="default"
              styles={{ section: { visibility: "hidden" } }}
              key={topic + index}
            >
              {topic}
            </Badge>
          ))}
        </Group>
        <TechRow name="English" value={english} />
        {techStack.map((stack, index) => (
          <TechRow key={index} name={stack.stack} value={stack.seniority} />
        ))}
        <TechRow name="Hour Rate" value={`$${hourRate}`} />
        <Stack gap={8} h="100%" mt="auto" justify="end">
          <Button variant="default">View more</Button>
          <Button
            variant="light"
            leftSection={<IconPlus size={14} color={theme.colors.grape[6]} />}
          >
            Add to candidates list
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
