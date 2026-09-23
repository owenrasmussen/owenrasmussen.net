---
title: "Furniture Arbitrage Scanner"
date: "2026-07-27"
status: "active"
category: "tools"
summary: "A three-pass pipeline that scans Facebook Marketplace for underpriced luxury office chairs (Herman Miller, Steelcase, Humanscale, Eames) that sellers list without knowing what they have. Pass one pulls every cheap chair listing in range straight from Facebook's embedded JSON — no vision calls, no wasted spend. Pass two runs each surviving thumbnail through Claude's vision model to classify it against a target catalog, which is the actual unlock: a seller who already knows their chair's value titles the listing by name and prices it correctly, so the real deals only exist in generic listings that keyword search can never find. Pass three opens the survivors, grades condition and confirms authenticity from the full photo set, and prices them against real eBay sold comps — outlier-fenced and sample-size-aware, so a thin comp set reports itself as unreliable instead of fabricating a confident number. A scoring engine haircuts the raw margin by condition, identification confidence, and comp sample size before returning a BUY / MAYBE / SKIP call."
tags: ["computer-vision", "web-scraping", "claude-api", "pricing"]
link: false
draft: false
---
