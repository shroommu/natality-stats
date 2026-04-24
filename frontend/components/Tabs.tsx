"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MuiTab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export type TabsItem = {
  label: string;
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  tabs: TabsItem[];
  value: string;
  onChange?: (nextValue: string) => void;
  ariaLabel?: string;
  keepMounted?: boolean;
  sx?: SxProps<Theme>;
};

const tabId = (value: string) => `tab-${value}`;
const panelId = (value: string) => `tabpanel-${value}`;

export function Tabs({
  tabs,
  value,
  onChange,
  ariaLabel = "Content sections",
  keepMounted = false,
  sx,
}: TabsProps) {
  const tabValueSet = useMemo(() => {
    return new Set(tabs.map((tab) => tab.value));
  }, [tabs]);

  const firstTabValue = tabs[0]?.value;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(() => {
    return tabValueSet.has(value) ? value : firstTabValue;
  });

  useEffect(() => {
    if (!tabs.length) {
      setSelectedValue(undefined);
      return;
    }

    if (tabValueSet.has(value)) {
      setSelectedValue(value);
      return;
    }

    setSelectedValue((prev) => {
      if (prev && tabValueSet.has(prev)) {
        return prev;
      }

      return firstTabValue;
    });
  }, [firstTabValue, tabValueSet, tabs.length, value]);

  const handleChange = (_event: SyntheticEvent, nextValue: string) => {
    setSelectedValue(nextValue);
    onChange?.(nextValue);
  };

  if (!tabs.length || !selectedValue) {
    return null;
  }

  return (
    <Box sx={sx}>
      <MuiTabs
        value={selectedValue}
        onChange={handleChange}
        aria-label={ariaLabel}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          minHeight: 44,
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: 2,
          },
        }}
      >
        {tabs.map((tab) => (
          <MuiTab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            id={tabId(tab.value)}
            aria-controls={panelId(tab.value)}
            disabled={tab.disabled}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              minHeight: 44,
              px: 2,
            }}
          />
        ))}
      </MuiTabs>

      {tabs.map((tab) => {
        const isActive = selectedValue === tab.value;

        if (!keepMounted && !isActive) {
          return null;
        }

        return (
          <Box
            key={tab.value}
            id={panelId(tab.value)}
            role="tabpanel"
            aria-labelledby={tabId(tab.value)}
            hidden={!isActive}
            sx={{ pt: 2 }}
          >
            {tab.content}
            {!tab.content ? (
              <Typography variant="body2" color="text.secondary">
                No content available.
              </Typography>
            ) : null}
          </Box>
        );
      })}
    </Box>
  );
}
