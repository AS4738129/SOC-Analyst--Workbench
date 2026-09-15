import React, { useState, useEffect, useRef } from "react";
import {
  Shield, Activity, Server, Network, Terminal, Ticket, Search,
  AlertTriangle, CheckCircle2, GitBranch, Eye, FileText, Lock,
  Radar, Cpu, Menu, X, ExternalLink, ChevronRight, ChevronDown,
  Clock, Users, Target, Database, Wifi, Key, FileSearch,
  ClipboardList, Layers, ArrowRight, ArrowDown, Github, Linkedin,
  ZoomIn, Info, ShieldAlert, ScanLine, Router, HardDrive,
  ListChecks, BookOpen, Workflow as WorkflowIcon, Fingerprint,
  MonitorCheck, FolderSearch, MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */
const C = {
  bg: "#0A1120",
  bgAlt: "#0D1526",
  surface: "#111B2E",
  surfaceAlt: "#14213A",
  border: "#22304A",
  borderSoft: "#1A2740",
  text: "#E7ECF6",
  textDim: "#9AA7C2",
  textFaint: "#6B7994",
  blue: "#4C8FE8",
  blueSoft: "#2B4A7A",
  teal: "#2FD1B8",
  tealSoft: "#154A44",
  amber: "#E3A44E",
  red: "#E2685F",
  green: "#3FC98A",
};

const sev = {
  info: { label: "Informational", color: C.blue, bg: "rgba(76,143,232,0.12)" },
  low: { label: "Low", color: C.green, bg: "rgba(63,201,138,0.12)" },
  medium: { label: "Medium", color: C.amber, bg: "rgba(227,164,78,0.12)" },
  high: { label: "High", color: C.red, bg: "rgba(226,104,95,0.12)" },
};

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */
function Reveal({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      className="flex items-center gap-2 mb-3"
      style={{ color: C.teal, fontSize: "0.8rem", fontWeight: 600 }}
    >
      <span style={{ width: 18, height: 1, background: C.teal, display: "inline-block" }} />
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
        style={{ color: C.text, letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ color: C.textDim, fontSize: "1.05rem", lineHeight: 1.7 }}>{description}</p>
      )}
    </div>
  );
}

