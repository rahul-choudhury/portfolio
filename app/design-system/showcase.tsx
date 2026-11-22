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
import styles from "./design-system.module.css";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
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
    <div className={styles.row}>
      <h3 className={styles.rowTitle}>{label}</h3>
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
    <div className={styles.state}>
      <p className={styles.stateLabel}>{label}</p>
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
        <div className={styles.rows}>
          <Row label="Variants">
            <div className={styles.inline}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </Row>

          <Row label="Sizes">
            <div className={styles.inline}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Send">
                <PaperPlaneTiltIcon size={16} />
              </Button>
            </div>
          </Row>

          <Row label="States">
            <div className={styles.inline}>
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Row>
        </div>
      </Section>

      {/* ---- Card ---- */}
      <Section title="Card">
        <div className={styles.cards}>
          <Card className={styles.card}>
            <p className={styles.cardTitle}>Bordered</p>
            <p className={styles.cardText}>The default. Visual separation.</p>
          </Card>
          <Card variant="plain" className={styles.card}>
            <p className={styles.cardTitle}>Plain</p>
            <p className={styles.cardText}>Surface only, no border.</p>
          </Card>
          <Card variant="elevated" className={styles.card}>
            <p className={styles.cardTitle}>Elevated</p>
            <p className={styles.cardText}>Subtle shadow lift.</p>
          </Card>
        </div>
      </Section>

      {/* ---- Input ---- */}
      <Section title="Input">
        <div className={styles.fields}>
          <Row label="Sizes">
            <div className={styles.stack}>
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium (default)" />
              <Input size="lg" placeholder="Large" />
            </div>
          </Row>
          <Row label="States">
            <div className={styles.stack}>
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
            <div className={styles.search}>
              <MagnifyingGlassIcon size={16} className={styles.searchIcon} />
              <Input
                variant="bare"
                aria-label="Search"
                placeholder="Search inside a custom container"
                className={styles.searchInput}
              />
            </div>
          </Row>
        </div>
      </Section>

      {/* ---- Textarea ---- */}
      <Section title="Textarea">
        <div className={styles.fields}>
          <Row label="States">
            <div className={styles.stack}>
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
            <div className={styles.composer}>
              <Textarea
                variant="bare"
                aria-label="Message"
                rows={1}
                placeholder="Bare textarea in a composer"
                className={styles.composerInput}
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
        <div className={styles.fields}>
          <Row label="States">
            <div className={styles.stack}>
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
                  className={styles.ghostTrigger}
                >
                  <SelectValue placeholder="Choose a font..." />
                </SelectTrigger>
                <SelectContent
                  align="start"
                  alignItemWithTrigger={false}
                  className={styles.startMenu}
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
        <div className={styles.stack}>
          <FieldRoot>
            <FieldLabel className={styles.checkLabel}>
              <Checkbox
                checked={checkboxA}
                name="design-system-checkbox-unchecked"
                onCheckedChange={setCheckboxA}
              />
              <span>Unchecked by default</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel className={styles.checkLabel}>
              <Checkbox
                checked={checkboxB}
                name="design-system-checkbox-checked"
                onCheckedChange={setCheckboxB}
              />
              <span>Checked by default</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot disabled>
            <FieldLabel className={styles.checkLabel}>
              <Checkbox disabled name="design-system-checkbox-disabled" />
              <span>Disabled</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel className={styles.checkLabel}>
              <Checkbox
                indeterminate
                name="design-system-checkbox-indeterminate"
              />
              <span>Indeterminate</span>
            </FieldLabel>
          </FieldRoot>
          <FieldRoot invalid>
            <FieldLabel className={styles.checkLabel}>
              <Checkbox name="design-system-checkbox-invalid" />
              <span>Invalid</span>
            </FieldLabel>
          </FieldRoot>
        </div>
      </Section>

      {/* ---- Field Composition ---- */}
      <Section title="Field Composition">
        <div className={styles.fields}>
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
            <FieldLabel className={styles.checkLabel}>
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
            <div className={styles.actions}>
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
            <div className={styles.actions}>
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
            <p className={styles.popoverText}>
              This is a popover with additional context. It anchors to the
              trigger and supports keyboard navigation.
            </p>
          </PopoverContent>
        </Popover>
      </Section>

      {/* ---- Skeleton ---- */}
      <Section title="Skeleton">
        <div className={styles.skeletons}>
          <Skeleton className={styles.titleLine} />
          <Skeleton className={styles.subtitleLine} />
          <Skeleton className={styles.block} />
          <div className={styles.profile}>
            <Skeleton className={styles.avatar} />
            <div className={styles.profileLines}>
              <Skeleton className={styles.nameLine} />
              <Skeleton className={styles.metaLine} />
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
