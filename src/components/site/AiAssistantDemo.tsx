import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Camera,
  CheckCircle2,
  Home,
  Keyboard,
  MessageSquare,
  Mic,
  Send,
  Sparkles,
  Video,
  Wrench,
} from "lucide-react";
import { CtaButton, CtaLink } from "./Cta";
import { cn } from "@/lib/utils";

type Turn = { role: "ai" | "user"; text: string };

type Scenario = {
  id: string;
  label: string;
  problem: string;
  turns: Turn[];
  service: string;
  summary: string[];
};

export const scenarios: Scenario[] = [
  {
    id: "fridge",
    label: "My refrigerator is not cooling",
    problem: "My refrigerator is not cooling.",
    turns: [
      { role: "user", text: "My refrigerator is not cooling." },
      { role: "ai", text: "I can help with that. When did the problem start?" },
      { role: "user", text: "Two days ago." },
      { role: "ai", text: "Is the refrigerator light working?" },
      { role: "user", text: "Yes." },
      { role: "ai", text: "Do you hear any unusual sound from the back of the unit?" },
      { role: "user", text: "Yes, a low humming that stops and starts." },
    ],
    service: "Appliance Repair Expert",
    summary: [
      "Problem started: 2 days ago",
      "Refrigerator light: Working",
      "Unusual sound: Reported",
      "Likely area: Cooling system or compressor",
    ],
  },
  {
    id: "ac",
    label: "My AC is not cooling",
    problem: "My AC is not cooling.",
    turns: [
      { role: "user", text: "My AC is not cooling." },
      { role: "ai", text: "Got it. Is the AC turning on and blowing air at all?" },
      { role: "user", text: "It blows air, but the air is warm." },
      { role: "ai", text: "When was the last service or filter cleaning?" },
      { role: "user", text: "Around a year ago." },
      { role: "ai", text: "Any water dripping or ice forming on the indoor unit?" },
      { role: "user", text: "There is some ice on the pipe." },
    ],
    service: "AC Service Technician",
    summary: [
      "Airflow: Present, air is warm",
      "Last service: ~12 months ago",
      "Ice on pipe: Reported",
      "Likely area: Refrigerant level or blocked coil",
    ],
  },
  {
    id: "leak",
    label: "There is a water leak in my kitchen",
    problem: "There is a water leak in my kitchen.",
    turns: [
      { role: "user", text: "There is a water leak in my kitchen." },
      { role: "ai", text: "Let's contain it first. Is the water still actively flowing?" },
      { role: "user", text: "It drips constantly under the sink." },
      { role: "ai", text: "Can you see whether it comes from the pipe joint or the tap body?" },
      { role: "user", text: "It looks like the joint under the sink." },
      { role: "ai", text: "Is the cabinet floor already damaged or wet?" },
      { role: "user", text: "It's wet but not damaged." },
    ],
    service: "Verified Plumber",
    summary: [
      "Leak type: Constant drip",
      "Source: Pipe joint under sink",
      "Water damage: Wet, no structural damage",
      "Likely area: Worn joint seal or loose fitting",
    ],
  },
  {
    id: "washing",
    label: "My washing machine is making noise",
    problem: "My washing machine is making noise.",
    turns: [
      { role: "user", text: "My washing machine is making noise." },
      { role: "ai", text: "When does the noise happen — washing, spinning, or both?" },
      { role: "user", text: "Mostly during the spin cycle." },
      { role: "ai", text: "Does the machine move or vibrate more than usual?" },
      { role: "user", text: "Yes, it shakes a lot." },
      { role: "ai", text: "Is the drum loose when you move it by hand?" },
      { role: "user", text: "Slightly loose." },
    ],
    service: "Appliance Repair Technician",
    summary: [
      "Noise phase: Spin cycle",
      "Vibration: Excessive",
      "Drum play: Slight",
      "Likely area: Drum bearing or unbalanced load",
    ],
  },
];

const matches = [
  { name: "Professional A", score: 82 },
  { name: "Professional B", score: 96, best: true },
  { name: "Professional C", score: 74 },
];

