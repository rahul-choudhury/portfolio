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
import { cn } from "@rahul-choudhury/ui";
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
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { LabStage } from "./lab-stage";
import type { LabComponentProps } from "./lab-types";

// Measured from claude.ai's in-chat composer. Nothing here talks to a server:
// menus, attachments, dictation and voice mode only change local state.

// Claude's release curve for pressed buttons, copied verbatim.
const SPRING =
  "linear(0, 0.2459 7.14%, 0.6526 14.29%, 0.9468 21.43%, 1.0764 28.57%, 1.0915 35.71%, 1.0585 42.86%, 1.0219 50%, 0.9993 57.14%, 0.9914 64.29%, 0.9921 71.43%, 0.9957 78.57%, 0.9988 85.71%, 1.0004 92.86%, 1)";

// Set on the composer and on every portalled positioner, so popups outside
// the composer's DOM resolve the same values.
const ROOT_VARS = {
  "--cmp-spring": SPRING,
  "--cmp-accent": "light-dark(#1f6fd1, #6aabf1)",
  // One step above the stage in both themes: white on the light stage, a
  // lift over surface-soft on the dark one.
  "--cmp-card":
    "light-dark(var(--color-surface), color-mix(in oklab, var(--color-surface-soft), white 6%))",
} as CSSProperties;

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
        <div
          style={ROOT_VARS}
          className={cn(
            "flex h-full w-full flex-col justify-end",
            compact ? "px-4 pb-3" : "px-4 pb-5 md:px-8",
          )}
        >
          <div className="@container mx-auto w-full max-w-160">
            <div
              className="relative rounded-[14px] bg-(--cmp-card) p-2 shadow-[0_4px_20px_rgb(0_0_0/0.035)] ring-1 ring-text/8 ring-inset"
              onClick={(event) => {
                if (event.target === event.currentTarget) focusField();
              }}
            >
              {voice ? (
                <VoiceSession onEnd={() => setVoice(false)} />
              ) : (
                <>
                  {attachments.length > 0 && (
                    <div className="-mx-2 -mt-2 flex gap-3 overflow-x-auto px-3 pt-3 pb-2">
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
                  <div className="relative pr-9">
                    {skill && (
                      <SkillToken
                        ref={tokenRef}
                        command={skill}
                        selected={tokenSelected}
                      />
                    )}
                    {draft === "/" && !skill && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-[3.5px] left-1.5 text-[15px] leading-5.25 text-text/40"
                      >
                        <span className="invisible">/</span>Type to filter
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
                      className={cn(
                        "block max-h-36.75 min-h-7 w-full resize-none bg-transparent py-[3.5px] pl-1.5",
                        "text-[15px] leading-5.25 text-text outline-none placeholder:text-text/40",
                        "[-webkit-tap-highlight-color:transparent]",
                      )}
                    />
                    <Tip label="Send message">
                      <GhostButton
                        big
                        aria-label="Send message"
                        onClick={send}
                        className={cn(
                          "absolute right-0 bottom-0",
                          hasContent ? "text-text" : "text-text/40",
                        )}
                      >
                        <ArrowElbowDownLeftIcon size={18} />
                      </GhostButton>
                    </Tip>
                  </div>
                </>
              )}
            </div>

            <Chin hidden={voice}>
              <div className="flex items-center gap-1">
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
                      <span className="group-hover/btn:hidden">
                        <FileMagnifyingGlassIcon size={16} />
                      </span>
                      <span className="hidden group-hover/btn:block">
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
                          className="group-hover/btn:hidden"
                          animate={{ opacity: [1, 0.45, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        >
                          <MicrophoneIcon size={16} weight="fill" />
                        </motion.span>
                        <span className="hidden group-hover/btn:block">
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

              <p className="pointer-events-none absolute inset-x-0 hidden justify-center text-text/40 @[600px]:flex">
                Claude is AI and can make mistakes.
              </p>

              <div className="flex items-center gap-1">
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

// The row under the card. It folds away (rows 1fr → 0fr) during voice mode.
function Chin({ hidden, children }: { hidden: boolean; children: ReactNode }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      inert={hidden}
      className={cn(
        "grid transition-[grid-template-rows,opacity,translate] duration-280 ease-out-quart motion-reduce:transition-none",
        hidden ? "-translate-y-1 grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="relative my-2 flex h-6 items-center justify-between px-1.75 text-[13px] leading-4.25 text-text/60">
          {children}
        </div>
      </div>
    </div>
  );
}

type GhostButtonProps = ComponentProps<"button"> & {
  big?: boolean;
  active?: boolean;
};

// Three layers, as on claude.ai: a squish layer that scales on press and
// springs back, a paint layer inside it for hover, and the icon, which never
// moves.
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
      className={cn(
        "group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-1 outline-none",
        "text-text/60 transition-colors duration-60 hover:text-text data-popup-open:text-text",
        "focus-visible:ring-2 focus-visible:ring-text/25",
        "data-active:text-(--cmp-accent) data-active:hover:text-(--cmp-accent)",
        big ? "size-7 rounded-lg" : "h-6 min-w-6 rounded-md",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-1 rounded-[inherit] transition-transform duration-450 ease-(--cmp-spring)",
          "group-active/btn:scale-90 group-active/btn:duration-60 group-active/btn:ease-out",
          "motion-reduce:transition-none motion-reduce:group-active/btn:scale-100",
        )}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-[inherit] transition-colors duration-60",
            "group-hover/btn:bg-text/7.5 group-data-popup-open/btn:bg-text/7.5",
            "group-data-active/btn:bg-(--cmp-accent)/12",
          )}
        />
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
          style={ROOT_VARS}
          className="z-(--z-popover)"
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
        style={ROOT_VARS}
        className="z-(--z-dropdown) outline-none"
      >
        <Menu.Popup render={<PopupSurface className={className} />}>
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

// The floating surface shared by menus, the slash list and the token card.
function PopupSurface({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[14px] bg-(--cmp-card) p-1.5 text-sm text-text shadow-[0_8px_24px_light-dark(rgb(0_0_0/0.1),rgb(0_0_0/0.32)),0_2px_6px_light-dark(rgb(0_0_0/0.05),rgb(0_0_0/0.2))] ring-1 ring-text/5 outline-none ring-inset",
        className,
      )}
      {...props}
    />
  );
}

// The small label surface shared by tooltips and the slash list's notes.
function TipSurface({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-md bg-(--cmp-card) px-2 py-0.75 text-[13px] text-text shadow-[0_2px_6px_light-dark(rgb(0_0_0/0.06),rgb(0_0_0/0.25))] ring-1 ring-text/5 ring-inset",
        className,
      )}
      {...props}
    />
  );
}

// One row in any list: menu items, submenu triggers and slash options.
function ItemRow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-7 cursor-default items-center gap-2 rounded-lg px-2.5 py-1 outline-none select-none data-disabled:opacity-50 data-highlighted:bg-text/10 data-popup-open:bg-text/10",
        className,
      )}
      {...props}
    />
  );
}

