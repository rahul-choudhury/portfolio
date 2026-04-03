"use client";

/**
 * Tabs
 *
 * Tabbed interface for switching between content panels,
 * backed by Base UI Tabs.
 *
 * @parts Tabs, TabsList, Tab, TabPanel
 *
 * @accessibility
 * - Keyboard: Arrow keys to navigate tabs, Space/Enter to activate.
 * - Tab panels are associated with their tabs via aria-controls.
 * - Only the active panel is visible; inactive panels are hidden.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <Tab value="overview">Overview</Tab>
 *     <Tab value="settings">Settings</Tab>
 *   </TabsList>
 *   <TabPanel value="overview">Overview content</TabPanel>
 *   <TabPanel value="settings">Settings content</TabPanel>
 * </Tabs>
 * ```
 */

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

/* ----- Root ----- */

const Tabs = BaseTabs.Root;

/* ----- List ----- */

type TabsListProps = React.ComponentProps<typeof BaseTabs.List>;

function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <BaseTabs.List className={cn("relative flex", className)} {...props}>
      {children}
      <BaseTabs.Indicator
        className="absolute bottom-0 h-0.5 bg-accent"
        render={({
          onDrag,
          onDragEnd,
          onDragStart,
          onAnimationStart,
          ...rest
        }) => (
          <motion.span
            {...rest}
            layout
            style={{
              ...rest.style,
              left: "var(--active-tab-left)",
              width: "var(--active-tab-width)",
            }}
          />
        )}
      />
    </BaseTabs.List>
  );
}

/* ----- Tab ----- */

type TabProps = React.ComponentProps<typeof BaseTabs.Tab>;

function Tab({ className, ...props }: TabProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        "px-3 py-2 text-sm font-medium text-text-muted transition-colors",
        "hover:text-text",
        "aria-selected:text-text",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    />
  );
}

/* ----- Panel ----- */

type TabPanelProps = React.ComponentProps<typeof BaseTabs.Panel>;

function TabPanel({ className, ...props }: TabPanelProps) {
  return <BaseTabs.Panel className={cn("pt-4", className)} {...props} />;
}

export { Tab, TabPanel, Tabs, TabsList };