export function AiAssistantDemo({ compact = false }: { compact?: boolean }) {
  const [scenario, setScenario] = useState<Scenario>(scenarios[0]);
  const [visible, setVisible] = useState(1);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible >= scenario.turns.length) {
      setTyping(false);
      return;
    }
    const next = scenario.turns[visible];
    setTyping(next.role === "ai");
    const delay = next.role === "ai" ? 1300 : 850;
    const timer = setTimeout(() => {
      setVisible((v) => v + 1);
      setTyping(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, scenario]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible, typing]);

  const start = (next: Scenario) => {
    setScenario(next);
    setVisible(1);
    setInput("");
  };

  const complete = visible >= scenario.turns.length;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-4 shadow-glow sm:p-6">
      <div className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-[var(--gradient-brand)] opacity-25 blur-3xl animate-pulse-glow" />

      <div className="relative flex items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--gradient-brand)]">
            <Bot className="size-5 text-primary-foreground" />
          </span>
          <div>
            <p className="text-sm font-semibold">One Solve AI Assistant</p>
            <p className="flex items-center gap-1.5 text-xs text-success">
              <span className="size-1.5 rounded-full bg-success animate-pulse-glow" /> Online ·
              understanding your problem
            </p>
          </div>
        </div>
        <Sparkles className="size-4 text-primary" />
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "relative mt-4 space-y-3 overflow-y-auto pr-1",
          compact ? "max-h-72" : "max-h-[26rem]",
        )}
      >
        <Bubble role="ai" text="Hi! What can I help you with today?" />
        {scenario.turns.slice(0, visible).map((turn, i) => (
          <Bubble key={`${scenario.id}-${i}`} role={turn.role} text={turn.text} />
        ))}
        {typing ? <TypingBubble /> : null}

        {complete ? (
          <div className="animate-rise space-y-3 rounded-2xl border border-success/40 bg-success/10 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-success">
              <CheckCircle2 className="size-4" /> AI Analysis Complete
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Wrench className="size-4 text-gold" />
              <span className="font-medium">Possible service: {scenario.service}</span>
            </div>
            <ul className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
              {scenario.summary.map((line) => (
                <li key={line} className="flex items-start gap-1.5">
                  <span className="mt-1.5 size-1 rounded-full bg-primary" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="grid gap-2 sm:grid-cols-3">
              <Option icon={<MessageSquare className="size-4" />} title="Chat with an Expert" />
              <Option
                icon={<Video className="size-4" />}
                title="Video Consultation"
                tag="Fastest"
              />
              <Option
                icon={<Home className="size-4" />}
                title="Book a Home Visit"
                tag="Recommended"
              />
            </div>
            {!compact ? (
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Finding the best match...
                </p>
                {matches.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="w-28 text-xs">{m.name}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className={cn(
                          "block h-full rounded-full transition-all duration-1000",
                          m.best ? "bg-success" : "bg-primary/70",
                        )}
                        style={{ width: `${m.score}%` }}
                      />
                    </span>
                    <span
                      className={cn(
                        "w-16 text-right text-xs font-semibold",
                        m.best ? "text-success" : "text-muted-foreground",
                      )}
                    >
                      {m.score}% {m.best ? "✓" : ""}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative mt-4 space-y-3 border-t border-border pt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const text = input.trim().toLowerCase();
            if (!text) return;
            const found =
              scenarios.find((s) =>
                [s.id, ...s.label.toLowerCase().split(" ")].some(
                  (word) => word.length > 3 && text.includes(word),
                ),
              ) ?? scenarios[0];
            start(found);
          }}
          className="flex items-center gap-2 rounded-2xl border border-input bg-background/60 p-2"
        >
          <Keyboard className="ml-2 size-4 shrink-0 text-muted-foreground" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your problem..."
            aria-label="Describe your problem"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <CtaButton type="submit" size="md" className="shrink-0 px-4 py-2">
            <Send className="size-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </CtaButton>
        </form>

        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => start(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-all duration-300",
                s.id === scenario.id
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <InputMode icon={<Mic className="size-4" />} label="Speak" />
          <InputMode icon={<Keyboard className="size-4" />} label="Type" />
          <InputMode icon={<Camera className="size-4" />} label="Upload Photo" />
          <InputMode icon={<Video className="size-4" />} label="Upload Video" />
        </div>

        {compact ? (
          <CtaLink to="/ai-assistant" variant="ghost" className="w-full">
            Open the full AI assistant
          </CtaLink>
        ) : null}
      </div>
    </div>
  );
}

function Bubble({ role, text }: { role: "ai" | "user"; text: string }) {
  const isAi = role === "ai";
  return (
    <div className={cn("flex animate-rise", isAi ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
          isAi
            ? "rounded-tl-sm border border-primary/30 bg-primary/10 text-foreground"
            : "rounded-tr-sm bg-surface text-foreground",
        )}
      >
        {text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-primary/30 bg-primary/10 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-primary animate-pulse-glow"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Option({
  icon,
  title,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  tag?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/50 p-3 transition-colors hover:border-primary/60">
      <div className="flex items-center gap-2 text-primary">{icon}</div>
      <p className="mt-2 text-xs font-semibold">{title}</p>
      {tag ? <p className="text-[11px] text-gold">{tag}</p> : null}
    </div>
  );
}

function InputMode({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2.5 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
    >
      {icon}
      {label}
    </button>
  );
}
