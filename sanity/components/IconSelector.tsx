"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Card, Flex, Grid, Stack, Text, TextInput } from "@sanity/ui";
import { set, unset } from "sanity";
import type { StringInputProps } from "sanity";
import type { ComponentType } from "react";

// Dynamically import icon libraries
import * as SiIcons from "react-icons/si";
import * as AiIcons from "react-icons/ai";
import * as LucideIcons from "lucide-react";

// Custom Zustand icon component (not available in react-icons)
const SiZustand: ComponentType<{ className?: string }> = ({ className }) => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg"
    alt="Zustand"
    className={className}
    style={{ width: "1em", height: "1em" }}
  />
);

// Create a comprehensive icon map
const createIconMap = () => {
  const iconMap: Record<string, ComponentType<{ className?: string }>> = {
    // Add custom icons first
    SiZustand,
  };

  // Add Lucide Icons FIRST (so they're included)
  Object.entries(LucideIcons).forEach(([name, Icon]) => {
    // Include all capitalized icon components, excluding internal utilities
    // Check if it's a valid React component (function or object with render method)
    const isValidComponent =
      typeof Icon === "function" ||
      (typeof Icon === "object" && Icon !== null && "$$typeof" in Icon);

    if (
      isValidComponent &&
      name[0] === name[0].toUpperCase() &&
      name !== "createLucideIcon" &&
      name !== "Icon" &&
      name.length > 1 // Exclude single character exports
    ) {
      iconMap[name] = Icon as ComponentType<{ className?: string }>;
    }
  });

  // Add Simple Icons (Si*)
  Object.entries(SiIcons).forEach(([name, Icon]) => {
    if (typeof Icon === "function" && name.startsWith("Si")) {
      iconMap[name] = Icon as ComponentType<{ className?: string }>;
    }
  });

  // Add Ant Design Icons (Ai*)
  Object.entries(AiIcons).forEach(([name, Icon]) => {
    if (typeof Icon === "function" && name.startsWith("Ai")) {
      iconMap[name] = Icon as ComponentType<{ className?: string }>;
    }
  });

  return iconMap;
};

const iconMap = createIconMap();

export function IconSelector(props: StringInputProps) {
  const { elementProps, value = "", onChange } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query - wait 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter icons based on debounced search query - only show results when user types
  const filteredIcons = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    const query = debouncedQuery.toLowerCase();
    return Object.entries(iconMap).filter(([name]) =>
      name.toLowerCase().includes(query),
    );
  }, [debouncedQuery]);

  const handleIconSelect = (iconName: string) => {
    onChange(iconName === value ? unset() : set(iconName));
    // Clear the search input when an icon is selected
    setSearchQuery("");
  };

  const SelectedIcon = value ? iconMap[value] : null;

  return (
    <Stack space={3}>
      {/* Search Input */}
      <TextInput
        {...elementProps}
        placeholder="Search icons..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />

      {/* Selected Icon Preview */}
      {value && SelectedIcon && (
        <Card padding={3} radius={2} tone="primary">
          <Flex align="center" gap={3}>
            <Box className="text-2xl">
              <SelectedIcon className="w-6 h-6" />
            </Box>
            <Text size={1} weight="semibold">
              Selected: {value}
            </Text>
          </Flex>
        </Card>
      )}

      {/* Icon Grid - Only show when user has typed something and debounced */}
      {debouncedQuery.trim() && (
        <Box className="max-h-[400px] overflow-y-auto">
          {filteredIcons.length > 0 ? (
            <Grid columns={[3, 4, 5]} gap={2}>
              {filteredIcons.map(([iconName, IconComponent]) => {
                const isSelected = value === iconName;
                return (
                  <Card
                    key={iconName}
                    padding={4}
                    radius={2}
                    tone={isSelected ? "primary" : "default"}
                    className={`cursor-pointer border-solid ${
                      isSelected ? "border-2" : "border"
                    } hover:bg-(--card-hovered-background-color)`}
                    onClick={() => handleIconSelect(iconName)}
                  >
                    <Stack space={3} className="items-center">
                      <Flex align="center" justify="center">
                        <Box className="text-3xl">
                          <IconComponent className="w-8 h-8" />
                        </Box>
                      </Flex>
                      <Box className="min-h-[2.5em] w-full flex items-center justify-center">
                        <Text
                          size={1}
                          className="text-center wrap-break-word leading-tight overflow-hidden line-clamp-2 w-full"
                          title={iconName}
                        >
                          {iconName
                            .replace(/^Si|^Ai/, "")
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        </Text>
                      </Box>
                    </Stack>
                  </Card>
                );
              })}
            </Grid>
          ) : (
            <Card padding={4} tone="caution">
              <Text size={1}>No icons found matching "{debouncedQuery}"</Text>
            </Card>
          )}
        </Box>
      )}
    </Stack>
  );
}