function ItemIcon({ icon: Glyph, color }: { icon: Icon; color?: string }) {
  return (
    <Glyph
      size={16}
      className="shrink-0 text-text/80"
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
  return <Menu.Separator className="mx-2.5 my-1 h-px bg-text/10" />;
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
      <span className="flex-1">{label}</span>
      {value && <span className="text-[13px] text-text/60">{value}</span>}
      <CaretRightIcon size={12} className="text-text/60" />
    </Menu.SubmenuTrigger>
  );
}

function Check() {
  return (
    <CheckIcon
      size={16}
      weight="bold"
      className="ml-auto shrink-0 text-(--cmp-accent)"
    />
  );
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
      <MenuPopup className="w-58.5">
        <MenuItem onClick={onAddFile}>
          <ItemIcon icon={PaperclipIcon} />
          <span className="flex-1">Upload or add files</span>
          <kbd className="font-sans text-xs text-text/50">⌘U</kbd>
        </MenuItem>
        <Separator />

        <Menu.SubmenuRoot>
          <SubmenuTrigger
            icon={<ItemIcon icon={FileTextIcon} />}
            label="Skills"
          />
          <MenuPopup side="inline-end" className="w-46">
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
          <MenuPopup side="inline-end" className="w-58">
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
          <MenuPopup side="inline-end" className="w-56">
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
          <span className="flex-1">Research</span>
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
      <span className="flex-1">{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-4.5 w-7.5 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-(--cmp-accent)" : "bg-text/20",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out-quart",
            checked && "translate-x-3",
          )}
        />
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
    <div role="group" aria-label="Use voice mode" className="flex items-center">
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
                className="min-w-3.5 px-px"
              />
            }
          >
            <CaretDownIcon size={11} weight="bold" />
          </Menu.Trigger>
        </Tip>
        <MenuPopup className="w-60">
          <div
            className="flex items-center gap-2 px-2.5 py-1.5"
            aria-hidden="true"
          >
            <MicrophoneIcon size={14} className="text-text/60" />
            <LevelMeter />
          </div>
          <Menu.RadioGroup
            value={mic}
            onValueChange={(value) => onMic(value as string)}
          >
            {MICS.map((name) => (
              <MenuRadioItem key={name} value={name} closeOnClick>
                <span className="flex-1 truncate">{name}</span>
                <Menu.RadioItemIndicator>
                  <Check />
                </Menu.RadioItemIndicator>
              </MenuRadioItem>
            ))}
          </Menu.RadioGroup>
          <Separator />
          <Menu.Group>
            <Menu.GroupLabel className="px-2.5 pt-1 pb-0.5 text-xs text-text/50">
              Dictation settings
            </Menu.GroupLabel>
            <Menu.SubmenuRoot>
              <SubmenuTrigger label="Language" value={language} />
              <MenuPopup side="inline-end" className="w-40">
                <Menu.RadioGroup
                  value={language}
                  onValueChange={(value) => onLanguage(value as string)}
                >
                  {LANGUAGES.map((name) => (
                    <MenuRadioItem key={name} value={name} closeOnClick>
                      <span className="flex-1">{name}</span>
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
    <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-text/10">
      <motion.span
        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-text/50"
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
            className="gap-1 px-2 text-text"
          />
        }
      >
        <span className="font-medium">{current.name}</span>
        <span className="hidden text-text/60 @[420px]:inline">{effort}</span>
      </Menu.Trigger>
      <MenuPopup align="end" className="w-80">
        <MenuItem className="items-start py-1.5">
          <span className="flex flex-1 flex-col">
            <span>{current.name}</span>
            <span className="text-xs text-text/60">{current.note}</span>
          </span>
          <span className="pt-0.5">
            <Check />
          </span>
        </MenuItem>
        <Separator />
        <Menu.SubmenuRoot>
          <SubmenuTrigger label="Effort" value={effort} />
          <MenuPopup side="inline-end" className="w-64">
            <p className="px-2.5 pt-1 pb-1.5 text-xs leading-4 text-text/60">
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
                    <span className="rounded-sm bg-text/10 px-1 py-px text-[10px] text-text/60">
                      Recommended
                    </span>
                  )}
                  <Menu.RadioItemIndicator className="ml-auto">
                    <Check />
                  </Menu.RadioItemIndicator>
                </MenuRadioItem>
              ))}
            </Menu.RadioGroup>
          </MenuPopup>
        </Menu.SubmenuRoot>
        <Menu.SubmenuRoot>
          <SubmenuTrigger label="More models" />
          <MenuPopup side="inline-end" className="w-48">
            <Menu.RadioGroup
              value={current.id}
              onValueChange={(value) => onModel(value as string)}
            >
              {MODELS.map((entry) => (
                <MenuRadioItem key={entry.id} value={entry.id} closeOnClick>
                  <span className="flex-1">{entry.name}</span>
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
            className="hidden px-2 text-text @[340px]:inline-flex"
          />
        }
      >
        {label}
      </Menu.Trigger>
      <MenuPopup align="end" className="w-72">
        <Menu.Group>
          <Menu.GroupLabel className="px-2.5 pt-1 pb-1 text-xs text-text/50">
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
                className="items-start py-1.5"
                closeOnClick
              >
                <span className="flex flex-1 flex-col">
                  <span>{entry.label}</span>
                  <span className="text-xs text-text/60">{entry.note}</span>
                </span>
                <Menu.RadioItemIndicator className="pt-0.5">
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
    <div className="group/tile relative shrink-0 pt-1">
      <div
        role="img"
        aria-label={label}
        className={cn(
          "flex size-30 flex-col justify-between rounded-[10px] bg-surface-soft p-[11.5px]",
          "shadow-[0_1px_2px_rgb(0_0_0/0.05)] ring-1 ring-text/8 ring-inset",
        )}
      >
        {attachment.kind === "pasted" ? (
          <p className="line-clamp-4 text-[11px] leading-[1.3] wrap-break-word text-text/60">
            {attachment.preview}
          </p>
        ) : (
          <div className="flex flex-col gap-0.5">
            <p className="line-clamp-2 text-[13px] leading-4 break-all text-text">
              {attachment.name}
            </p>
            <p className="text-[11px] text-text/60">{attachment.size}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="rounded-full px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-text/60 uppercase ring-1 ring-text/10 ring-inset">
            {badge}
          </span>
          {attachment.kind === "pasted" && (
            <Tip label="Edit">
              <GhostButton
                aria-label={`Edit ${label}`}
                className="size-5 min-w-5"
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
        className={cn(
          "absolute -top-1 -right-2 flex size-5 items-center justify-center rounded-full bg-(--cmp-card) text-text/70 ring-1 ring-text/10",
          "opacity-0 transition-[opacity,color] duration-150 group-hover/tile:opacity-100 hover:text-text",
          "focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
        )}
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
    <div className="flex h-7 items-center gap-3 pl-2" role="status">
      <span className="flex h-4 items-center gap-0.75" aria-hidden="true">
        {BARS.map((peak, index) => (
          <motion.span
            key={index}
            className="h-full w-0.75 origin-center rounded-full bg-(--cmp-accent)"
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
      <span className="flex-1 text-[15px] text-text/60">Listening…</span>
      <button
        ref={endRef}
        type="button"
        onClick={onEnd}
        className="h-7 rounded-lg bg-text px-3 text-[13px] font-medium text-bg transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text/30 focus-visible:outline-none"
      >
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
    <div className="absolute bottom-[calc(100%-2px)] -left-0.5 z-10 w-60">
      <PopupSurface
        ref={listRef}
        id={id}
        role="listbox"
        aria-label="Commands and skills"
        onScroll={placeTip}
        className="relative max-h-64 scrollbar-none overflow-y-auto overscroll-contain"
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
          className="pointer-events-none absolute left-full ml-1 w-max max-w-44 leading-4.5"
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
  const className = wrap ? undefined : "min-w-0 truncate";
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {text.slice(0, at)}
      <span className="font-semibold">{text.slice(at, at + query.length)}</span>
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
        className="absolute top-[3.5px] left-1.5 z-1 cursor-pointer text-[15px] leading-5.25 text-(--cmp-accent) outline-none"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute -inset-y-0.5 -right-1 -left-0.5 rounded-md transition-colors duration-100",
            selected && "bg-(--cmp-accent)/12",
          )}
        />
        <span className="relative">
          <span aria-hidden="true">/</span>
          {command.id}
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          side="top"
          align="start"
          sideOffset={8}
          style={ROOT_VARS}
          className="z-(--z-popover)"
        >
          <Popover.Popup
            render={<PopupSurface className="w-44.5 rounded-xl p-2 text-xs" />}
          >
            <p className="line-clamp-5 rounded-lg bg-surface-soft px-2 py-1.5 leading-4.5 text-text/60">
              {command.note ?? command.label}
            </p>
            <p className="px-0.5 pt-2 text-text/60">
              {command.kind === "skill" ? "Skill" : "Command"}
            </p>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
