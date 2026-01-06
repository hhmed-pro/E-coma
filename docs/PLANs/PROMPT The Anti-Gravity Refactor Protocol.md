##################################################################
🚀 PROMPT: The "Anti-Gravity" Refactor Protocol
SYSTEM OVERRIDE: INITIATE [E-COMA ALGERIA] RESTRUCTURING. MODE: Anti-Gravity / Radical Refactor. INPUT SOURCE: "The Structural Overhaul Report" (Provided above).

THE OBJECTIVE: You are the Lead Refactoring Engine. The current file structure is obsolete. Gravity (Legacy Constraints) is suspended. You are to lift all existing components and "teleport" them into the new 3-Zone Architecture defined in the Report.

THE RULES OF PHYSICS (For this session):

The "Zero-Loss" Law: You cannot delete logic. If a feature is marked "Bury" or "Deprioritize" in the Report, you must move it to src/legacy/ or src/settings/—never /dev/null.

The "Zone" Gravity: All features must now orbit around three cores: Operations (Zone 1), Growth (Zone 2), and Command (Zone 3).

The "Local" Flavor: UI Labels must change from Silicon Valley English to Algerian Business English (e.g., "Revenue" becomes "Cash Collection").

EXECUTION STEPS (Perform these immediately):

STEP 1: THE STRUCTURAL MUTATION (File Tree) Generate a new Project Directory Structure (File Tree) that reflects the New Site Map.

Create directories for: views/Operations, views/Growth, views/Command.

Inside each, create the sub-folders for the Tabs listed in the Report (e.g., views/Operations/Confirmation, views/Command/Finance).

Action: Show me the new tree structure.

STEP 2: THE COMPONENT TELEPORTATION (The Matrix) Review the "Migration Matrix" in the source text.

Tell me exactly which Old Components are being moved to which New Directory.

Example Format: Moving [RiskCalculator.tsx] FROM /components/tools TO /views/Operations/Confirmation/.

Critical: Confirm that "Returns Tracking" has been elevated to the main Logistics view (High Priority).

STEP 3: THE UI LABELS OVERRIDE Identify the top 5 UI Text Labels that need to change to match the Algerian market reality described in the "Diagnostics" section.

Target: Change "Cart/Basket" logic to "Order/Couffa".

Target: Change "Revenue" dashboards to "Pending COD".

OUTPUT REQUIREMENT: Do not write the full code yet.

Output the New Folder Structure (ASCII Tree).

Output the "Move List" (A checklist of files to move).

Output a JSON object defining the new Navigation Sidebar items (Icon + Label + Route).
##################################################################
🚀 PROMPT: The "Anti-Gravity" Construction Phase
SYSTEM: The Restructuring Plan (above) is APPROVED. MODE: EXECUTION / CODING.

TASK: You are now the Builder. You have the blueprint (the Folder Tree and Migration Matrix from your previous response). Now, perform the physical restructuring of the codebase.

ACTION PLAN:

1. Create the Directory Skeleton

Write the terminal commands (bash/PowerShell) to create the new Zone structure exactly as defined in the plan:

src/views/Operations/...

src/views/Growth/...

src/views/Command/...

src/legacy/...

1. Execute the "Move" Operations

Based on your Migration Matrix, write the script to move the files.

IMPORTANT: Do not use generic names. Use the exact file names you listed in the Matrix (e.g., git mv app/ecommerce/_components/orders/ReturnRiskCalculator.tsx src/views/Operations/ConfirmationCommand/FilteringCalling/).

SAFETY CHECK: Ensure Stripe and Email Marketing files are moved to src/legacy/ or src/settings/—do not delete them.

1. The "Router" Patch

Since we moved the files, the imports will break.

Provide a Search & Replace pattern (Regex or instruction) for VS Code to update the import paths (e.g., replace @/components/orders with @/views/Operations/...).

OUTPUT: Provide the Bash Script (for Mac/Linux) or PowerShell Script (for Windows) to execute these moves instantly.
##################################################################
🚀 PROMPT: Phase 3 - The "Reconstruction & Wiring"
SYSTEM: The "Anti-Gravity" file moves are COMPLETE. The file structure is now aligned with the Algerian E-commerce plan. CURRENT STATUS: The codebase is fractured. Imports are broken. The new Views (Operations, Growth, Command) exist as folders but lack the "Glue" (Layouts & Pages) to render the components.

