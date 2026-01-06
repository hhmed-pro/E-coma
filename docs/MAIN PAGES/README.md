# Main Pages & Navigation Architecture

Welcome to the **Main Pages** documentation. This directory is organized to reflect the application's dual navigation system.

## Navigation Systems

The application uses two complementary navigation mental models. We have organized the documentation to match:

### 1. Top Bar Navigation (`/Top_bar_navigation`)

* **Context**: Functional / Legacy View.
* **What it is**: The 7 core functional modules (Pages) of the application.
* **Documentation**: Detailed feature breakdowns, component references, and functional logic.
* **Use when**: You need to understand *how a specific feature works* (e.g., "How does the profit calculator logic function?").

### 2. Side Bar Navigation (`/Side_bar_navigation`)

* **Context**: Strategic / Zone View.
* **What it is**: The high-level organization of work into 3 Strategic Zones (**Operations**, **Growth**, **Command**).
* **Documentation**: Strategic overviews, page groupings, and zone-specific metrics.
* **Use when**: You need to understand *where a feature fits in the business workflow* (e.g., "Where do I go to manage returns? -> Operations Zone").

## The "Tabs" Logic

Both systems rely on a shared **Tabs** concept to organize depth within a page.

* **In Top Bar**: Tabs are often treated as sub-features of a module.
* **In Side Bar**: Tabs are clearly defined sub-sections of a Zone Page.

Detailed logic for Zone Tabs can be found in [`Side_bar_navigation/Zones_Specific_hub&tabs.md`](Side_bar_navigation/Zones_Specific_hub&tabs.md).

## Directory Structure

```text
docs/MAIN PAGES/
├── README.md                      <-- You are here
├── Top_bar_navigation/            <-- The 7 Functional Modules (Detailed Docs)
│   ├── 01_Centre_de_Confirmation.md
│   ├── 02_Tableau_de_Bord.md
│   └── ...
└── Side_bar_navigation/           <-- The 3 Strategic Zones (Strategic Docs)
    ├── Zones_Specific_hub&tabs.md
    ├── Operations/
    ├── Growth/
    └── Command/
```
