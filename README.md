# 🛡️ SOC Home Lab — Security Monitoring & Detection

A self-built Security Operations Center (SOC) lab designed to develop practical skills in security monitoring, threat detection, alert triage, log analysis, network security, incident investigation, and security documentation.

The lab simulates a small enterprise environment using **Wazuh, Suricata, Sysmon, Windows Server 2022, Active Directory, Kali Linux, Nmap, Nikto, PowerShell, and Tailscale**.

---

## 📌 Project Overview

The purpose of this project is to simulate activities performed by a SOC Analyst in a controlled lab environment.

The lab generates controlled security activity, collects telemetry from monitored systems, detects suspicious behavior, investigates alerts, correlates events, and documents findings.

### SOC Workflow

```text
Generate Activity
       ↓
Collect Logs & Telemetry
       ↓
Detect Alert
       ↓
Triage
       ↓
Investigate
       ↓
Correlate Events
       ↓
Map to MITRE ATT&CK
       ↓
Document Findings
```

---

## 🎯 Project Objectives

- Build a functional SOC monitoring environment.
- Collect and analyze Windows security logs.
- Collect Sysmon endpoint telemetry.
- Monitor network activity using Suricata.
- Detect network reconnaissance.
- Detect authentication anomalies.
- Investigate failed and successful logons.
- Analyze security alerts in Wazuh.
- Correlate events into investigation timelines.
- Identify indicators of compromise (IOCs).
- Map security events to MITRE ATT&CK.
- Apply the NIST Cybersecurity Framework.
- Practice SOC alert triage and investigation.
- Document security findings.

---

# 🏗️ Lab Architecture

The environment consists of three primary systems connected through a Tailscale secure mesh network.

```text
                    TAILSCALE SECURE MESH
              ─────────────────────────────

       ┌─────────────────┐
       │   Kali Linux    │
       │                 │
       │  Nmap           │
       │  Nikto          │
       │                 │
       │ Attack Testing  │
       └────────┬────────┘
                │
                │ Network Activity
                ▼
       ┌──────────────────────────┐
       │      Ubuntu Server       │
       │                          │
       │      Wazuh Manager       │
       │      Suricata IDS        │
       │                          │
       │    SOC Monitoring Core   │
       └────────────┬─────────────┘
                    │
                    │ Security Events
                    ▼
       ┌──────────────────────────┐
       │    Windows Server 2022   │
       │                          │
       │    Active Directory      │
       │    Domain Controller     │
       │    Sysmon                │
       │                          │
       │    Monitored Endpoint    │
       └──────────────────────────┘
```

### Data Flow

```text
Kali Linux
    │
    │ Nmap / Nikto
    ▼
Network Activity
    │
    ▼
Suricata
    │
    │ Network Alerts
    ▼
Wazuh
    ▲
    │
    │ Windows Events / Sysmon
    │
Windows Server 2022
```

---

# 🧰 Technologies & Tools

| Technology | Role |
|---|---|
| **Wazuh** | SIEM/XDR, log collection, alerting and investigation |
| **Suricata** | Network IDS and threat detection |
| **Sysmon** | Windows endpoint telemetry |
| **Windows Server 2022** | Monitored infrastructure |
| **Active Directory** | Identity and authentication |
| **Kali Linux** | Security testing |
| **Nmap** | Network reconnaissance |
| **Nikto** | Web security testing |
| **PowerShell** | Windows administration and investigation |
| **Tailscale** | Secure connectivity between lab systems |
| **MITRE ATT&CK** | Adversary technique mapping |
| **NIST CSF** | Security process framework |

---

# 🔍 Security Monitoring

## Windows & Active Directory

Windows Server 2022 acts as the monitored infrastructure and Active Directory domain controller.

Monitoring includes:

- Successful logons
- Failed logons
- Authentication activity
- Active Directory events
- Process activity
- PowerShell activity
- Sysmon events

Sysmon provides additional endpoint telemetry for investigating process and system activity.

### 📸 Screenshot — Windows/Sysmon Monitoring

<!-- Insert screenshot here -->

---

## 🌐 Network Monitoring

Suricata is used as the network intrusion detection system.

It monitors network traffic for suspicious patterns and signature matches.

