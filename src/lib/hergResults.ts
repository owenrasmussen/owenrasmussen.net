// Real results curated from the herg-uncertainty project
// (github-local: ~/Documents/ai-sim/herg-uncertainty). Numbers are taken
// directly from the project's README and results/*.json — nothing here is
// simulated or illustrative.

export const phase1Baseline = [
  {
    label: "RF (scaffold)",
    model: "Random Forest",
    split: "scaffold",
    auroc: 0.853,
    sensitivity: 0.979,
    specificity: 0.457,
    mcc: 0.561,
  },
  {
    label: "XGBoost (scaffold)",
    model: "XGBoost",
    split: "scaffold",
    auroc: 0.83,
    sensitivity: 0.969,
    specificity: 0.514,
    mcc: 0.583,
  },
  {
    label: "RF (random)",
    model: "Random Forest",
    split: "random",
    auroc: 0.833,
    sensitivity: 0.959,
    specificity: 0.515,
    mcc: 0.561,
  },
  {
    label: "XGBoost (random)",
    model: "XGBoost",
    split: "random",
    auroc: 0.836,
    sensitivity: 0.929,
    specificity: 0.515,
    mcc: 0.498,
  },
];

// The project's central claim: accuracy degrades outside the model's
// applicability domain (AD) rather than failing silently.
export const phase2AD = [
  {
    dataset: "hERG · TDC (scaffold, n=132)",
    inDomain: 0.822,
    outOfDomain: 0.95,
    oodN: 11,
  },
  {
    dataset: "hERG · TDC (random, n=131)",
    inDomain: 0.822,
    outOfDomain: 1.0,
    oodN: 6,
  },
  {
    dataset: "hERG · ChEMBL (n=498)",
    inDomain: 0.876,
    outOfDomain: 0.637,
    oodN: 100,
  },
  {
    dataset: "AMES mutagenicity (n=1,451)",
    inDomain: 0.855,
    outOfDomain: 0.694,
    oodN: 240,
  },
  {
    dataset: "Carcinogenicity · CPDB (n=259)",
    inDomain: 0.736,
    outOfDomain: 0.701,
    oodN: 18,
  },
];

export const phase2Calibration = {
  dataset: "hERG · ChEMBL (n=498)",
  conformalEmpiricalCoverage: 0.888,
  conformalNominalCoverage: 0.9,
  vennAbersEce: 0.08,
  vennAbersBrier: 0.163,
  adInDomainFraction: 0.795,
};

// Phase 3: does a graph neural net catch up to classical ML as training
// data grows? It doesn't, at this data scale.
export const phase3LearningCurve = {
  n: [500, 1000, 2000, 4000, 8379],
  randomForest: {
    mean: [0.7492, 0.7495, 0.7888, 0.8076, 0.8356],
    std: [0.0218, 0.0198, 0.0042, 0.0122, 0.0043],
  },
  gin: {
    mean: [0.6968, 0.683, 0.7253, 0.7199, 0.777],
    std: [0.0232, 0.0115, 0.0373, 0.0219, 0.0125],
  },
};

// Phase 4: bucketing calibration by applicability-domain distance instead
// of class label alone. The 10-seed robustness check is "the number to
// trust" per the project's own writeup — a single split made bin 1 look
// tied; across seeds it's a real, small cost.
export const phase4Bins = [
  {
    bin: "Bin 0 (n≈6, most in-domain)",
    plainMean: 0.748,
    plainStd: 0.093,
    adMean: 0.748,
    adStd: 0.093,
  },
  {
    bin: "Bin 1 (n≈59)",
    plainMean: 0.873,
    plainStd: 0.026,
    adMean: 0.851,
    adStd: 0.029,
  },
  {
    bin: "Bin 2 (n≈433, bulk of test set)",
    plainMean: 0.899,
    plainStd: 0.01,
    adMean: 0.921,
    adStd: 0.014,
  },
];
export const phase4Overall = {
  plainMean: 0.894,
  plainStd: 0.01,
  adMean: 0.911,
  adStd: 0.011,
};