function Badge({ children, color = C.teal, bg }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
      style={{ color, background: bg || "rgba(47,209,184,0.1)", border: `1px solid ${color}33` }}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "", hover = true, style = {} }) {
  return (
    <div
      className={`rounded-xl p-6 ${className}`}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        transition: "transform 0.25s ease, border-color 0.25s ease, background 0.25s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        e.currentTarget.style.borderColor = `${C.blue}66`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        if (!hover) return;
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", icon: Icon, href = "#", onClick }) {
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium"
      style={{
        background: isPrimary ? C.blue : "transparent",
        color: isPrimary ? "#0A1120" : C.text,
        border: isPrimary ? `1px solid ${C.blue}` : `1px solid ${C.border}`,
        transition: "background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.88";
        if (!isPrimary) e.currentTarget.style.borderColor = C.blue;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        if (!isPrimary) e.currentTarget.style.borderColor = C.border;
      }}
    >
      {Icon && <Icon size={16} />}
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Architecture", href: "#architecture" },
  { label: "Technologies", href: "#technologies" },
  { label: "Cases", href: "#cases" },
  { label: "Investigation", href: "#investigation" },
  { label: "Evidence", href: "#evidence" },
  { label: "Skills", href: "#skills" },
  { label: "Roadmap", href: "#roadmap" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: scrolled ? "rgba(10,17,32,0.9)" : "rgba(10,17,32,0.55)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <span
            className="flex items-center justify-center rounded-md"
            style={{ width: 32, height: 32, background: C.surfaceAlt, border: `1px solid ${C.border}` }}
          >
            <Shield size={16} style={{ color: C.teal }} />
          </span>
          <span className="font-semibold tracking-tight" style={{ color: C.text }}>
            SOC Home Lab
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm"
              style={{ color: C.textDim, transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textDim)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button variant="secondary" icon={Github} href="https://github.com/AS4738129/SOC-Analyst--Workbench">
            GitHub
          </Button>
        </div>

        <button
          className="lg:hidden flex items-center justify-center rounded-md"
          style={{ width: 38, height: 38, border: `1px solid ${C.border}`, color: C.text }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div
          className="lg:hidden px-5 pb-5 flex flex-col gap-1"
          style={{ borderTop: `1px solid ${C.border}`, background: C.bg }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm border-b"
              style={{ color: C.textDim, borderColor: C.borderSoft }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/AS4738129/SOC-Analyst--Workbench"
            className="mt-4 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium"
            style={{ background: C.blue, color: "#0A1120" }}
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
function Hero() {
  const stats = [
    { label: "Detection cases", value: "05" },
    { label: "Telemetry sources", value: "03" },
    { label: "ATT&CK techniques mapped", value: "04" },
  ];
  return (
    <section id="home" className="relative overflow-hidden" style={{ background: C.bg }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 15% -10%, rgba(76,143,232,0.15), transparent 60%), radial-gradient(ellipse 700px 400px at 100% 10%, rgba(47,209,184,0.10), transparent 60%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 relative grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ border: `1px solid ${C.border}`, color: C.textDim, background: C.surface }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: C.green, animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: C.green }} />
            </span>
            Hands-On SOC Environment
          </div>

          <h1
            className="text-4xl sm:text-6xl font-semibold tracking-tight mb-5"
            style={{ color: C.text, letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            SOC Home Lab
          </h1>
          <p className="text-lg sm:text-xl mb-6" style={{ color: C.textDim }}>
            Security Monitoring, Detection &amp; Incident Investigation
          </p>
          <p className="max-w-xl mb-9" style={{ color: C.textFaint, fontSize: "1rem", lineHeight: 1.75 }}>
            A hands-on SOC environment built to demonstrate practical security operations, including alert monitoring,
            detection engineering, incident triage, log analysis, event correlation,
            ticket management, investigation, and security reporting.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button variant="primary" icon={Radar} href="#architecture">
              Explore the Lab
            </Button>
            <Button variant="secondary" icon={Github} href="https://github.com/AS4738129/SOC-Analyst--Workbench">
              View GitHub
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm" style={{ color: C.textFaint }}>
            {["Wazuh", "Suricata", "Sysmon", "Windows Server", "osTicket"].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-2">
                <span style={{ color: C.textDim }}>{t}</span>
                {i < arr.length - 1 && <span style={{ color: C.borderSoft }}>•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Mini status panel — grounds the hero in the SOC dashboard subject matter */}
        <Reveal>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}
          >
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: `1px solid ${C.borderSoft}` }}
            >
              <span className="flex items-center gap-2 text-sm font-medium" style={{ color: C.text }}>
                <Activity size={15} style={{ color: C.teal }} />
                Lab Status
              </span>
              <span className="text-xs" style={{ color: C.textFaint }}>
                Live overview
              </span>
            </div>
            <div className="p-5 space-y-4">
              {[
                { icon: Server, label: "Wazuh Manager", status: "Online", color: C.green },
                { icon: Router, label: "Suricata IDS", status: "Monitoring", color: C.green },
                { icon: HardDrive, label: "Windows Server 2022", status: "Sending logs", color: C.green },
                { icon: Ticket, label: "osTicket Queue", status: "2 open cases", color: C.amber },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-sm" style={{ color: C.textDim }}>
                    <row.icon size={15} style={{ color: C.textFaint }} />
                    {row.label}
                  </span>
                  <span className="text-xs font-medium" style={{ color: row.color }}>
                    {row.status}
                  </span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3 pt-3" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-semibold" style={{ color: C.text }}>
                      {s.value}
                    </div>
                    <div className="text-[11px] leading-snug mt-0.5" style={{ color: C.textFaint }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */
function About() {
  const items = [
    { icon: Database, label: "SIEM", value: "Wazuh" },
    { icon: Radar, label: "Network IDS", value: "Suricata" },
    { icon: Fingerprint, label: "Endpoint Telemetry", value: "Sysmon" },
    { icon: Ticket, label: "Case Management", value: "osTicket" },
  ];
  return (
    <section id="about" className="py-20 sm:py-28" style={{ background: C.bgAlt }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="About the project"
          title="A hands-on SOC environment built around real analyst workflows"
          description="This project demonstrates a practical Security Operations Center workflow in a controlled laboratory environment. It combines endpoint, network, and Windows security telemetry to detect suspicious activity, investigate alerts, correlate events, document findings, and manage cases through an end-to-end SOC process."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <Reveal key={it.label}>
              <Card>
                <it.icon size={20} style={{ color: C.teal }} className="mb-4" />
                <div className="text-sm mb-1" style={{ color: C.textFaint }}>
                  {it.label}
                </div>
                <div className="text-lg font-semibold" style={{ color: C.text }}>
                  {it.value}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture                                                        */
/* ------------------------------------------------------------------ */
const ARCH_NODES = [
  { icon: Terminal, title: "Kali Linux", items: ["Nmap", "Nikto", "PowerShell", "Security Testing"] },
  { icon: Radar, title: "Suricata", items: ["Network IDS", "Network Alerts"] },
  { icon: Database, title: "Wazuh", items: ["SIEM", "Log Collection", "Detection", "Alerting"] },
  { icon: Server, title: "Windows Server", items: ["Active Directory", "Windows Security Logs", "Sysmon"] },
  { icon: Ticket, title: "osTicket", items: ["SOC Tickets", "Investigation Notes", "Resolution"] },
];

function Architecture() {
  return (
    <section id="architecture" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="SOC architecture"
          title="How activity flows from the attacker box to a resolved ticket"
          description="Controlled security activity generated on Kali Linux is observed by network and endpoint telemetry, correlated in Wazuh, and worked through investigation and resolution in osTicket."
        />

        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">
          <div className="relative">
            {ARCH_NODES.map((node, i) => (
              <Reveal key={node.title}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex items-center justify-center rounded-xl shrink-0"
                      style={{ width: 44, height: 44, background: C.surfaceAlt, border: `1px solid ${C.border}` }}
                    >
                      <node.icon size={19} style={{ color: C.teal }} />
                    </div>
                    {i < ARCH_NODES.length - 1 && (
                      <span style={{ width: 1, flex: 1, minHeight: 40, background: C.border }} />
                    )}
                  </div>
                  <div className="pb-10">
                    <div className="font-semibold mb-2" style={{ color: C.text }}>
                      {node.title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {node.items.map((it) => (
                        <Badge key={it} color={C.textDim} bg={C.surfaceAlt}>
                          {it}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Card hover={false} className="lg:sticky lg:top-24">
              <div className="text-sm font-medium mb-4" style={{ color: C.text }}>
                End-to-end flow
              </div>
              <ol className="space-y-3">
                {[
                  "Controlled activity on Kali Linux",
                  "Network monitoring via Suricata",
                  "Log correlation in Wazuh",
                  "Windows Server 2022 + Sysmon telemetry",
                  "Alert detection",
                  "Ticket opened in osTicket",
                  "Investigation",
                  "Verdict & resolution",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm" style={{ color: C.textDim }}>
                    <span
                      className="flex items-center justify-center rounded-full shrink-0 text-[11px] font-medium"
                      style={{ width: 20, height: 20, background: C.surfaceAlt, color: C.textFaint, marginTop: 1 }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
                <Button variant="secondary" icon={GitBranch} href="https://github.com/AS4738129/SOC-Analyst--Workbench">
                  View Architecture
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Technologies                                                        */
/* ------------------------------------------------------------------ */
const TECHNOLOGIES = [
  { icon: Database, name: "Wazuh", role: "SIEM / XDR", desc: "SIEM/XDR platform used for centralized monitoring, log collection, detection and alerting." },
  { icon: Radar, name: "Suricata", role: "Network IDS", desc: "Network IDS used to identify suspicious network activity and reconnaissance." },
  { icon: Fingerprint, name: "Sysmon", role: "Endpoint Telemetry", desc: "Windows endpoint telemetry for process, file and system activity." },
  { icon: Server, name: "Windows Server 2022", role: "Infrastructure", desc: "Monitored Windows infrastructure and Active Directory environment." },
  { icon: Key, name: "Active Directory", role: "Identity", desc: "Identity and authentication monitoring." },
  { icon: Terminal, name: "Kali Linux", role: "Analyst Workstation", desc: "Security testing and analyst workstation." },
  { icon: ScanLine, name: "Nmap", role: "Reconnaissance", desc: "Network reconnaissance and service discovery." },
  { icon: Search, name: "Nikto", role: "Web Security", desc: "Web security testing." },
  { icon: Terminal, name: "PowerShell", role: "Administration", desc: "Windows administration and investigation." },
  { icon: Wifi, name: "Tailscale", role: "Connectivity", desc: "Secure connectivity between lab systems." },
  { icon: Ticket, name: "osTicket", role: "Case Management", desc: "SOC ticket management and investigation tracking." },
  { icon: Target, name: "MITRE ATT&CK", role: "Framework", desc: "Adversary behavior and technique mapping." },
];

function Technologies() {
  return (
    <section id="technologies" className="py-20 sm:py-28" style={{ background: C.bgAlt }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Technologies"
          title="The tools behind the lab"
          description="Every technology below plays a specific role in generating, observing, or investigating security activity."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECHNOLOGIES.map((t) => (
            <Reveal key={t.name}>
              <Card className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <t.icon size={20} style={{ color: C.teal }} />
                  <Badge>{t.role}</Badge>
                </div>
                <div className="font-semibold mb-1.5" style={{ color: C.text }}>
                  {t.name}
                </div>
                <p className="text-sm" style={{ color: C.textFaint, lineHeight: 1.65 }}>
                  {t.desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Workflow                                                             */
/* ------------------------------------------------------------------ */
const WORKFLOW_STEPS = [
  { icon: Activity, title: "Generate / Observe Activity" },
  { icon: Database, title: "Collect Logs & Telemetry" },
  { icon: AlertTriangle, title: "Detect Alert" },
  { icon: Eye, title: "Triage" },
  { icon: Ticket, title: "Create Ticket" },
  { icon: Search, title: "Investigate" },
  { icon: GitBranch, title: "Correlate Events" },
  { icon: Target, title: "Map to MITRE ATT&CK" },
  { icon: ListChecks, title: "Determine Verdict" },
  { icon: FileText, title: "Document Findings" },
  { icon: CheckCircle2, title: "Resolve or Escalate" },
];

function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="SOC workflow"
          title="From first signal to a documented verdict"
          description="Detection is only the beginning. The objective is to investigate and understand the event."
        />
        <div className="lg:hidden space-y-0">
          {WORKFLOW_STEPS.map((s, i) => (
            <div key={s.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{ width: 38, height: 38, background: C.surfaceAlt, border: `1px solid ${C.border}` }}
                >
                  <s.icon size={16} style={{ color: C.teal }} />
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span style={{ width: 1, flex: 1, minHeight: 24, background: C.border }} />
                )}
              </div>
              <div className="pb-6 pt-2 text-sm font-medium" style={{ color: C.text }}>
                {s.title}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block overflow-x-auto pb-4">
          <div className="flex items-start" style={{ minWidth: 1100 }}>
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={s.title} className="flex items-start" style={{ width: 100 / WORKFLOW_STEPS.length + "%" }}>
                <div className="flex flex-col items-center text-center px-1.5" style={{ flex: 1 }}>
                  <div
                    className="flex items-center justify-center rounded-lg mb-3"
                    style={{ width: 40, height: 40, background: C.surfaceAlt, border: `1px solid ${C.border}` }}
                  >
                    <s.icon size={16} style={{ color: C.teal }} />
                  </div>
                  <div className="text-xs font-medium leading-snug" style={{ color: C.textDim }}>
                    {s.title}
                  </div>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <ArrowRight size={14} style={{ color: C.borderSoft, marginTop: 12, flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cases                                                                */
/* ------------------------------------------------------------------ */
const CASES = [
  {
    id: "CASE-001",
    title: "SSH Brute-Force Detection",
    severity: "high",
    desc: "Detection and investigation of repeated failed SSH authentication attempts.",
    tools: ["Wazuh", "OpenSSH"],
    mitre: "T1110 — Brute Force",
  },
  {
    id: "CASE-002",
    title: "Nmap Network Reconnaissance",
    severity: "medium",
    desc: "Detection of controlled network reconnaissance generated using Nmap.",
    tools: ["Kali Linux", "Nmap", "Suricata", "Wazuh"],
    mitre: "T1046 — Network Service Scanning",
  },
  {
    id: "CASE-003",
    title: "Active Directory Logon Anomaly",
    severity: "medium",
    desc: "Investigation of unusual authentication activity within the Windows / Active Directory environment.",
    tools: ["Windows Server", "Active Directory", "Sysmon", "Wazuh"],
    mitre: null,
  },
  {
    id: "CASE-004",
    title: "Multiple Windows Failed Logons",
    severity: "high",
    desc: "Investigation of repeated Windows authentication failures followed by successful authentication.",
    tools: ["Windows Event Logs", "Wazuh", "Sysmon", "osTicket"],
    mitre: "T1110 — Brute Force",
    verdict: "Benign Activity — Authorized Security Testing",
  },
  {
    id: "CASE-005",
    title: "Printer Driver / DLL Security Alert",
    severity: "high",
    desc: "Investigation of a high-severity endpoint alert involving a DLL created by the Windows Print Spooler service.",
    tools: ["Wazuh", "Sysmon", "Windows Event Logs"],
    mitre: null,
    verdict: "Benign Activity — Printer Driver Activity",
  },
];

function CaseCard({ c }) {
  const s = sev[c.severity];
  return (
    <Reveal>
      <Card className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium tracking-wide" style={{ color: C.textFaint }}>
            {c.id}
          </span>
          <Badge color={s.color} bg={s.bg}>
            {s.label}
          </Badge>
        </div>
        <div className="font-semibold mb-2" style={{ color: C.text }}>
          {c.title}
        </div>
        <p className="text-sm mb-5" style={{ color: C.textFaint, lineHeight: 1.65 }}>
          {c.desc}
        </p>

        <div className="mt-auto space-y-3">
          <div>
            <div className="text-[11px] mb-1.5" style={{ color: C.textFaint }}>
              Tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {c.tools.map((t) => (
                <Badge key={t} color={C.textDim} bg={C.surfaceAlt}>
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          {c.mitre && (
            <div className="flex items-center gap-2 text-xs" style={{ color: C.textDim }}>
              <Target size={13} style={{ color: C.teal }} />
              {c.mitre}
            </div>
          )}
          {c.verdict && (
            <div className="flex items-start gap-2 text-xs" style={{ color: C.green }}>
              <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
              {c.verdict}
            </div>
          )}
        </div>

        <a
          href="https://github.com/AS4738129/SOC-Analyst--Workbench"
          className="flex items-center gap-1.5 text-sm font-medium mt-5 pt-5"
          style={{ color: C.blue, borderTop: `1px solid ${C.borderSoft}` }}
        >
          View Investigation <ChevronRight size={15} />
        </a>
      </Card>
    </Reveal>
  );
}

function Cases() {
  return (
    <section id="cases" className="py-20 sm:py-28" style={{ background: C.bgAlt }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Detection cases"
          title="Alerts triaged and investigated end to end"
          description="Each case documents the detection, the tools involved, and — where applicable — the mapped ATT&CK technique and final verdict."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASES.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Investigation process                                               */
/* ------------------------------------------------------------------ */
const INVESTIGATION_STEPS = [
  "Alert",
  "Initial Triage",
  "Identify Entities",
  "Collect Evidence",
  "Correlate Events",
  "Build Timeline",
  "Assess Impact",
  "MITRE Mapping",
  "Determine Verdict",
  "Document",
  "Close / Escalate",
];

function Investigation() {
  const questions = [
    { q: "WHO?", icon: Users },
    { q: "WHAT?", icon: Info },
    { q: "WHEN?", icon: Clock },
    { q: "WHERE?", icon: MapPin },
    { q: "HOW?", icon: WorkflowIcon },
  ];
  return (
    <section id="investigation" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Investigation process"
          title="A repeatable lifecycle for every alert"
          description="Each investigation follows a repeatable analyst workflow designed to reduce assumptions and ensure conclusions are supported by evidence."
        />

        <div className="grid md:grid-cols-2 gap-3 mb-12">
          {INVESTIGATION_STEPS.map((step, i) => (
            <Reveal key={step}>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}
              >
                <span
                  className="flex items-center justify-center rounded-full shrink-0 text-[11px] font-medium"
                  style={{ width: 22, height: 22, background: C.surfaceAlt, color: C.teal }}
                >
                  {i + 1}
                </span>
                <span className="text-sm" style={{ color: C.text }}>
                  {step}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: C.surfaceAlt, border: `1px solid ${C.border}` }}
          >
            <div className="text-sm font-medium mb-5" style={{ color: C.text }}>
              The questions every investigation answers
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {questions.map((item) => (
                <div key={item.q} className="text-center">
                  <div
                    className="flex items-center justify-center rounded-lg mx-auto mb-2.5"
                    style={{ width: 42, height: 42, background: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <item.icon size={17} style={{ color: C.teal }} />
                  </div>
                  <div className="text-xs font-medium" style={{ color: C.textDim }}>
                    {item.q}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ticketing                                                            */
/* ------------------------------------------------------------------ */
function Ticketing() {
  const flow = ["Wazuh Alert", "Ticket Created", "Analyst Triage", "Investigation", "Evidence", "Analyst Notes", "Verdict", "Resolution"];
  const cards = [
    { icon: ClipboardList, title: "Ticket Creation", desc: "Every qualifying alert is logged as a ticket with source, severity, and initial context." },
    { icon: FolderSearch, title: "Investigation Notes", desc: "Analyst findings, evidence, and reasoning are recorded as the investigation progresses." },
    { icon: CheckCircle2, title: "Resolution & Closure", desc: "Tickets are closed with a documented verdict, recommendations, and disposition." },
  ];
  return (
    <section id="ticketing" className="py-20 sm:py-28" style={{ background: C.bgAlt }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Ticketing & incident management"
          title="osTicket as the SOC case management system"
          description="osTicket is used to simulate SOC case management by tracking alerts, investigation notes, evidence, findings, recommendations and final disposition."
        />

        <div className="flex flex-wrap items-center gap-2 mb-12">
          {flow.map((step, i) => (
            <React.Fragment key={step}>
              <span
                className="px-3.5 py-2 rounded-lg text-sm"
                style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textDim }}
              >
                {step}
              </span>
              {i < flow.length - 1 && <ArrowRight size={14} style={{ color: C.borderSoft }} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Reveal key={c.title}>
              <Card className="h-full">
                <c.icon size={20} style={{ color: C.teal }} className="mb-4" />
                <div className="font-semibold mb-2" style={{ color: C.text }}>
                  {c.title}
                </div>
                <p className="text-sm mb-5" style={{ color: C.textFaint, lineHeight: 1.65 }}>
                  {c.desc}
                </p>
                <div
                  className="rounded-lg flex items-center justify-center text-xs"
                  style={{ height: 110, background: C.surfaceAlt, border: `1px dashed ${C.border}`, color: C.textFaint }}
                >
                  Screenshot placeholder
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MITRE ATT&CK                                                         */
/* ------------------------------------------------------------------ */
const MITRE = [
  { id: "T1046", name: "Network Service Scanning", desc: "Nmap reconnaissance" },
  { id: "T1110", name: "Brute Force", desc: "Repeated authentication attempts" },
  { id: "T1059", name: "Command and Scripting Interpreter", desc: "PowerShell / command activity" },
  { id: "T1078", name: "Valid Accounts", desc: "Authentication using legitimate accounts" },
];

function Mitre() {
  return (
    <section id="mitre" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="MITRE ATT&CK"
          title="Mapping observed activity to adversary techniques"
          description="MITRE ATT&CK mappings are applied only when supported by observed activity."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MITRE.map((m) => (
            <Reveal key={m.id}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-md"
                    style={{ color: C.teal, background: C.tealSoft }}
                  >
                    {m.id}
                  </span>
                  <Target size={16} style={{ color: C.textFaint }} />
                </div>
                <div className="font-semibold mb-1.5 text-sm" style={{ color: C.text }}>
                  {m.name}
                </div>
                <p className="text-xs" style={{ color: C.textFaint }}>
                  {m.desc}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                               */
/* ------------------------------------------------------------------ */
const SKILL_GROUPS = [
  {
    title: "Security Operations",
    icon: MonitorCheck,
    skills: ["SIEM Monitoring", "Alert Triage", "Log Analysis", "Event Correlation", "Timeline Analysis", "IOC Identification", "Security Documentation", "Ticket Management"],
  },
  {
    title: "Detection Engineering",
    icon: ShieldAlert,
    skills: ["Wazuh Rules", "Authentication Detection", "Alert Correlation", "Detection Testing", "Detection Validation"],
  },
  {
    title: "Windows Security",
    icon: Server,
    skills: ["Windows Event Logs", "Sysmon", "Active Directory", "Authentication Investigation", "Process Investigation", "File Activity Investigation"],
  },
  {
    title: "Network Security",
    icon: Network,
    skills: ["Network Monitoring", "IDS Analysis", "Network Reconnaissance", "Port Scanning", "Web Security Testing"],
  },
  {
    title: "Incident Response",
    icon: FileSearch,
    skills: ["Alert Investigation", "Evidence Collection", "Incident Classification", "Impact Assessment", "Security Reporting", "Ticket Resolution"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28" style={{ background: C.bgAlt }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Skills demonstrated"
          title="Practical capability across the analyst workflow"
        />
        <div className="grid md:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((g) => (
            <Reveal key={g.title}>
              <Card>
                <div className="flex items-center gap-2.5 mb-4">
                  <g.icon size={18} style={{ color: C.teal }} />
                  <div className="font-semibold text-sm" style={{ color: C.text }}>
                    {g.title}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <Badge key={s} color={C.textDim} bg={C.surfaceAlt}>
                      {s}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Evidence gallery                                                     */
/* ------------------------------------------------------------------ */
const SCREENSHOTS = [
  { title: "Wazuh Dashboard", icon: Database },
  { title: "Wazuh Alert", icon: AlertTriangle },
  { title: "Wazuh Custom Rule", icon: ListChecks },
  { title: "Suricata Alert", icon: Radar },
  { title: "Sysmon Events", icon: Fingerprint },
  { title: "Windows Event Logs", icon: Server },
  { title: "Nmap Scan", icon: ScanLine },
  { title: "osTicket Ticket", icon: Ticket },
  { title: "Investigation Notes", icon: FileText },
  { title: "Resolved Ticket", icon: CheckCircle2 },
];

function Evidence() {
  const [active, setActive] = useState(null);
  return (
    <section id="evidence" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow="Evidence"
          title="Screenshots from the lab"
          description="A visual record of dashboards, alerts, and case documentation produced throughout the project."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {SCREENSHOTS.map((s) => (
            <Reveal key={s.title}>
              <button
                onClick={() => setActive(s)}
                className="w-full text-left rounded-xl overflow-hidden"
                style={{ background: C.surface, border: `1px solid ${C.border}`, cursor: "pointer" }}
              >
                <div
                  className="flex items-center justify-center relative"
                  style={{ height: 150, background: C.surfaceAlt }}
                >
                  <s.icon size={26} style={{ color: C.textFaint }} />
                  <span
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity"
                    style={{ background: "rgba(10,17,32,0.55)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >
                    <ZoomIn size={18} style={{ color: C.text }} />
                  </span>
                </div>
                <div className="px-4 py-3 text-sm font-medium" style={{ color: C.text }}>
                  {s.title}
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <div
          className="flex items-start gap-3 rounded-lg px-4 py-3.5"
          style={{ background: C.surfaceAlt, border: `1px solid ${C.border}` }}
        >
          <Lock size={15} style={{ color: C.amber, marginTop: 2, flexShrink: 0 }} />
          <p className="text-xs sm:text-sm" style={{ color: C.textDim, lineHeight: 1.6 }}>
            Sensitive information has been anonymized before publication. No passwords, API keys,
            tokens, private keys, company credentials, confidential company information, or
            sensitive production IP addresses are exposed.
          </p>
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ background: "rgba(6,10,18,0.85)" }}
          onClick={() => setActive(null)}
        >
          <div
            className="rounded-xl overflow-hidden max-w-lg w-full"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-center"
              style={{ height: 280, background: C.surfaceAlt }}
            >
              <active.icon size={40} style={{ color: C.textFaint }} />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-medium text-sm" style={{ color: C.text }}>
                {active.title}
              </span>
              <button onClick={() => setActive(null)} aria-label="Close" style={{ color: C.textFaint }}>
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Roadmap                                                              */
/* ------------------------------------------------------------------ */
const ROADMAP = [
  "Additional Windows endpoints",
  "Linux endpoint monitoring",
  "More Wazuh detection rules",
  "Improved alert correlation",
  "Threat intelligence enrichment",
  "Automated response",
  "More SOC playbooks",
  "Expanded MITRE ATT&CK coverage",
  "Detection tuning",
  "Alert deduplication",
  "Improved SOC dashboards",
];

function Roadmap() {
  return (
    <section id="roadmap" className="py-20 sm:py-28" style={{ background: C.bgAlt }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <Eyebrow>Future improvements</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{ color: C.text, letterSpacing: "-0.01em" }}>
              What's next for the lab
            </h2>
          </div>
          <Badge color={C.green} bg="rgba(63,201,138,0.12)">
            Active / Continuously Improving
          </Badge>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ROADMAP.map((r) => (
            <Reveal key={r}>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}
              >
                <ArrowRight size={14} style={{ color: C.teal, flexShrink: 0 }} />
                <span className="text-sm" style={{ color: C.textDim }}>
                  {r}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact / Footer                                                     */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Shield size={26} style={{ color: C.teal }} className="mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4" style={{ color: C.text }}>
          Explore the Project
        </h2>
        <p className="mb-9" style={{ color: C.textDim, fontSize: "1.05rem", lineHeight: 1.7 }}>
          Interested in the implementation? Explore the source code, investigation cases and
          documentation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" icon={Github} href="https://github.com/AS4738129/SOC-Analyst--Workbench">
            GitHub Repository
          </Button>
          <Button variant="secondary" icon={Linkedin} href="https://www.linkedin.com/in/simon-adade-44abx2569">
            LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.bg, borderTop: `1px solid ${C.borderSoft}` }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm" style={{ color: C.textFaint }}>
          <Shield size={14} style={{ color: C.textFaint }} />
          SOC Home Lab — Hands-on SOC laboratory, built for practical training.
        </div>
        <p className="text-xs text-center" style={{ color: C.textFaint }}>
          A personal cybersecurity home lab. Not a production or enterprise SOC.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                  */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        a:focus-visible, button:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 2px; }
        ::selection { background: ${C.blueSoft}; color: ${C.text}; }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Architecture />
      <Technologies />
      <WorkflowSection />
      <Cases />
      <Investigation />
      <Ticketing />
      <Mitre />
      <Skills />
      <Evidence />
      <Roadmap />
      <Contact />
      <Footer />
    </div>
  );
}
