"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  onChange: (nextValue: string) => void;
  queryParam?: string;
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
  queryParam = "tab",
  ariaLabel = "Content sections",
  keepMounted = false,
  sx,
}: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const tabValueSet = useMemo(() => {
    return new Set(tabs.map((tab) => tab.value));
  }, [tabs]);

  const firstTabValue = tabs[0]?.value;
  const selectedValue = tabValueSet.has(value) ? value : firstTabValue;

  const updateUrl = useCallback(
    (nextValue: string) => {
      const params = new URLSearchParams(searchParamsString);
      params.set(queryParam, nextValue);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, queryParam, router, searchParamsString],
  );

  useEffect(() => {
    if (!tabs.length) {
      return;
    }

    const queryValue = searchParams.get(queryParam);
    if (queryValue && tabValueSet.has(queryValue)) {
      if (queryValue !== value) {
        onChange(queryValue);
      }
      return;
    }

    const fallbackValue = tabValueSet.has(value) ? value : firstTabValue;
    if (fallbackValue && queryValue !== fallbackValue) {
      updateUrl(fallbackValue);
    }
  }, [
    firstTabValue,
    onChange,
    queryParam,
    searchParams,
    tabValueSet,
    tabs.length,
    updateUrl,
    value,
  ]);

  const handleChange = (_event: SyntheticEvent, nextValue: string) => {
    onChange(nextValue);
    updateUrl(nextValue);
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
            {keepMounted || isActive ? tab.content : null}
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