Monitoring includes:

- Network reconnaissance
- Port scanning
- Suspicious traffic
- IDS signatures
- Network connections

### 📸 Screenshot — Suricata Alert

<!-- Insert screenshot here -->

---

# 🚨 Detection Cases

## CASE-001 — SSH Brute-Force Detection

### Objective

Detect repeated failed SSH authentication attempts.

### Tools

- Wazuh
- SSH
- MITRE ATT&CK

### Investigation

The investigation focuses on:

```text
Source IP
   ↓
Target Host
   ↓
Username
   ↓
Failed Attempts
   ↓
Authentication Timeline
   ↓
Successful Login?
   ↓
Conclusion
```

### MITRE ATT&CK

**T1110 — Brute Force**

### 📸 Evidence

<!-- Insert Wazuh SSH brute-force alert screenshot here -->

---

# CASE-002 — Nmap Reconnaissance Detection

### Objective

Detect network reconnaissance activity generated by Nmap.

### Tools

- Kali Linux
- Nmap
- Suricata

### Detection Process

```text
Kali Linux
     │
     │ Nmap Scan
     ▼
Network Traffic
     │
     ▼
Suricata
     │
     │ Detection
     ▼
Wazuh Alert
     │
     ▼
SOC Investigation
```

### Investigation

The analyst reviews:

- Source IP
- Destination IP
- Destination ports
- Connection attempts
- Scan pattern
- Timestamp
- Related network events

### MITRE ATT&CK

**T1046 — Network Service Scanning**

### 📸 Evidence

<!-- Insert Nmap scan screenshot here -->

<!-- Insert Suricata/Wazuh detection screenshot here -->

---

# CASE-003 — Active Directory Logon Anomaly Review

### Objective

Investigate unusual authentication activity within the Active Directory environment.

### Tools

- Windows Server 2022
- Active Directory
- Sysmon
- Wazuh

### Investigation

The analyst examines Windows Event Logs and Sysmon telemetry to determine:

- Which account was involved
- Authentication result
- Source system
- Timestamp
- Related events
- Activity before and after the event

A timeline is created to understand the sequence of events.

### Framework

**NIST CSF — Detect**

### 📸 Evidence

<!-- Insert Windows Event Viewer screenshot here -->

<!-- Insert Wazuh investigation screenshot here -->

---

# 🧠 SOC Alert Triage Process

When an alert appears in Wazuh, the following process is used:

### 1. Review

Read the alert and understand why it triggered.

### 2. Validate

Determine whether the activity is:

- Normal
- Suspicious
- False positive
- Potential security incident

### 3. Identify

Determine:

```text
WHO?
WHAT?
WHEN?
WHERE?
HOW?
```

### 4. Investigate

Review related logs from:

- Wazuh
- Windows Event Logs
- Sysmon
- Suricata

### 5. Correlate

Compare timestamps and related events to build a timeline.

### 6. Assess

Determine the severity and potential impact.

### 7. Map

Map the activity to MITRE ATT&CK where appropriate.

### 8. Document

Record:

- Alert
- Evidence
- Investigation
- Findings
- Conclusion
- Recommended action

---

# 🗺️ MITRE ATT&CK Mapping

The lab uses MITRE ATT&CK to classify observed adversary behavior.

| Technique | Name | Example |
|---|---|---|
| **T1046** | Network Service Scanning | Nmap reconnaissance |
| **T1110** | Brute Force | Repeated authentication attempts |
| **T1059** | Command and Scripting Interpreter | Command/PowerShell activity |
| **T1078** | Valid Accounts | Authentication using legitimate accounts |

---

# 🏛️ NIST Cybersecurity Framework

The project uses the NIST Cybersecurity Framework to organize security activities.

```text
IDENTIFY
   ↓
PROTECT
   ↓
DETECT
   ↓
RESPOND
   ↓
RECOVER
```

### Identify

Identify systems, assets, users, and potential risks.

### Protect

Apply appropriate security controls and configurations.

### Detect

Use Wazuh, Suricata, Sysmon, and security logs to identify suspicious activity.

### Respond

Investigate detected security events and determine appropriate actions.

### Recover

Document lessons learned and improve the security environment.

---

# 📊 Example Investigation

