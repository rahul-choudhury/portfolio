"use client";

import {
  DotsThreeIcon,
  FileTextIcon,
  InfoIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import { Badge } from "@workspace/design-system/ui/badge";
import { Button } from "@workspace/design-system/ui/button";
import { Card } from "@workspace/design-system/ui/card";
import { Checkbox } from "@workspace/design-system/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/design-system/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/design-system/ui/dropdown-menu";
import { EmptyState } from "@workspace/design-system/ui/empty-state";
import { Field } from "@workspace/design-system/ui/field";
import { Input } from "@workspace/design-system/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/design-system/ui/popover";
import { RadioGroup, RadioItem } from "@workspace/design-system/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/ui/select";
import { Skeleton } from "@workspace/design-system/ui/skeleton";
import { Switch } from "@workspace/design-system/ui/switch";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from "@workspace/design-system/ui/tabs";
import { Textarea } from "@workspace/design-system/ui/textarea";
import { useState } from "react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-sm font-medium text-text-muted">{title}</h2>
      {children}
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-6 last:border-0 last:pb-0">
      <h3 className="text-sm font-medium text-text">{label}</h3>
      {children}
    </div>
  );
}

function StatePreview({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-mono uppercase tracking-[0.08em] text-text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

export function Showcase() {
  const [checkboxA, setCheckboxA] = useState(false);
  const [checkboxB, setCheckboxB] = useState(true);
  const [radio, setRadio] = useState("option-1");
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(true);

  return (
    <>
      {/* ---- Button ---- */}
      <Section title="Button">
        <div className="space-y-6">
          <Row label="Variants">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </Row>

          <Row label="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Send">
                <PaperPlaneTiltIcon size={16} />
              </Button>
            </div>
          </Row>

          <Row label="States">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Row>
        </div>
      </Section>

      {/* ---- Badge ---- */}
      <Section title="Badge">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="danger">Error</Badge>
        </div>
      </Section>

      {/* ---- Card ---- */}
      <Section title="Card">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm font-medium text-text">Default</p>
            <p className="mt-1 text-sm text-text-secondary">
              Plain surface, no border.
            </p>
          </Card>
          <Card variant="bordered" className="p-4">
            <p className="text-sm font-medium text-text">Bordered</p>
            <p className="mt-1 text-sm text-text-secondary">
              Visual separation.
            </p>
          </Card>
          <Card variant="elevated" className="p-4">
            <p className="text-sm font-medium text-text">Elevated</p>
            <p className="mt-1 text-sm text-text-secondary">
              Subtle shadow lift.
            </p>
          </Card>
        </div>
      </Section>

      {/* ---- Input ---- */}
      <Section title="Input">
        <div className="max-w-sm space-y-6">
          <Row label="Sizes">
            <div className="space-y-3">
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium (default)" />
              <Input size="lg" placeholder="Large" />
            </div>
          </Row>
          <Row label="States">
            <div className="space-y-3">
              <StatePreview label="Default">
                <Input placeholder="Default" />
              </StatePreview>
              <StatePreview label="Disabled">
                <Input disabled placeholder="Disabled" />
              </StatePreview>
              <StatePreview label="Invalid">
                <Input aria-invalid="true" defaultValue="Invalid value" />
              </StatePreview>
            </div>
          </Row>
        </div>
      </Section>

      {/* ---- Textarea ---- */}
      <Section title="Textarea">
        <div className="max-w-sm space-y-6">
          <Row label="States">
            <div className="space-y-3">
              <StatePreview label="Default">
                <Field.Root>
                  <Field.Label>Message</Field.Label>
                  <Textarea placeholder="Write something..." rows={3} />
                </Field.Root>
              </StatePreview>
              <StatePreview label="Invalid">
                <Field.Root invalid>
                  <Field.Label>Error</Field.Label>
                  <Textarea defaultValue="Too short" rows={3} />
                  <Field.Error>
                    Message must be at least 20 characters.
                  </Field.Error>
                </Field.Root>
              </StatePreview>
              <StatePreview label="Disabled">
                <Field.Root disabled>
                  <Field.Label>Disabled</Field.Label>
                  <Textarea placeholder="Disabled" rows={3} />
                </Field.Root>
              </StatePreview>
            </div>
          </Row>
        </div>
      </Section>

      {/* ---- Select ---- */}
      <Section title="Select">
        <div className="max-w-sm space-y-6">
          <Row label="States">
            <div className="space-y-3">
              <StatePreview label="Default">
                <Select defaultValue="serif">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a font..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </StatePreview>

              <StatePreview label="Invalid">
                <Select defaultValue="mono">
                  <SelectTrigger aria-invalid="true">
                    <SelectValue placeholder="Choose a font..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </StatePreview>

              <StatePreview label="Disabled">
                <Select defaultValue="sans">
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Choose a font..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </StatePreview>
            </div>
          </Row>
        </div>
      </Section>

      {/* ---- Checkbox ---- */}
      <Section title="Checkbox">
        <div className="flex flex-col gap-3">
          <Field.Root>
            <Field.Label className="inline-flex items-center gap-2">
              <Checkbox
                checked={checkboxA}
                name="design-system-checkbox-unchecked"
                onCheckedChange={setCheckboxA}
              />
              <span>Unchecked by default</span>
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label className="inline-flex items-center gap-2">
              <Checkbox
                checked={checkboxB}
                name="design-system-checkbox-checked"
                onCheckedChange={setCheckboxB}
              />
              <span>Checked by default</span>
            </Field.Label>
          </Field.Root>
          <Field.Root disabled>
            <Field.Label className="inline-flex items-center gap-2">
              <Checkbox disabled name="design-system-checkbox-disabled" />
              <span>Disabled</span>
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label className="inline-flex items-center gap-2">
              <Checkbox
                indeterminate
                name="design-system-checkbox-indeterminate"
              />
              <span>Indeterminate</span>
            </Field.Label>
          </Field.Root>
        </div>
      </Section>

      {/* ---- Radio Group ---- */}
      <Section title="Radio Group">
        <Field.Root>
          <Field.Label>Options</Field.Label>
          <RadioGroup
            name="design-system-radio-options"
            value={radio}
            onValueChange={(v) => setRadio(v as string)}
          >
            <Field.Item>
              <Field.Label className="inline-flex items-center gap-2">
                <RadioItem value="option-1" />
                <span>Option 1</span>
              </Field.Label>
            </Field.Item>
            <Field.Item>
              <Field.Label className="inline-flex items-center gap-2">
                <RadioItem value="option-2" />
                <span>Option 2</span>
              </Field.Label>
            </Field.Item>
            <Field.Item disabled>
              <Field.Label className="inline-flex items-center gap-2">
                <RadioItem value="option-3" disabled />
                <span>Disabled</span>
              </Field.Label>
            </Field.Item>
          </RadioGroup>
        </Field.Root>
      </Section>

      {/* ---- Switch ---- */}
      <Section title="Switch">
        <div className="flex flex-col gap-3">
          <Field.Root>
            <Field.Label className="inline-flex items-center gap-2">
              <Switch
                checked={switchA}
                name="design-system-switch-off"
                onCheckedChange={setSwitchA}
              />
              <span>Off by default</span>
            </Field.Label>
          </Field.Root>
          <Field.Root>
            <Field.Label className="inline-flex items-center gap-2">
              <Switch
                checked={switchB}
                name="design-system-switch-on"
                onCheckedChange={setSwitchB}
              />
              <span>On by default</span>
            </Field.Label>
          </Field.Root>
          <Field.Root disabled>
            <Field.Label className="inline-flex items-center gap-2">
              <Switch disabled name="design-system-switch-disabled" />
              <span>Disabled</span>
            </Field.Label>
          </Field.Root>
        </div>
      </Section>

      {/* ---- Field Composition ---- */}
      <Section title="Field Composition">
        <div className="max-w-sm space-y-6">
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input required type="email" placeholder="you@example.com" />
            <Field.Description>
              We&apos;ll never share your email.
            </Field.Description>
          </Field.Root>

          <Field.Root invalid>
            <Field.Label>Username</Field.Label>
            <Input defaultValue="ab" />
            <Field.Error>Username must be at least 3 characters.</Field.Error>
          </Field.Root>

          <Field.Root disabled>
            <Field.Label>Organization</Field.Label>
            <Input defaultValue="Acme Corp" />
            <Field.Description>
              Contact support to change this.
            </Field.Description>
          </Field.Root>

          <Field.Root>
            <Field.Label>Bio</Field.Label>
            <Textarea rows={3} placeholder="Tell us about yourself..." />
            <Field.Description>Markdown supported.</Field.Description>
          </Field.Root>

          <Field.Root>
            <Field.Label>Favorite Font</Field.Label>
            <Select defaultValue="sans">
              <SelectTrigger>
                <SelectValue placeholder="Choose a font..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sans">Sans-serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="mono">Monospace</SelectItem>
              </SelectContent>
            </Select>
            <Field.Description>
              Used for future theme personalization.
            </Field.Description>
          </Field.Root>

          <Field.Root>
            <Field.Label className="inline-flex items-center gap-2">
              <Checkbox
                checked={checkboxA}
                name="design-system-checkbox-updates"
                onCheckedChange={setCheckboxA}
              />
              <span>Accept updates</span>
            </Field.Label>
            <Field.Description>
              Occasional product and writing updates.
            </Field.Description>
          </Field.Root>
        </div>
      </Section>

      {/* ---- Dialog ---- */}
      <Section title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button variant="destructive" />}>
            Delete item
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to continue?
            </DialogDescription>
            <div className="mt-4 flex justify-end gap-2">
              <DialogClose render={<Button variant="ghost" />}>
                Cancel
              </DialogClose>
              <DialogClose render={<Button variant="destructive" />}>
                Delete
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </Section>

      {/* ---- Popover ---- */}
      <Section title="Popover">
        <Popover>
          <PopoverTrigger
            render={<Button variant="ghost" size="icon" aria-label="Info" />}
          >
            <InfoIcon size={16} />
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-text-secondary">
              This is a popover with additional context. It anchors to the
              trigger and supports keyboard navigation.
            </p>
          </PopoverContent>
        </Popover>
      </Section>

      {/* ---- Dropdown Menu ---- */}
      <Section title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" aria-label="Actions" />}
          >
            <DotsThreeIcon size={16} weight="bold" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      {/* ---- Tabs ---- */}
      <Section title="Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <Tab value="overview">Overview</Tab>
            <Tab value="settings">Settings</Tab>
            <Tab value="notifications">Notifications</Tab>
          </TabsList>
          <TabPanel value="overview">
            <p className="text-sm text-text-secondary">
              Overview content goes here. Tabs use Base UI for keyboard
              navigation and focus management.
            </p>
          </TabPanel>
          <TabPanel value="settings">
            <p className="text-sm text-text-secondary">
              Settings content goes here.
            </p>
          </TabPanel>
          <TabPanel value="notifications">
            <p className="text-sm text-text-secondary">
              Notifications content goes here.
            </p>
          </TabPanel>
        </Tabs>
      </Section>

      {/* ---- Skeleton ---- */}
      <Section title="Skeleton">
        <div className="max-w-sm space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Empty State ---- */}
      <Section title="Empty State">
        <Card variant="bordered">
          <EmptyState
            icon={<FileTextIcon size={32} />}
            title="No posts yet"
            description="Write your first blog post to get started."
            action={<Button size="sm">New Post</Button>}
          />
        </Card>
      </Section>
    </>
  );
}
