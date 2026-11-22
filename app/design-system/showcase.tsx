"use client";

import {
  FileTextIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Textarea,
} from "@rahul-choudhury/ui/components";
import { useState } from "react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-sm font-medium text-text-muted">{title}</h2>
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
      <p className="font-mono text-xs tracking-[0.08em] text-text-muted uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

export function Showcase() {
  const [checkboxA, setCheckboxA] = useState(false);
  const [checkboxB, setCheckboxB] = useState(true);

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

      {/* ---- Card ---- */}
      <Section title="Card">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm font-medium text-text">Bordered</p>
            <p className="mt-1 text-sm text-text-secondary">
              The default. Visual separation.
            </p>
          </Card>
          <Card variant="plain" className="p-4">
            <p className="text-sm font-medium text-text">Plain</p>
            <p className="mt-1 text-sm text-text-secondary">
              Surface only, no border.
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
          <Row label="Bare">
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface pl-3 focus-within:border-border-strong">
              <MagnifyingGlassIcon size={16} className="text-text-muted" />
              <Input
                variant="bare"
                aria-label="Search"
                placeholder="Search inside a custom container"
                className="px-0"
              />
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
                <FieldRoot>
                  <FieldLabel>Message</FieldLabel>
                  <Textarea placeholder="Write something..." rows={3} />
                </FieldRoot>
              </StatePreview>
              <StatePreview label="Invalid">
                <FieldRoot invalid>
                  <FieldLabel>Error</FieldLabel>
                  <Textarea defaultValue="Too short" rows={3} />
                  <FieldError>
                    Message must be at least 20 characters.
                  </FieldError>
                </FieldRoot>
              </StatePreview>
              <StatePreview label="Disabled">
                <FieldRoot disabled>
                  <FieldLabel>Disabled</FieldLabel>
                  <Textarea placeholder="Disabled" rows={3} />
                </FieldRoot>
              </StatePreview>
            </div>
          </Row>
          <Row label="Bare">
            <div className="flex items-end gap-2 rounded-lg border border-border bg-surface p-2 focus-within:border-border-strong">
              <Textarea
                variant="bare"
                aria-label="Message"
                rows={1}
                placeholder="Bare textarea in a composer"
                className="field-sizing-content max-h-32 resize-none"
              />
              <Button size="icon" aria-label="Send">
                <PaperPlaneTiltIcon size={16} />
              </Button>
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

              <StatePreview label="Disabled item">
                <Select defaultValue="sans">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a font..." />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="serif" disabled>
                      Serif (unavailable)
                    </SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </StatePreview>
            </div>
          </Row>
          <Row label="Ghost trigger, popup aligned to start">
            <div>
              <Select defaultValue="sans" size="sm">
                <SelectTrigger
                  variant="ghost"
                  aria-label="Font"
                  className="w-auto"
                >
                  <SelectValue placeholder="Choose a font..." />
                </SelectTrigger>
                <SelectContent
                  align="start"
                  alignItemWithTrigger={false}
                  className="min-w-56"
                >
                  <SelectItem value="sans">Sans-serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Row>
        </div>
      </Section>

      {/* ---- Checkbox ---- */}
      <Section title="Checkbox">
        <div className="flex flex-col gap-3">
          <FieldRoot>
            <FieldLabel className="inline-flex items-center gap-2">
              <Checkbox
                checked={checkboxA}
                name="design-system-checkbox-unchecked"
                onCheckedChange={setCheckboxA}
              />
              <span>Unchecked by default</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel className="inline-flex items-center gap-2">
              <Checkbox
                checked={checkboxB}
                name="design-system-checkbox-checked"
                onCheckedChange={setCheckboxB}
              />
              <span>Checked by default</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot disabled>
            <FieldLabel className="inline-flex items-center gap-2">
              <Checkbox disabled name="design-system-checkbox-disabled" />
              <span>Disabled</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel className="inline-flex items-center gap-2">
              <Checkbox
                indeterminate
                name="design-system-checkbox-indeterminate"
              />
              <span>Indeterminate</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot invalid>
            <FieldLabel className="inline-flex items-center gap-2">
              <Checkbox name="design-system-checkbox-invalid" />
              <span>Invalid</span>
            </FieldLabel>
          </FieldRoot>
        </div>
      </Section>

      {/* ---- Field Composition ---- */}
      <Section title="Field Composition">
        <div className="max-w-sm space-y-6">
          <FieldRoot>
            <FieldLabel>Email</FieldLabel>
            <Input required type="email" placeholder="you@example.com" />
            <FieldDescription>
              We&apos;ll never share your email.
            </FieldDescription>
          </FieldRoot>

          <FieldRoot invalid>
            <FieldLabel>Username</FieldLabel>
            <Input defaultValue="ab" />
            <FieldError>Username must be at least 3 characters.</FieldError>
          </FieldRoot>

          <FieldRoot disabled>
            <FieldLabel>Organization</FieldLabel>
            <Input defaultValue="Acme Corp" />
            <FieldDescription>Contact support to change this.</FieldDescription>
          </FieldRoot>

          <FieldRoot>
            <FieldLabel>Bio</FieldLabel>
            <Textarea rows={3} placeholder="Tell us about yourself..." />
            <FieldDescription>Markdown supported.</FieldDescription>
          </FieldRoot>

          <FieldRoot>
            <FieldLabel>Favorite Font</FieldLabel>
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
            <FieldDescription>
              Used for future theme personalization.
            </FieldDescription>
          </FieldRoot>

          <FieldRoot>
            <FieldLabel className="inline-flex items-center gap-2">
              <Checkbox
                checked={checkboxA}
                name="design-system-checkbox-updates"
                onCheckedChange={setCheckboxA}
              />
              <span>Accept updates</span>
            </FieldLabel>
            <FieldDescription>
              Occasional product and writing updates.
            </FieldDescription>
          </FieldRoot>
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

      {/* ---- Alert Dialog ---- */}
      <Section title="Alert Dialog">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Delete post
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              The post and its comments will be permanently deleted. This
              can&apos;t be undone.
            </AlertDialogDescription>
            <div className="mt-4 flex justify-end gap-2">
              <AlertDialogClose render={<Button variant="ghost" />}>
                Cancel
              </AlertDialogClose>
              <AlertDialogClose render={<Button variant="destructive" />}>
                Delete
              </AlertDialogClose>
            </div>
          </AlertDialogContent>
        </AlertDialog>
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
        <Card>
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