// Phase 5 / 5.5 / 5.6: three different attempts to find a strong signal
// for "which specific predictions is the model likely to get wrong."
export const phase5ActivityCliff = [
  { version: "v1 (naive k-NN label spread)", catchRate: 0.429, falseFlagRate: 0.333, lift: 1.29 },
  { version: "v2 (SALI-weighted + significance test)", catchRate: 0.154, falseFlagRate: 0.121, lift: 1.27 },
];

export const phase5_5SelfTrain = {
  aurocGapToTeacher: { realDataOnly: 0.053, selfTrained: 0.033 },
  domainGap: { realDataOnly: 0.005, selfTrained: 0.096, teacherRf: 0.205 },
};

export const phase5_6MetaAuroc = [
  { signal: "Tanimoto AD distance", mean: 0.578, std: 0.019 },
  { signal: "Venn-ABERS interval width", mean: 0.523, std: 0.065 },
  { signal: "Activity-cliff score", mean: 0.602, std: 0.012 },
  { signal: "Dedicated failure predictor", mean: 0.574, std: 0.036 },
];

// Phase 6: prospective validation on 3,896 compounds confirmed to have zero
// overlap (exact or near-duplicate) with any training data — the strongest
// external check in the project.
export const phase6Prospective = [
  {
    setLabel: "Internal ChEMBL test",
    overall: 0.876,
    inDomain: 0.876,
    outOfDomain: 0.637,
    inDomainFraction: 0.795,
  },
  {
    setLabel: "Genuine prospective set (n=3,896)",
    overall: 0.797,
    inDomain: 0.818,
    outOfDomain: 0.712,
    inDomainFraction: 0.698,
  },
];

// Phase 7: extending the same pipeline to two more cardiac ion channels.
export const phase7Channels = [
  {
    channel: "hERG (ChEMBL, reference)",
    auroc: 0.876,
    adInDomainFraction: 0.795,
    inDomain: 0.876,
    outOfDomain: 0.637,
  },
  {
    channel: "Nav1.5 (n=170 test)",
    auroc: 0.931,
    adInDomainFraction: 0.935,
    inDomain: 0.917,
    outOfDomain: 0.729,
  },
  {
    channel: "Cav1.2 (n=81 test)",
    auroc: 0.942,
    adInDomainFraction: 1.0,
    inDomain: 0.93,
    outOfDomain: null,
  },
];

// Phase 8: composite cardiac-risk proxy checked against 28 CiPA reference
// drugs — most of which turned out to already be in the training data.
export const phase8Composite = [
  { setLabel: "All 28 CiPA drugs (21/28 contaminated)", auc: 0.573, spearman: 0.272, n: 28 },
  { setLabel: "Clean subset (n=5, genuinely held out)", auc: 0.833, spearman: 0.577, n: 5 },
];

// Phase 9: first non-cardiac endpoint — does the AD claim generalize?
export const phase9Ames = {
  baselineAuroc: { rf: 0.854, xgboost: 0.871 },
  conformalCoverage: 0.87,
  adInDomainFraction: 0.834,
  inDomain: 0.855,
  outOfDomain: 0.694,
  phase4TenSeed: { plain: 0.881, adConditional: 0.892 },
};

// Phase 10: carcinogenicity — a genuinely mixed result, reported as-is.
export const phase10Carcinogens = [
  {
    setLabel: "TDC carcinogens (n=280)",
    auroc: 0.779,
    adInDomainFraction: 0.909,
    inDomain: 0.808,
    outOfDomain: null,
  },
  {
    setLabel: "CPDB carcinogens (n=1,294, built from scratch)",
    auroc: 0.751,
    adInDomainFraction: 0.931,
    inDomain: 0.736,
    outOfDomain: 0.701,
  },
];
export const phase10Phase4 = {
  plainMean: 0.882,
  plainStd: 0.023,
  adMean: 0.881,
  adStd: 0.026,
};
