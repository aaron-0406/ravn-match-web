import { Badge, Group, Text } from "@mantine/core";

type TechRowProps = { name: string; value: string };

export const TechRow = (props: TechRowProps) => {
  const { name, value } = props;
  return (
    <Group justify="space-between">
      <Text size="sm" c="#5C5F66">
        {name}
      </Text>
      <Badge variant="light" color="gray" radius="sm">
        {value}
      </Badge>
    </Group>
  );
};
