---
title: "Polymarket / Kalshi Arbitrage Bot"
date: "2026-05-13"
status: "active"
category: "tools"
summary: "A cross-platform arbitrage bot that watches Polymarket and Kalshi sports markets in real time over websockets, matches equivalent game-outcome markets by team name, and flags true hedges — buying YES on one platform and the equivalent NO on the other for a profit that's locked in regardless of outcome. It prices in each platform's actual fee structure before ever showing an edge (Kalshi's 0.07 × price × (1 − price) per-contract fee, Polymarket's maker rebate vs. taker fee), requires a real net edge above a minimum threshold before it will act, and — since it's placing real orders, not just alerting — executes the Kalshi leg first as fill-or-kill, hedges on Polymarket sized to the actual fill it got, and automatically flattens the Kalshi position if the Polymarket hedge fails to fill. Runs in dry-run mode with full trade logging until every piece is verified against real fills."
tags: ["arbitrage", "trading", "websockets", "prediction-markets"]
link: false
draft: false
---
