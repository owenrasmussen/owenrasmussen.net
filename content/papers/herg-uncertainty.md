---
title: "herg-uncertainty: A Calibrated, Applicability-Domain-Aware hERG Blocker Classifier"
date: "2026-07-06"
category: "ai-sim"
summary: "A selective-prediction system for cardiac ion-channel toxicity — calibrated uncertainty plus an explicit applicability-domain check, validated across 10 phases and a genuine 3,896-compound prospective test."
draft: true
---

## Abstract

Predicting whether a small molecule blocks the hERG cardiac ion channel is
a standard early drug-safety screen. Raw classification accuracy on this
task is already well-studied; the contribution here is a
**selective-prediction system** built on top of a standard classifier —
conformal prediction, Venn-ABERS calibration, and a k-NN applicability-domain
(AD) check, combined and validated together so the system's confidence
degrades gracefully outside its training domain instead of failing
silently. The individual components each exist in the QSAR/ADMET
literature for hERG; the validated, integrated combination does not appear
to have been published as a unit. Full interactive results are on the
[AI Sim page](/projects/ai-sim); this paper is the condensed technical writeup.

## Honest limitations

1. hERG block is a surrogate marker, not a safety verdict. Under ICH
   S7B/E14, hERG binding predicts *Torsade de Pointes* risk with high
   sensitivity but low specificity.
2. The binary 10 µM IC50 threshold is a convention, not a biological
   boundary.
3. The TDC hERG set (648 compounds) is small; cross-paper AUROC
   comparisons are not apples-to-apples.
4. This is a research/educational tool, explicitly not validated for
   clinical or regulatory use.
5. The classical-ML-beats-GNN result (below) is confirmation of prior
   published findings, not a novel result.

## Method

**Features.** Morgan fingerprints (radius 2, 2,048 bits) plus ~200 RDKit
physicochemical descriptors, feeding Random Forest and XGBoost baselines.

**Uncertainty.** Mondrian (class-conditional) inductive conformal
prediction (`crepes`) for set-valued predictions with a coverage
guarantee, plus Venn-ABERS calibration for well-calibrated probabilities.

**Applicability domain.** A k-NN Tanimoto (structural-similarity) distance
in fingerprint space flags test compounds as in- or out-of-domain relative
to the training set.

**Datasets.** TDC's 648-compound hERG set (scaffold and random splits) for
initial validation; a curated, larger 8,879-compound ChEMBL/PubChem hERG
set (Arab & Barakat 2021) for the main results; Nav1.5 and Cav1.2 datasets
for multi-channel extension; AMES mutagenicity and two carcinogenicity
datasets (TDC + a from-scratch CPDB curation) to test generalization
beyond cardiotoxicity.

## Results

- **Baseline AUROC**: 0.83–0.85 (scaffold split), in line with the
  published literature band, with specificity (0.46–0.51) as the clear
  weak point.
- **The central claim replicates across 5 configurations**: AUROC on
  applicability-domain-flagged in-domain compounds is consistently higher
  than on out-of-domain compounds, most convincingly on a genuine
  prospective validation set of 3,896 compounds confirmed to have zero
  overlap — exact or near-duplicate — with any training data.
- **Classical ML beats a from-scratch GIN (graph neural network)** at
  every training-set size tested (500 to 8,379 compounds), with the gap
  holding steady rather than closing as data grows — matching
  Siramshetty (2020), Jiang (2021), and Arab (2024).
- **AD-conditioned conformal calibration** gives a real, reproducible
  coverage improvement in the majority of the test set, at a real, smaller
  cost in a minority region — confirmed on hERG and AMES via 10-seed
  robustness checks, but the same technique does *not* help on a
  carcinogenicity endpoint, an honestly-reported negative result.
- **Three separate attempts** at predicting *which specific compounds* the
  model will get wrong (activity-cliff detection, self-training, a
  dedicated failure predictor) landed in a narrow, unconvincing band
  (meta-AUROC 0.52–0.60) — converging evidence against a strong learnable
  signal for per-compound failure in 2D structural features alone.

See the [AI Sim page](/projects/ai-sim) for interactive charts across all 10 phases,
including the multi-channel extension, the composite risk score, and the
generalization tests to AMES and carcinogenicity.
