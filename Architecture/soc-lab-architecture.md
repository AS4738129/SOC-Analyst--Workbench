soc-home-lab/
│
├── README.md
│
├── architecture/
│   ├── soc-lab-architecture.png
│   └── architecture.md
│
├── detections/
│   ├── CASE-001-ssh-bruteforce.md
│   ├── CASE-002-nmap-recon.md
│   ├── CASE-003-ad-logon-anomaly.md
│   ├── CASE-004-multiple-windows-failed-logons.md
│   └── CASE-005-printer-driver-alert.md
│
├── wazuh/
│   ├── rules/
│   │   ├── windows-failed-logon.xml
│   │   ├── multiple-failed-logons.xml
│   │   └── ssh-detection.xml
│   │
│   ├── decoders/
│   │
│   ├── queries/
│   │   ├── windows-authentication.md
│   │   ├── process-monitoring.md
│   │   └── sysmon-investigation.md
│   │
│   └── configuration/
│       └── ossec.conf.example
│
├── suricata/
│   ├── rules/
│   ├── alerts/
│   └── configuration/
│
├── sysmon/
│   ├── configuration/
│   │   └── sysmon-config.xml
│   └── events/
│       ├── process-creation.md
│       └── file-creation.md
│
├── osticket/
│   ├── workflow.md
│   ├── ticket-lifecycle.md
│   └── screenshots/
│       ├── ticket-created.png
│       ├── investigation-note.png
│       └── resolved-ticket.png
│
├── investigations/
│   ├── templates/
│   │   └── investigation-report.md
│   │
│   ├── CASE-001-ssh-bruteforce/
│   ├── CASE-002-nmap-recon/
│   ├── CASE-003-ad-logon-anomaly/
│   ├── CASE-004-windows-authentication/
│   └── CASE-005-printer-driver/
│
├── playbooks/
│   ├── failed-logon.md
│   ├── brute-force.md
│   ├── suspicious-process.md
│   ├── malware-alert.md
│   └── network-reconnaissance.md
│
├── screenshots/
│   ├── wazuh-dashboard.png
│   ├── wazuh-alert.png
│   ├── wazuh-rule.png
│   ├── suricata-alert.png
│   ├── sysmon-events.png
│   ├── windows-event-logs.png
│   ├── osticket-ticket.png
│   ├── osticket-investigation.png
│   └── nmap-scan.png
│
├── documentation/
│   ├── investigation-process.md
│   ├── alert-triage.md
│   ├── incident-response.md
│   ├── mitre-mapping.md
│   ├── severity-classification.md
│   └── soc-workflow.md
│
└── reports/
    ├── CASE-001-report.pdf
    ├── CASE-002-report.pdf
    ├── CASE-003-report.pdf
    ├── CASE-004-report.pdf
    └── CASE-005-report.pdf