### Alert

```text
Multiple failed authentication attempts detected.
```

### Initial Questions

```text
Who is being targeted?
Where are the attempts coming from?
When did the activity start?
How many attempts occurred?
Was authentication eventually successful?
Are there other related events?
```

### Investigation

```text
Wazuh Alert
     ↓
Identify Source IP
     ↓
Identify Target Account
     ↓
Review Authentication Logs
     ↓
Review Sysmon Events
     ↓
Check Related Network Events
     ↓
Build Timeline
     ↓
Determine Cause
     ↓
Document Findings
```

### Possible Conclusion

The analyst determines whether the activity represents:

- Normal user behavior
- Misconfiguration
- Password-related issue
- Automated activity
- Suspicious authentication
- Potential brute-force activity

---

# 📈 Skills Demonstrated

## Security Operations

- Security monitoring
- Alert analysis
- Alert triage
- Log analysis
- SIEM administration
- Event correlation
- Timeline analysis
- IOC identification

## Network Security

- Network traffic monitoring
- Network reconnaissance detection
- Vulnerability scanning
- Web security testing

## Windows Security

- Windows Event Log analysis
- Sysmon analysis
- Windows Server monitoring
- Active Directory security monitoring
- Authentication investigation

## Incident Response

- Incident detection
- Basic incident investigation
- Authentication investigation
- SSH monitoring
- Security documentation

## Security Frameworks

- MITRE ATT&CK
- NIST Cybersecurity Framework

---

# 📁 Recommended Repository Structure

```text
soc-home-lab/
│
├── README.md
│
├── architecture/
│   └── soc-lab-architecture.png
│
├── detections/
│   ├── CASE-001-ssh-bruteforce.md
│   ├── CASE-002-nmap-recon.md
│   └── CASE-003-ad-logon-anomaly.md
│
├── wazuh/
│   ├── rules/
│   └── queries/
│
├── suricata/
│   ├── rules/
│   └── alerts/
│
├── sysmon/
│   └── configuration/
│
├── screenshots/
│   ├── wazuh-dashboard.png
│   ├── wazuh-alert.png
│   ├── suricata-alert.png
│   ├── sysmon-events.png
│   └── nmap-scan.png
│
└── documentation/
    ├── investigation-process.md
    ├── mitre-mapping.md
    └── incident-response.md
```

---

# 📸 Screenshots & Evidence

Screenshots will be added to demonstrate the actual implementation and investigation process.

Recommended evidence:

- Wazuh dashboard
- Wazuh alerts
- Wazuh queries
- Windows Event Viewer
- Sysmon events
- Suricata alerts
- Nmap results
- Nikto results
- Active Directory events

> **Security note:** Remove or hide real usernames, passwords, public IP addresses, domain information, API keys, tokens, and other sensitive information before publishing screenshots.

---

# 🚀 Future Improvements

- Add TheHive for incident/case management.
- Add additional Windows endpoints.
- Add a Linux endpoint.
- Create additional Wazuh detection rules.
- Improve Suricata detection coverage.
- Add automated response actions.
- Integrate threat intelligence.
- Create SOC investigation playbooks.
- Expand MITRE ATT&CK coverage.
- Add additional controlled attack simulations.
- Build additional dashboards and detection reports.

---

# 📚 What This Project Demonstrates

This project demonstrates a practical SOC workflow:

```text
                ┌───────────────┐
                │ Generate      │
                │ Activity      │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Collect Logs  │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Detect        │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Triage        │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Investigate   │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Correlate     │
                └───────┬───────┘
                        ↓
                ┌───────────────┐
                │ Map & Report  │
                └───────────────┘
```

The objective is not simply to deploy security tools, but to demonstrate how those tools work together to **detect, investigate, understand, and document security events**.

---

# 👨‍💻 Project Status

**Status:** Active / Continuously Improving

**Focus:** SOC Analyst / Security Monitoring / Incident Response

**Environment:** Self-built Security Operations Center Home Lab

**Primary Platforms:** Wazuh + Suricata + Sysmon

---

## ⭐ Key Takeaway

> This project represents hands-on SOC experience developed through building, monitoring, generating controlled security activity, investigating alerts, and documenting security findings in a controlled lab environment.