YOUR MISSION: You are the Lead Integrator. You must wire the relocated components into functional dashboards.

TASK 1: FIX THE IMPORTS (The Healer)

Scan the new directory structure.

Identify every file we just moved (from the Migration Matrix).

Action: Update the import paths in these files.

Rule: Use absolute paths (e.g., @/views/Operations/...) where possible to prevent future breakage.

Fix: If a component imports a utility from ../../utils, update it to @/utils.

TASK 2: ASSEMBLE "ZONE 1: OPERATIONS" (The Engine Room)

We need a main entry file for Zone 1.

Create File: src/views/Operations/ConfirmationCommand/page.tsx (or index.tsx).

The Layout Logic:

Implement the "Single Pane of Glass" design described in the original report.

Left Column: OrdersKanban (The list of orders).

Center Column: RiskCalculator + OrderDetails (The active work area).

Right Column: CallScripts + WhatsAppBot (The action tools).

Note: Just skeleton this out so I can see the structure.

TASK 3: ASSEMBLE "ZONE 3: COMMAND" (The Owner's View)

Create File: src/views/Command/Finance/page.tsx.

The Layout Logic:

Top Hero Section: CashCollector (Total Pending COD).

Main Grid: ProfitCalculator vs PendingCODByAge.

Constraint: Ensure "Revenue" labels are replaced with "Collection Potential".

OUTPUT:

Provide the code for src/views/Operations/ConfirmationCommand/page.tsx showing how the components connect.

Provide the code for src/views/Command/Finance/page.tsx.

List the top 3 "Import Fixes" regex patterns I should run globally to clean up the references.
##################################################################
🚀 PROMPT: Phase 4 - The "Stabilization & Cleanup" Protocol
SYSTEM: The Refactor is physically complete. The files are in the new Zones. CURRENT STATUS: "Red State." The build is likely failing due to broken paths, missing types, and "ghost" imports (imports that reference files we moved).

YOUR MISSION: You are the Site Reliability Engineer (SRE). You must stabilize the codebase so it compiles and runs without warnings.

TASK 1: THE "GHOST" HUNT (Unused Imports)

Since we moved logic from generic folders to specific Zones, many old files still have imports that are no longer needed.

Action: Scan the new src/views/ directory. Remove any unused import statements to clean up the noise.

TASK 2: THE TYPE SAFETY PATROL

We moved .tsx files but might have left their interface or type definitions behind in the old folders.

Action: Check for "Module not found" errors related to src/types/ or local interfaces.

Fix: If a component imports a type that is now missing, propose a quick "Shared Type" definition file in src/views/Operations/types.ts to solve it locally.

TASK 3: THE TAILWIND RESCUE

We changed the context of some components. A button that looked good on a white page might look invisible on a gray dashboard.

Action: Ensure that the "Primary Action" buttons (now labeled "Confirmer (DZD)") use the correct High Contrast color class (e.g., bg-green-600 or the brand primary).

TASK 4: THE FINAL BUILD ATTEMPT

I am going to paste my terminal error log in the next message.

Instruction: Do not give me theoretical advice. Look at the specific error codes I provide and give me the exact code snippets to fix them one by one.

OUTPUT:

A strict ESLint or Prettier command to auto-fix import paths if possible.

Acknowledgment that you are ready to receive the npm run build error log.

Visualizing the Final Result
To ensure you and the AI are seeing the same "End Game," here is how the new architecture flows. You can use this mental image to verify the work.

What to do now:
Paste the Prompt above into your chat.

Run npm run dev (or npm run build) in your terminal.

Copy the red error list and paste it into the chat when the AI says "Ready."

This is the final mile. Good luck.
##################################################################
PROMPT: Phase 5 - The "Algerian Identity" Protocol
SYSTEM: The App Structure is live. The Pages are wired. CURRENT STATUS: Functional, but generic. The UI language is "Standard English" which causes friction for local Algerian operators. INPUT: The "Identity & Flavor" section from the original Structural Overhaul Report.

YOUR MISSION: You are the UI/UX Localizer. You must "Algerianize" the interface layer without breaking the code.

TASK 1: THE TERMINOLOGY OVERRIDE (Global Search & Replace)

Scan the components and views for these specific "Silicon Valley" terms and replace them with "Algerian Business" terms :

"Checkout" -> Replace with "Confirm Order" (Since there is no credit card payment).

"Revenue" -> Replace with "Pending Collection" (To reflect COD reality).

"Sales" -> Replace with "Orders" (A sale isn't a sale until cash is in hand).

"Submit" (on forms) -> Replace with "Confirmer (DZD)".

TASK 2: THE "DANGER" COLOR LOGIC

In the original report, "Returns" (Rotour) are a high-priority threat.

Locate the Returns Tracking component (now in views/Operations/Logistics/).

Action: Force a UI update to use "Destructive Red" (#EF4444 or bg-red-600) for any metric related to "Returned" or "Failed Delivery."

Reason: The operator must see these alerts immediately.

TASK 3: THE NAVIGATION ICONS

Update the Sidebar Icons in src/config/navigation.ts (or wherever the sidebar array lives):

Operations: Use a "Gears" or "Engine" icon.

Logistics: Use a "Truck" or "Box" icon.

Finance: Use a "Cash" or "Wallet" icon (Not a generic graph).

OUTPUT:

Provide the sed commands (or VS Code Search/Replace patterns) for the text changes.

Provide the updated code block for the Navigation Sidebar configuration with the correct new Labels and Icons.

Provide the snippet for the "Red Alert" badge style to be used on the Returns Dashboard.

"Stop speaking English. Start speaking Business."

##################################################################

##################################################################
🚀 PROMPT: The "E-coma Identity" Injection Protocol
SYSTEM: The structural refactor is complete. The app is divided into Operations, Growth, and Command. CURRENT STATUS: The app works, but it feels like a "Template." It lacks authority. YOUR MISSION: You are the Brand Architect of E-coma. Your goal is to define the Voice and Visuals of this new platform. You are targeting a user who is "Street Smart" (business savvy), prefers Cash on Delivery, and hates wasted time.

TASK 1: THE MANIFESTO (The Bio)

Context: This is not a startup toy. It is a weapon for commerce.

Draft 2 Short Bios:

The "Login Screen" tagline: A punchy, 1-sentence motivation that appears when the merchant logs in to check their money.

The "App Store" description: A 2-sentence pitch that explains why this app is better than Shopify/WooCommerce for the Algerian market.

TASK 2: THE "ALGERIAN UX" DICTIONARY (Slang & Terminology)

Replace standard "Tech English" with "Algerian Business Reality". Define the exact text labels for:

"Cart" / "Basket" -> (Give me a term that implies "Business Stock" or "Couffa").

"Checkout Success" -> (Instead of "Order Placed," give me a phrase that confirms the deal is locked).

"Refund/Return" -> (Give me the harsh reality term used in the market).

"Revenue" -> (Give me a term that separates "Real Cash" from "Fake Numbers").

"Customer Support" -> (Give me a label that implies "Ops Support" or "Fix my problem").

TASK 3: THE ICONOGRAPHY (Visuals)

The Main Logo: Describe a logo concept that combines "Speed" (Livraison) with "Money" (DZD). No generic shopping carts.

The Zone Icons:

Zone 1 (Operations): Describe an icon that represents "The Engine" or "The Grind."

Zone 2 (Growth): Describe an icon that represents "The Magnet" or "The Amplification."

Zone 3 (Command): Describe an icon that represents "The Vault" or "The Throne."

OUTPUT: Provide this as a structured Brand Style Guide that I can hand to a UI designer.

💡 Why this works:
It moves away from "User" language (which is often soft) to "Merchant" language (which is about money and speed).

It reinforces the 3-Zone Structure you just built by asking for specific icons for those exact zones.

It solves the "Translation" issue by asking for conceptual replacements (Real Cash vs Fake Numbers) rather than just literal Arabic translations.
##################################################################

##################################################################
