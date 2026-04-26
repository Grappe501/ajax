# AJAX ↔ RedDirt firewall (agent & data)

This document trains staff, engineers, and **all AJAX AI agents** on what must stay separated.

## Product boundaries

| Scope | Repository / app | Contains |
|--------|------------------|----------|
| **AJAX** | `ajax` (this repo) | Jacksonville initiative: petition, wards, local officials pages, faith outreach, local fundraising, FOIA chunks, legacy petition crosswalk (Jacksonville-only). |
| **RedDirt** | `RedDirt` | SOS / statewide campaign site, content board, Arkansas-wide engines, GoodChange slug for **that** campaign. |
| **County workbench** | `countyWorkbench` | Pope / Arkansas county numeric workbench — **not** AJAX. |
| **Peoplebase** (future) | Shared service | **Only** voter profile scoring / engagement dimensions agreed in writing — **not** raw AJAX signer rows, not SOS lists. |

## Agent rules (Pathlip / coordinator doctrine)

1. **No cross-DB assumptions** in prompts or tool results.
2. **Comms billing**: Twilio and SendGrid are metered; internal ledger stores vendor cost and **billable = cost × 1.25** (25% pass-through) unless finance changes policy.
3. **Faith content**: Civic duty + congregation stewardship; no national partisan alignment in agent copy.
4. **Officials**: Stance on the **ballot initiative** is editorially maintained; survey answers are attributed when received.

## Implementation

- `lib/agents/reddirt-firewall.ts` — system block injected before ward/admin personas.
- `app/api/assistant/agent/route.ts` — prepends firewall to every completion.

Update this file when Peoplebase or vendor contracts change.
