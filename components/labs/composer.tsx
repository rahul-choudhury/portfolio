"use client";

import { Menu } from "@base-ui/react/menu";
import { Popover } from "@base-ui/react/popover";
import { Tooltip } from "@base-ui/react/tooltip";
import {
  ArrowElbowDownLeftIcon,
  ArrowSquareOutIcon,
  BriefcaseIcon,
  BrowserIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChartBarIcon,
  CheckIcon,
  FileIcon,
  FileMagnifyingGlassIcon,
  FileTextIcon,
  GaugeIcon,
  GoogleDriveLogoIcon,
  MicrophoneIcon,
  PaletteIcon,
  PaperclipIcon,
  PencilSimpleIcon,
  PlugIcon,
  PlusIcon,
  PresentationIcon,
  SquaresFourIcon,
  StopIcon,
  WrenchIcon,
  XIcon,
  type Icon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { usePrefersReducedMotion } from "@rahul-choudhury/ui/hooks";
import { motion } from "motion/react";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type ComponentProps,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import styles from "./composer.module.css";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

// Measured from claude.ai's in-chat composer. Nothing here talks to a server:
// menus, attachments, dictation and voice mode only change local state.

const MODELS = [
  {
    id: "opus-5.5",
    name: "Opus 5.5",
    note: "For complex work and everyday tasks",
  },
  {
    id: "sonnet-5.5",
    name: "Sonnet 5.5",
    note: "Fast and capable for most tasks",
  },
  { id: "haiku-5.5", name: "Haiku 5.5", note: "Fastest for quick answers" },
  { id: "opus-5", name: "Opus 5", note: "Previous generation" },
  { id: "sonnet-5", name: "Sonnet 5", note: "Previous generation" },
];
const EFFORTS = ["Low", "Medium", "High", "Extra", "Max"] as const;
const SKILL_NOTES: Record<string, string> = {
  "deep-research":
    "Research a question across many sources and write up a cited report of what it finds.",
  "frontend-design":
    "Design and build distinctive, production-grade web interfaces with a clear visual direction.",
  pdf: "Read, fill, merge, split or create PDF files, including forms and scanned pages.",
  "skill-creator":
    "Create a new skill from scratch, or improve and test an existing one.",
};
const SKILLS = Object.keys(SKILL_NOTES);

type Command = {
  id: string;
  label: string;
  icon: Icon;
  kind: "files" | "command" | "skill";
  note?: string;
  tint?: string;
};

// What "/" offers, in claude.ai's order: built-in commands, then skills.
const COMMANDS: Command[] = [
  { id: "add-files", label: "Add files", icon: PaperclipIcon, kind: "files" },
  {
    id: "usage",
    label: "Usage",
    icon: GaugeIcon,
    kind: "command",
    note: "Show plan usage and rate limits",
  },
  {
    id: "doc",
    label: "Doc",
    icon: FileIcon,
    kind: "command",
    note: "Make a new Claude Document from a brief",
    tint: "light-dark(#2f6fd8, #5b9bf0)",
  },
  {
    id: "slides",
    label: "Slides",
    icon: PresentationIcon,
    kind: "command",
    note: "Make a new Slides deck artifact from a brief",
    tint: "light-dark(#d4602c, #e8794a)",
  },
  {
    id: "design",
    label: "Design",
    icon: PaletteIcon,
    kind: "command",
    note: "Make a new Design artifact from a brief",
    tint: "light-dark(#7b5ee0, #a58cf0)",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ChartBarIcon,
    kind: "command",
    note: "Make a new Claude Data dashboard from a brief",
    tint: "light-dark(#d84c4c, #f07070)",
  },
  ...SKILLS.map((id): Command => ({
    id,
    label: id,
    icon: FileTextIcon,
    kind: "skill",
    note: SKILL_NOTES[id],
  })),
];

// Substring match like claude.ai: prefix matches first, then the rest, each
// group keeping the list order.
function matchCommands(query: string) {
  const needle = query.toLowerCase();
  const prefix: Command[] = [];
  const inside: Command[] = [];
  for (const command of COMMANDS) {
    const at = command.label.toLowerCase().indexOf(needle);
    if (at === 0) prefix.push(command);
    else if (at > 0) inside.push(command);
  }
  return [...prefix, ...inside];
}
const LANGUAGES = [
  "Auto",
  "English",
  "Español",
  "Français",
  "Deutsch",
  "हिन्दी",
  "日本語",
];
const MICS = ["MacBook Pro Microphone", "AirPods Pro"];
const SAMPLE_FILES = [
  { name: "composer-notes.pdf", size: "184 KB" },
  { name: "chin-spacing.png", size: "1.2 MB" },
  { name: "tokens.json", size: "6 KB" },
];
const DICTATION =
  "Can you tighten the spacing in the chin and make the send button a little brighter?";

type Attachment =
  | { id: number; kind: "pasted"; preview: string; lines: number }
  | { id: number; kind: "file"; name: string; size: string };

type Effort = (typeof EFFORTS)[number];
type Mode = "manual" | "auto";

export function Composer({ compact = false }: LabComponentProps) {
  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [research, setResearch] = useState(false);
  const [connectors, setConnectors] = useState({ drive: true, chrome: true });
  const [model, setModel] = useState(MODELS[0].id);
  const [effort, setEffort] = useState<Effort>("Medium");
  const [mode, setMode] = useState<Mode>("manual");
  const [mic, setMic] = useState(MICS[0]);
  const [language, setLanguage] = useState("Auto");
  const [dictating, setDictating] = useState(false);
  const [voice, setVoice] = useState(false);
  const [skill, setSkill] = useState<Command | null>(null);
  const [tokenSelected, setTokenSelected] = useState(false);
  const [indent, setIndent] = useState(0);
  const [active, setActive] = useState({ query: "", index: 0 });
  const [dismissed, setDismissed] = useState<string | null>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const tokenRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);
  const listId = useId();

  const hasContent =
    draft.trim().length > 0 || attachments.length > 0 || skill !== null;
  const current = MODELS.find((entry) => entry.id === model) ?? MODELS[0];

  // "/" only opens the menu at the very start of the draft, and only while
  // the query has no space and still matches something.
  const query = skill ? null : (/^\/(\S*)$/.exec(draft)?.[1] ?? null);
  const matches = query === null ? [] : matchCommands(query);
  const slashOpen = matches.length > 0 && dismissed !== draft;
  const activeIndex =
    active.query === query ? Math.min(active.index, matches.length - 1) : 0;
  const activeCommand = slashOpen ? matches[activeIndex] : undefined;

  // The token sits over the start of the field; the first line of text is
  // indented past it so typing flows on after the command.
  useLayoutEffect(() => {
    const measure = () =>
      setIndent(tokenRef.current ? tokenRef.current.offsetWidth + 4 : 0);
    measure();
  }, [skill]);

  // Grow the field with its content; the card's bottom edge stays put
  // because the column is bottom-aligned, so new lines push it upward.
  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${field.scrollHeight}px`;
  }, [draft, indent]);

  // Fake dictation: type a canned sentence in word by word, then stop.
  useEffect(() => {
    if (!dictating) return;
    const words = DICTATION.split(" ");
    let index = 0;
    const timer = window.setInterval(() => {
      const word = words[index++];
      setDraft((value) =>
        value && !/\s$/.test(value) ? `${value} ${word}` : `${value}${word}`,
      );
      if (index >= words.length) setDictating(false);
    }, 140);
    return () => window.clearInterval(timer);
  }, [dictating]);

  useEffect(() => {
    if (!voice) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setVoice(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [voice]);

  function focusField() {
    requestAnimationFrame(() => fieldRef.current?.focus());
  }

  function send() {
    if (!hasContent) return;
    setDraft("");
    setAttachments([]);
    setSkill(null);
    setTokenSelected(false);
    setDictating(false);
    focusField();
  }

  // From the slash menu the draft is just "/query", so it goes; from the +
  // menu the draft is real text, so it stays after the token.
  function pick(command: Command, keepDraft = false) {
    if (!keepDraft) setDraft("");
    setTokenSelected(false);
    if (command.kind === "files") addFile();
    else setSkill(command);
    focusField();
  }

  function onChange(value: string) {
    setTokenSelected(false);
    // Any edit puts the highlight back on the first match.
    setActive({ query: /^\/(\S*)$/.exec(value)?.[1] ?? "", index: 0 });
    // Typing an exact command name and a space turns it into a token.
    const typed = !skill && /^\/(\S+) $/.exec(value)?.[1]?.toLowerCase();
    const exact =
      typed &&
      COMMANDS.find(
        (command) => command.id === typed && command.kind !== "files",
      );
    if (exact) {
      pick(exact);
      return;
    }
    setDraft(value);
  }

  function addFile() {
    const id = nextId.current++;
    const file = SAMPLE_FILES[id % SAMPLE_FILES.length];
    setAttachments((list) => [...list, { id, kind: "file", ...file }]);
    focusField();
  }

  function onPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const text = event.clipboardData.getData("text/plain");
    const lines = text.split("\n").length;
    if (lines < 12 && text.length < 1200) return;
    event.preventDefault();
    const id = nextId.current++;
    setAttachments((list) => [
      ...list,
      { id, kind: "pasted", preview: text.slice(0, 200), lines },
    ]);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.nativeEvent.isComposing) return;

    if (slashOpen) {
      const step =
        event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
      if (step) {
        event.preventDefault();
        const index = (activeIndex + step + matches.length) % matches.length;
        setActive({ query: query ?? "", index });
        return;
      }
      if ((event.key === "Enter" && !event.shiftKey) || event.key === "Tab") {
        event.preventDefault();
        pick(matches[activeIndex]);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setDismissed(draft);
        return;
      }
    }

    // Backspace against the token selects it first, then removes it.
    const field = event.currentTarget;
    const atStart = field.selectionStart === 0 && field.selectionEnd === 0;
    if (skill && event.key === "Backspace" && atStart) {
      event.preventDefault();
      if (tokenSelected) {
        setSkill(null);
        setTokenSelected(false);
      } else {
        setTokenSelected(true);
      }
      return;
    }
    if (tokenSelected) setTokenSelected(false);

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  }

  function insertSkill(name: string) {
    const command = COMMANDS.find((entry) => entry.id === name);
    if (command) pick(command, !draft.startsWith("/"));
  }

  return (
    <LabStage compact={compact} fill>
      <Tooltip.Provider delay={500}>
        <div className={styles.composer} data-compact={compact}>
          <div className={styles.column}>
            <div
              className={styles.card}
              onClick={(event) => {
                if (event.target === event.currentTarget) focusField();
              }}
            >
              {voice ? (
                <VoiceSession onEnd={() => setVoice(false)} />
              ) : (
                <>
                  {attachments.length > 0 && (
                    <div className={styles.attachments}>
                      {attachments.map((attachment) => (
                        <AttachmentTile
                          key={attachment.id}
                          attachment={attachment}
                          onRemove={() =>
                            setAttachments((list) =>
                              list.filter((item) => item.id !== attachment.id),
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                  {slashOpen && (
                    <SlashMenu
                      id={listId}
                      items={matches}
                      query={query ?? ""}
                      activeIndex={activeIndex}
                      onHover={(index) =>
                        setActive({ query: query ?? "", index })
                      }
                      onPick={pick}
                    />
                  )}
                  <div className={styles.field}>
                    {skill && (
                      <SkillToken
                        ref={tokenRef}
                        command={skill}
                        selected={tokenSelected}
                      />
                    )}
                    {draft === "/" && !skill && (
                      <span aria-hidden="true" className={styles.filterHint}>
                        <span className={styles.hiddenSlash}>/</span>Type to
                        filter
                      </span>
                    )}
                    <textarea
                      ref={fieldRef}
                      rows={1}
                      value={draft}
                      onChange={(event) => onChange(event.target.value)}
                      onKeyDown={onKeyDown}
                      onPaste={onPaste}
                      onPointerDown={() => setTokenSelected(false)}
                      onBlur={() => setTokenSelected(false)}
                      role="combobox"
                      aria-expanded={slashOpen}
                      aria-controls={slashOpen ? listId : undefined}
                      aria-autocomplete="list"
                      aria-activedescendant={
                        activeCommand
                          ? `${listId}-${activeCommand.id}`
                          : undefined
                      }
                      aria-label="Write your prompt to Claude"
                      placeholder={skill ? undefined : "Reply"}
                      spellCheck={false}
                      style={{ textIndent: indent }}
                      className={styles.input}
                    />
                    <Tip label="Send message">
                      <GhostButton
                        big
                        aria-label="Send message"
                        onClick={send}
                        className={styles.send}
                        data-ready={hasContent}
                      >
                        <ArrowElbowDownLeftIcon size={18} />
                      </GhostButton>
                    </Tip>
                  </div>
                </>
              )}
            </div>

            <Chin hidden={voice}>
              <div className={styles.tools}>
                <AttachMenu
                  research={research}
                  connectors={connectors}
                  onAddFile={addFile}
                  onSkill={insertSkill}
                  onResearch={setResearch}
                  onConnectors={setConnectors}
                />
                {research && (
                  <Tip label="Research mode">
                    <GhostButton
                      active
                      aria-label="Turn off research mode"
                      onClick={() => setResearch(false)}
                    >
                      <span className={styles.restIcon}>
                        <FileMagnifyingGlassIcon size={16} />
                      </span>
                      <span className={styles.hoverIcon}>
                        <XIcon size={16} />
                      </span>
                    </GhostButton>
                  </Tip>
                )}
                <Tip label={dictating ? "Stop dictation" : "Dictate"}>
                  <GhostButton
                    active={dictating}
                    aria-label={dictating ? "Stop dictation" : "Dictate"}
                    aria-pressed={dictating}
                    onClick={() => setDictating((value) => !value)}
                  >
                    {dictating ? (
                      <>
                        <motion.span
                          className={styles.restIcon}
                          animate={{ opacity: [1, 0.45, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        >
                          <MicrophoneIcon size={16} weight="fill" />
                        </motion.span>
                        <span className={styles.hoverIcon}>
                          <StopIcon size={14} weight="fill" />
                        </span>
                      </>
                    ) : (
                      <MicrophoneIcon size={16} />
                    )}
                  </GhostButton>
                </Tip>
                {!hasContent && !dictating && (
                  <VoiceSplit
                    mic={mic}
                    language={language}
                    onMic={setMic}
                    onLanguage={setLanguage}
                    onStart={() => setVoice(true)}
                  />
                )}
              </div>

              <p className={styles.disclaimer}>
                Claude is AI and can make mistakes.
              </p>

              <div className={styles.tools}>
                <ModelMenu
                  current={current}
                  effort={effort}
                  onModel={setModel}
                  onEffort={setEffort}
                />
                <ModeMenu mode={mode} onMode={setMode} />
              </div>
            </Chin>
          </div>
        </div>
      </Tooltip.Provider>
    </LabStage>
  );
}

function Chin({ hidden, children }: { hidden: boolean; children: ReactNode }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      inert={hidden}
      className={styles.chin}
      data-hidden={hidden}
    >
      <div className={styles.chinClip}>
        <div className={styles.chinRow}>{children}</div>
      </div>
    </div>
  );
}

type GhostButtonProps = ComponentProps<"button"> & {
  big?: boolean;
  active?: boolean;
};

function GhostButton({
  big = false,
  active = false,
  className,
  children,
  ...props
}: GhostButtonProps) {
  return (
    <button
      type="button"
      data-active={active || undefined}
      data-size={big ? "lg" : undefined}
      className={clsx(styles.ghost, className)}
      {...props}
    >
      <span aria-hidden="true" className={styles.squish}>
        <span className={styles.paint} />
      </span>
      {children}
    </button>
  );
}

function Tip({ label, children }: { label: string; children: ReactElement }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger render={children} />
      <Tooltip.Portal>
        <Tooltip.Positioner
          side="top"
          sideOffset={4}
          className={styles.popoverLayer}
        >
          <Tooltip.Popup render={<TipSurface />}>{label}</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function MenuPopup({
  children,
  side = "top",
  align = "start",
  className,
}: {
  children: ReactNode;
  side?: "top" | "inline-end";
  align?: "start" | "end";
  className?: string;
}) {
  const sub = side === "inline-end";
  return (
    <Menu.Portal>
      <Menu.Positioner
        side={side}
        align={align}
        sideOffset={sub ? 10 : 4}
        alignOffset={sub ? -6 : 0}
        collisionPadding={8}
        className={styles.menuLayer}
      >
        <Menu.Popup render={<PopupSurface className={className} />}>
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

function PopupSurface({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx(styles.surface, className)} {...props} />;
}

function TipSurface({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx(styles.tip, className)} {...props} />;
}

function ItemRow({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx(styles.item, className)} {...props} />;
}

function ItemIcon({ icon: Glyph, color }: { icon: Icon; color?: string }) {
  return (
    <Glyph
      size={16}
      className={styles.itemIcon}
      style={color ? { color } : undefined}
    />
  );
}

// Base UI's item parts, rendered as an ItemRow. They take a plain string
// className so it can be merged into the row's own.
type RowProps<Props> = Omit<Props, "className" | "render"> & {
  className?: string;
};

function MenuItem({ className, ...props }: RowProps<Menu.Item.Props>) {
  return <Menu.Item {...props} render={<ItemRow className={className} />} />;
}

function MenuCheckboxItem({
  className,
  ...props
}: RowProps<Menu.CheckboxItem.Props>) {
  return (
    <Menu.CheckboxItem {...props} render={<ItemRow className={className} />} />
  );
}

function MenuRadioItem({
  className,
  ...props
}: RowProps<Menu.RadioItem.Props>) {
  return (
    <Menu.RadioItem {...props} render={<ItemRow className={className} />} />
  );
}

function Separator() {
  return <Menu.Separator className={styles.separator} />;
}

function SubmenuTrigger({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <Menu.SubmenuTrigger render={<ItemRow />}>
      {icon}
      <span className={styles.itemLabel}>{label}</span>
      {value && <span className={styles.submenuValue}>{value}</span>}
      <CaretRightIcon size={12} className={styles.caret} />
    </Menu.SubmenuTrigger>
  );
}

function Check() {
  return <CheckIcon size={16} weight="bold" className={styles.check} />;
}

function AttachMenu({
  research,
  connectors,
  onAddFile,
  onSkill,
  onResearch,
  onConnectors,
}: {
  research: boolean;
  connectors: { drive: boolean; chrome: boolean };
  onAddFile: () => void;
  onSkill: (name: string) => void;
  onResearch: (value: boolean) => void;
  onConnectors: (value: { drive: boolean; chrome: boolean }) => void;
}) {
  return (
    <Menu.Root>
      <Tip label="Add files, connectors, and more">
        <Menu.Trigger
          render={<GhostButton aria-label="Add files, connectors, and more" />}
        >
          <PlusIcon size={16} />
        </Menu.Trigger>
      </Tip>
      <MenuPopup className={styles.attachMenu}>
        <MenuItem onClick={onAddFile}>
          <ItemIcon icon={PaperclipIcon} />
          <span className={styles.itemLabel}>Upload or add files</span>
          <kbd className={styles.shortcut}>⌘U</kbd>
        </MenuItem>
        <Separator />

        <Menu.SubmenuRoot>
          <SubmenuTrigger
            icon={<ItemIcon icon={FileTextIcon} />}
            label="Skills"
          />
          <MenuPopup side="inline-end" className={styles.skillsMenu}>
            {SKILLS.map((skill) => (
              <MenuItem key={skill} onClick={() => onSkill(skill)}>
                <ItemIcon icon={FileTextIcon} />
                {skill}
              </MenuItem>
            ))}
            <Separator />
            <MenuItem>
              <ItemIcon icon={BriefcaseIcon} />
              Manage skills
            </MenuItem>
            <MenuItem>
              <ItemIcon icon={PlusIcon} />
              Browse skills
            </MenuItem>
          </MenuPopup>
        </Menu.SubmenuRoot>

        <Menu.SubmenuRoot>
          <SubmenuTrigger
            icon={<ItemIcon icon={SquaresFourIcon} />}
            label="Connectors"
          />
          <MenuPopup side="inline-end" className={styles.connectorsMenu}>
            <MenuItem>
              <ItemIcon icon={PlusIcon} />
              Add connector
            </MenuItem>
            <MenuItem>
              <ItemIcon icon={BriefcaseIcon} />
              Manage connectors
            </MenuItem>
            <Separator />
            <SwitchItem
              icon={<ItemIcon icon={GoogleDriveLogoIcon} />}
              label="Google Drive"
              checked={connectors.drive}
              onChange={(drive) => onConnectors({ ...connectors, drive })}
            />
            <SwitchItem
              icon={<ItemIcon icon={BrowserIcon} />}
              label="Claude in Chrome"
              checked={connectors.chrome}
              onChange={(chrome) => onConnectors({ ...connectors, chrome })}
            />
            <Separator />
            <MenuItem>
              <ItemIcon icon={WrenchIcon} />
              Tool access
            </MenuItem>
          </MenuPopup>
        </Menu.SubmenuRoot>

        <Menu.SubmenuRoot>
          <SubmenuTrigger
            icon={<ItemIcon icon={PaletteIcon} />}
            label="Design system"
          />
          <MenuPopup side="inline-end" className={styles.designSystemMenu}>
            <MenuItem>
              <ItemIcon icon={ArrowSquareOutIcon} />
              Manage design systems
            </MenuItem>
            <MenuItem>
              <ItemIcon icon={PlusIcon} />
              New design system
            </MenuItem>
          </MenuPopup>
        </Menu.SubmenuRoot>

        <MenuItem>
          <ItemIcon icon={PlugIcon} />
          Add plugins
        </MenuItem>
        <Separator />
        <MenuCheckboxItem
          checked={research}
          onCheckedChange={(checked) => onResearch(checked)}
          closeOnClick
        >
          <ItemIcon icon={FileMagnifyingGlassIcon} />
          <span className={styles.itemLabel}>Research</span>
          <Menu.CheckboxItemIndicator>
            <Check />
          </Menu.CheckboxItemIndicator>
        </MenuCheckboxItem>
      </MenuPopup>
    </Menu.Root>
  );
}

function SwitchItem({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <MenuCheckboxItem
      checked={checked}
      onCheckedChange={(value) => onChange(value)}
      closeOnClick={false}
    >
      {icon}
      <span className={styles.itemLabel}>{label}</span>
      <span aria-hidden="true" className={styles.switch} data-checked={checked}>
        <span className={styles.switchThumb} />
      </span>
    </MenuCheckboxItem>
  );
}

// Claude's own 5-bar glyph, redrawn.
function VoiceGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="2.625" y1="7.62" x2="2.625" y2="8.38" />
      <line x1="5.312" y1="6.12" x2="5.312" y2="9.88" />
      <line x1="8" y1="2.62" x2="8" y2="13.38" />
      <line x1="10.688" y1="6.12" x2="10.688" y2="9.88" />
      <line x1="13.375" y1="7.62" x2="13.375" y2="8.38" />
    </svg>
  );
}

function VoiceSplit({
  mic,
  language,
  onMic,
  onLanguage,
  onStart,
}: {
  mic: string;
  language: string;
  onMic: (value: string) => void;
  onLanguage: (value: string) => void;
  onStart: () => void;
}) {
  return (
    <div role="group" aria-label="Use voice mode" className={styles.tools}>
      <Tip label="Use voice mode">
        <GhostButton aria-label="Use voice mode" onClick={onStart}>
          <VoiceGlyph />
        </GhostButton>
      </Tip>
      <Menu.Root>
        <Tip label="Microphone">
          <Menu.Trigger
            render={
              <GhostButton
                aria-label="Microphone"
                className={styles.micTrigger}
              />
            }
          >
            <CaretDownIcon size={11} weight="bold" />
          </Menu.Trigger>
        </Tip>
        <MenuPopup className={styles.micMenu}>
          <div className={styles.micLevel} aria-hidden="true">
            <MicrophoneIcon size={14} className={styles.micIcon} />
            <LevelMeter />
          </div>
          <Menu.RadioGroup
            value={mic}
            onValueChange={(value) => onMic(value as string)}
          >
            {MICS.map((name) => (
              <MenuRadioItem key={name} value={name} closeOnClick>
                <span className={styles.micName}>{name}</span>
                <Menu.RadioItemIndicator>
                  <Check />
                </Menu.RadioItemIndicator>
              </MenuRadioItem>
            ))}
          </Menu.RadioGroup>
          <Separator />
          <Menu.Group>
            <Menu.GroupLabel className={styles.groupLabel}>
              Dictation settings
            </Menu.GroupLabel>
            <Menu.SubmenuRoot>
              <SubmenuTrigger label="Language" value={language} />
              <MenuPopup side="inline-end" className={styles.languageMenu}>
                <Menu.RadioGroup
                  value={language}
                  onValueChange={(value) => onLanguage(value as string)}
                >
                  {LANGUAGES.map((name) => (
                    <MenuRadioItem key={name} value={name} closeOnClick>
                      <span className={styles.itemLabel}>{name}</span>
                      <Menu.RadioItemIndicator>
                        <Check />
                      </Menu.RadioItemIndicator>
                    </MenuRadioItem>
                  ))}
                </Menu.RadioGroup>
              </MenuPopup>
            </Menu.SubmenuRoot>
          </Menu.Group>
        </MenuPopup>
      </Menu.Root>
    </div>
  );
}

// A fake input level, so the device picker feels live.
function LevelMeter() {
  const reduced = usePrefersReducedMotion();
  return (
    <span className={styles.meter}>
      <motion.span
        className={styles.meterLevel}
        initial={{ scaleX: 0.15 }}
        animate={
          reduced
            ? { scaleX: 0.3 }
            : { scaleX: [0.12, 0.42, 0.2, 0.6, 0.18, 0.34, 0.12] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

function ModelMenu({
  current,
  effort,
  onModel,
  onEffort,
}: {
  current: (typeof MODELS)[number];
  effort: Effort;
  onModel: (id: string) => void;
  onEffort: (value: Effort) => void;
}) {
  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <GhostButton
            aria-label={`Model: ${current.name} ${effort}`}
            className={styles.modelTrigger}
          />
        }
      >
        <span className={styles.modelName}>{current.name}</span>
        <span className={styles.modelEffort}>{effort}</span>
      </Menu.Trigger>
      <MenuPopup align="end" className={styles.modelMenu}>
        <MenuItem className={styles.detailedItem}>
          <span className={styles.itemText}>
            <span>{current.name}</span>
            <span className={styles.itemNote}>{current.note}</span>
          </span>
          <span className={styles.topIndicator}>
            <Check />
          </span>
        </MenuItem>
        <Separator />
        <Menu.SubmenuRoot>
          <SubmenuTrigger label="Effort" value={effort} />
          <MenuPopup side="inline-end" className={styles.effortMenu}>
            <p className={styles.effortNote}>
              Higher effort means more thorough responses, but takes longer and
              uses your limits faster.
            </p>
            <Menu.RadioGroup
              value={effort}
              onValueChange={(value) => onEffort(value as Effort)}
            >
              {EFFORTS.map((level) => (
                <MenuRadioItem key={level} value={level} closeOnClick>
                  <span>{level}</span>
                  {level === "Medium" && (
                    <span className={styles.badge}>Recommended</span>
                  )}
                  <Menu.RadioItemIndicator className={styles.endIndicator}>
                    <Check />
                  </Menu.RadioItemIndicator>
                </MenuRadioItem>
              ))}
            </Menu.RadioGroup>
          </MenuPopup>
        </Menu.SubmenuRoot>
        <Menu.SubmenuRoot>
          <SubmenuTrigger label="More models" />
          <MenuPopup side="inline-end" className={styles.moreModelsMenu}>
            <Menu.RadioGroup
              value={current.id}
              onValueChange={(value) => onModel(value as string)}
            >
              {MODELS.map((entry) => (
                <MenuRadioItem key={entry.id} value={entry.id} closeOnClick>
                  <span className={styles.itemLabel}>{entry.name}</span>
                  <Menu.RadioItemIndicator>
                    <Check />
                  </Menu.RadioItemIndicator>
                </MenuRadioItem>
              ))}
            </Menu.RadioGroup>
          </MenuPopup>
        </Menu.SubmenuRoot>
      </MenuPopup>
    </Menu.Root>
  );
}

const MODES: { value: Mode; label: string; note: string }[] = [
  {
    value: "manual",
    label: "Manual",
    note: "Claude asks before using new tools or opening new sites.",
  },
  {
    value: "auto",
    label: "Auto",
    note: "Claude runs on its own and pauses to ask if anything looks unsafe.",
  },
];

function ModeMenu({
  mode,
  onMode,
}: {
  mode: Mode;
  onMode: (value: Mode) => void;
}) {
  const label = MODES.find((entry) => entry.value === mode)?.label;
  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <GhostButton
            aria-label={`Permission mode: ${label}`}
            className={styles.modeTrigger}
          />
        }
      >
        {label}
      </Menu.Trigger>
      <MenuPopup align="end" className={styles.modeMenu}>
        <Menu.Group>
          <Menu.GroupLabel className={styles.groupLabel}>
            Permission mode
          </Menu.GroupLabel>
          <Menu.RadioGroup
            value={mode}
            onValueChange={(value) => onMode(value as Mode)}
          >
            {MODES.map((entry) => (
              <MenuRadioItem
                key={entry.value}
                value={entry.value}
                className={styles.detailedItem}
                closeOnClick
              >
                <span className={styles.itemText}>
                  <span>{entry.label}</span>
                  <span className={styles.itemNote}>{entry.note}</span>
                </span>
                <Menu.RadioItemIndicator className={styles.topIndicator}>
                  <Check />
                </Menu.RadioItemIndicator>
              </MenuRadioItem>
            ))}
          </Menu.RadioGroup>
        </Menu.Group>
      </MenuPopup>
    </Menu.Root>
  );
}

function AttachmentTile({
  attachment,
  onRemove,
}: {
  attachment: Attachment;
  onRemove: () => void;
}) {
  const label =
    attachment.kind === "pasted"
      ? `Pasted text, ${attachment.lines} lines`
      : attachment.name;
  const badge =
    attachment.kind === "pasted"
      ? "Pasted"
      : (attachment.name.split(".").pop() ?? "File");

  return (
    <div className={styles.tile}>
      <div role="img" aria-label={label} className={styles.tileCard}>
        {attachment.kind === "pasted" ? (
          <p className={styles.pastedText}>{attachment.preview}</p>
        ) : (
          <div className={styles.fileInfo}>
            <p className={styles.fileName}>{attachment.name}</p>
            <p className={styles.fileSize}>{attachment.size}</p>
          </div>
        )}
        <div className={styles.tileFooter}>
          <span className={styles.tileBadge}>{badge}</span>
          {attachment.kind === "pasted" && (
            <Tip label="Edit">
              <GhostButton
                aria-label={`Edit ${label}`}
                className={styles.editButton}
              >
                <PencilSimpleIcon size={12} />
              </GhostButton>
            </Tip>
          )}
        </div>
      </div>
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        className={styles.remove}
      >
        <XIcon size={11} weight="bold" />
      </button>
    </div>
  );
}

const BARS = [0.35, 0.7, 1, 0.55, 0.85, 0.4, 0.65];

// Voice mode takes over the card: animated bars, a status line, and End.
function VoiceSession({ onEnd }: { onEnd: () => void }) {
  const reduced = usePrefersReducedMotion();
  const endRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    endRef.current?.focus();
  }, []);

  return (
    <div className={styles.voice} role="status">
      <span className={styles.bars} aria-hidden="true">
        {BARS.map((peak, index) => (
          <motion.span
            key={index}
            className={styles.bar}
            initial={{ scaleY: 0.25 }}
            animate={
              reduced
                ? { scaleY: peak }
                : { scaleY: [0.25, peak, 0.35, peak * 0.8, 0.25] }
            }
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: index * 0.09,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
      <span className={styles.listening}>Listening…</span>
      <button ref={endRef} type="button" onClick={onEnd} className={styles.end}>
        End
      </button>
    </div>
  );
}

// The "/" list. Focus never leaves the field: the field drives the
// highlight through aria-activedescendant, and the mouse only previews.
function SlashMenu({
  id,
  items,
  query,
  activeIndex,
  onHover,
  onPick,
}: {
  id: string;
  items: Command[];
  query: string;
  activeIndex: number;
  onHover: (index: number) => void;
  onPick: (command: Command) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tipTop, setTipTop] = useState<number | null>(null);
  const active = items[activeIndex];

  function placeTip() {
    const item = itemRefs.current[activeIndex];
    const list = listRef.current;
    setTipTop(item && list ? item.offsetTop - list.scrollTop : null);
  }

  // Keyboard moves keep the highlight in view; the wheel stays free.
  useLayoutEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useLayoutEffect(() => {
    placeTip();
  });

  return (
    <div className={styles.slash}>
      <PopupSurface
        ref={listRef}
        id={id}
        role="listbox"
        aria-label="Commands and skills"
        onScroll={placeTip}
        className={styles.slashList}
      >
        {items.map((command, index) => {
          return (
            <ItemRow
              key={command.id}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              id={`${id}-${command.id}`}
              role="option"
              aria-label={command.label}
              aria-selected={index === activeIndex}
              data-highlighted={index === activeIndex || undefined}
              onPointerMove={() => {
                if (index !== activeIndex) onHover(index);
              }}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onPick(command)}
            >
              <ItemIcon icon={command.icon} color={command.tint} />
              <MatchedLabel text={command.label} query={query} />
            </ItemRow>
          );
        })}
      </PopupSurface>
      {active?.note && tipTop !== null && (
        <TipSurface
          aria-hidden="true"
          style={{ top: tipTop }}
          className={styles.slashNote}
        >
          <MatchedLabel text={active.note} query={query} wrap />
        </TipSurface>
      )}
    </div>
  );
}

// The matched run of letters is set heavier, as on claude.ai.
function MatchedLabel({
  text,
  query,
  wrap = false,
}: {
  text: string;
  query: string;
  wrap?: boolean;
}) {
  const className = wrap ? undefined : styles.matchLabel;
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {text.slice(0, at)}
      <span className={styles.match}>{text.slice(at, at + query.length)}</span>
      {text.slice(at + query.length)}
    </span>
  );
}

// The picked command, drawn over the start of the field. Clicking it shows
// what the skill does; Backspace beside it selects, then removes it.
function SkillToken({
  ref,
  command,
  selected,
}: {
  ref: Ref<HTMLButtonElement>;
  command: Command;
  selected: boolean;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={`${command.label} ${command.kind === "skill" ? "skill" : "command"}`}
        ref={ref}
        className={styles.token}
      >
        <span
          aria-hidden="true"
          className={styles.tokenHighlight}
          data-selected={selected}
        />
        <span className={styles.tokenText}>
          <span aria-hidden="true">/</span>
          {command.id}
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          side="top"
          align="start"
          sideOffset={8}
          className={styles.popoverLayer}
        >
          <Popover.Popup render={<PopupSurface className={styles.skillCard} />}>
            <p className={styles.skillNote}>{command.note ?? command.label}</p>
            <p className={styles.skillKind}>
              {command.kind === "skill" ? "Skill" : "Command"}
            </p>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
