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
import { cn } from "@/lib/utils";

/* ----- Root ----- */

const Tabs = BaseTabs.Root;

/* ----- List ----- */

type TabsListProps = React.ComponentProps<typeof BaseTabs.List>;

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      className={cn("flex border-b border-border", className)}
      {...props}
    />
  );
}

/* ----- Tab ----- */

type TabProps = React.ComponentProps<typeof BaseTabs.Tab>;

function Tab({ className, ...props }: TabProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        "-mb-px border-b-2 border-transparent px-3 py-2 text-sm font-medium text-text-muted transition-colors",
        "hover:text-text",
        "aria-selected:border-accent aria-selected:text-text",
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

export { Tabs, TabsList, Tab, TabPanel };
