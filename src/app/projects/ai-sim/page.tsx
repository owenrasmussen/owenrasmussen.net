import Link from "next/link";
import { getAllPapers } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import ChartCard from "@/components/charts/ChartCard";
import BarComparisonChart from "@/components/charts/BarComparisonChart";
import LearningCurveChart from "@/components/charts/LearningCurveChart";
import CoverageBinChart from "@/components/charts/CoverageBinChart";
import {
  phase1Baseline,
  phase2AD,
  phase2Calibration,
  phase3LearningCurve,
  phase4Bins,
  phase4Overall,
  phase5ActivityCliff,
  phase5_6MetaAuroc,
  phase6Prospective,
  phase7Channels,
  phase8Composite,
  phase9Ames,
  phase10Carcinogens,
  phase10Phase4,
} from "@/lib/hergResults";

export const metadata = {
  title: "AI Sim — Owen Rasmussen",
  description:
    "herg-uncertainty: a calibrated, applicability-domain-aware cardiotoxicity classifier, explored through interactive results across 10 phases.",
};

const COLOR = {
  rf: "#6366f1",
  xgb: "#f59e0b",
  gin: "#ef4444",
  inDomain: "#6366f1",
  outDomain: "#f59e0b",
  plain: "#71717a",
  ad: "#6366f1",
};

function Phase({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/10 py-14 dark:border-white/10">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
        Phase {n}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

export default function AiSimPage() {
  const relatedPapers = getAllPapers().filter((p) => p.category === "ai-sim");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
        herg-uncertainty
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        A calibrated hERG cardiotoxicity classifier
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Predicting whether a compound blocks the hERG cardiac ion channel is a
        standard early drug-safety screen. The centerpiece of this project
        isn&apos;t raw accuracy — it&apos;s a{" "}
        <strong className="text-zinc-900 dark:text-zinc-100">
          selective-prediction system
        </strong>
        : calibrated uncertainty plus an explicit applicability-domain check,
        so the model degrades gracefully outside its training domain instead
        of failing silently.
      </p>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        The bigger goal behind this: a positive AMES or carcinogenicity call
        today routinely triggers real in-vivo rodent testing (see Phases 9
        and 10 below). Better computational safety screening — models that
        know when to trust themselves and when not to — is one of the
        concrete, unglamorous levers for reducing how much of that testing
        drug development actually needs, in line with where FDA New Approach
        Methodology guidance is heading. This project doesn&apos;t replace
        any of that. But it&apos;s aimed at the kind of problem that,
        pushed on long enough by enough people, eventually could.
      </p>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        To be specific about what &quot;pushed on long enough&quot; actually
        means: eliminating animal testing isn&apos;t one breakthrough, it&apos;s
        a slow stack of smaller ones — better in-vitro assays, organ-on-chip
        models, and computational predictions regulators and pharma teams
        can actually act on. This project is aimed at that last piece, and
        only a sliver of it. A model that&apos;s right 85% of the time
        isn&apos;t enough on its own to skip a rodent study; a model that can
        also flag the compounds it&apos;s <em>not</em> confident about is
        closer to something a toxicologist could build a real workflow
        around — reserving traditional testing for the cases that actually
        need it instead of running it on everything by default. That&apos;s
        a long way from where this project is today. But it&apos;s the
        direction the applicability-domain work here is pointed, one piece
        among many that would all have to hold up together.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500">
        Every number below is real, pulled directly from the project&apos;s
        results — including the ones that didn&apos;t work. Charts are
        interactive: hover any point or bar for exact values.
      </p>

      <div className="mt-8 rounded-lg border border-amber-600/20 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/5 dark:text-amber-200">
        <strong>Read before trusting any number here:</strong> hERG block is a
        surrogate marker, not a safety verdict — high sensitivity, low
        specificity for real cardiotoxicity risk. This is a research/
        educational tool, not validated for clinical or regulatory use.
      </div>

      <Phase n="0–1" title="Baseline: can a plain classifier do this at all?">
        <p>
          Starting point: Random Forest and XGBoost on Morgan fingerprints
          (2,048 bits) plus ~200 RDKit physicochemical descriptors, trained
          on TDC&apos;s 648-compound hERG set with two different train/test
          splits. Scaffold split is the harder, more realistic test — it
          holds out entire chemical scaffolds rather than random compounds,
          so the model can&apos;t just memorize close analogs.
        </p>
        <ScrollReveal>
          <ChartCard height={280}>
            <BarComparisonChart
              data={phase1Baseline}
              categoryKey="label"
              yDomain={[0, 1]}
              series={[
                { key: "auroc", label: "AUROC", color: COLOR.rf },
                { key: "specificity", label: "Specificity", color: COLOR.xgb },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          AUROC (0.83–0.85) lands within the published literature band, with
          no sign of the &gt;0.95 red flag that usually means data leakage.
          The visible weak point is <strong>specificity</strong> (0.46–0.51)
          — these models catch blockers well but aren&apos;t confident at
          clearing non-blockers, which sets up exactly why an uncertainty
          layer matters.
        </p>
      </Phase>

      <Phase
        n="2 / 6 / 9 / 10"
        title="Does accuracy actually drop outside the training domain?"
      >
        <p>
          This is the project&apos;s central claim, tested five separate
          times across different datasets and endpoints: split every test
          compound into &quot;in-domain&quot; or &quot;out-of-domain&quot;
          using a k-NN Tanimoto (structural similarity) applicability-domain
          check, then compare AUROC on each half separately.
        </p>
        <ScrollReveal>
          <ChartCard height={320}>
            <BarComparisonChart
              data={phase2AD}
              categoryKey="dataset"
              yDomain={[0.5, 1]}
              height={320}
              series={[
                { key: "inDomain", label: "In-domain AUROC", color: COLOR.inDomain },
                { key: "outOfDomain", label: "Out-of-domain AUROC", color: COLOR.outDomain },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          The gap is real and consistent in direction on 4 of 5
          configurations — the exception, TDC&apos;s random split, has only
          6 out-of-domain compounds and shouldn&apos;t be trusted at that
          sample size. The cleanest validation is the{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            genuine prospective set
          </strong>{" "}
          (Phase 6): 3,896 compounds confirmed to have zero overlap — exact
          or near-duplicate — with anything the model trained on. The AD gap
          replicates there too, on real external data, not just an internal
          test split.
        </p>
        <ScrollReveal>
          <ChartCard
            height={280}
            title="Phase 6 — internal test vs. genuine prospective set (n=3,896)"
          >
            <BarComparisonChart
              data={phase6Prospective}
              categoryKey="setLabel"
              yDomain={[0.5, 1]}
              height={280}
              series={[
                { key: "overall", label: "Overall AUROC", color: COLOR.rf },
                { key: "inDomain", label: "In-domain AUROC", color: COLOR.inDomain },
                { key: "outOfDomain", label: "Out-of-domain AUROC", color: COLOR.outDomain },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          Overall accuracy genuinely drops on truly novel compounds (0.876 →
          0.797) — the internal numbers were somewhat optimistic even
          without any leakage. But the in-domain/out-of-domain gap holds up
          on data that was never touched during dataset curation, at real
          sample size — the closest thing to genuine external evidence this
          project can produce.
        </p>
        <p>
          On the ChEMBL set specifically, the conformal-prediction coverage
          came in at {(phase2Calibration.conformalEmpiricalCoverage * 100).toFixed(1)}%
          against a {(phase2Calibration.conformalNominalCoverage * 100).toFixed(0)}%
          nominal target, with a Venn-ABERS calibration error (ECE) of{" "}
          {phase2Calibration.vennAbersEce.toFixed(3)} — the model&apos;s
          confidence scores are honest, not just its bare predictions.
        </p>
      </Phase>

      <Phase n="3" title="Does a graph neural net beat classical ML here?">
        <p>
          Built a GIN (Graph Isomorphism Network) from scratch in PyTorch
          Geometric and ran a learning curve against Random Forest — same
          training subsets (500 to 8,379 compounds), same held-out test set,
          3 random-subsample repeats each.
        </p>
        <ScrollReveal>
          <ChartCard height={300}>
            <LearningCurveChart
              n={phase3LearningCurve.n}
              series={[
                {
                  key: "rf",
                  label: "Random Forest",
                  color: COLOR.rf,
                  mean: phase3LearningCurve.randomForest.mean,
                  std: phase3LearningCurve.randomForest.std,
                },
                {
                  key: "gin",
                  label: "GIN (graph neural net)",
                  color: COLOR.gin,
                  mean: phase3LearningCurve.gin.mean,
                  std: phase3LearningCurve.gin.std,
                },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          Hypothesis confirmed: RF beats the GIN at every single training
          size, and the gap doesn&apos;t close as data grows — it holds
          fairly steady around 0.05–0.06 AUROC from 500 compounds up to the
          full 8,379. This matches prior published findings (Siramshetty
          2020, Jiang 2021, Arab 2024): classical descriptor-based ML
          matches or beats graph neural nets at hERG&apos;s current data
          scale. Reported as confirmation, not a novel result.
        </p>
      </Phase>

      <Phase n="4" title="Calibrating uncertainty by domain, not just by class">
        <p>
          Instead of calibrating conformal prediction by class label alone,
          bucket the test set into 3 bins by applicability-domain distance
          and calibrate each bin separately. A single train/test split made
          this look like a clean win — so it was re-run across 10 random
          splits before trusting the result.
        </p>
        <ScrollReveal>
          <ChartCard height={300}>
            <CoverageBinChart data={phase4Bins} />
          </ChartCard>
        </ScrollReveal>
        <p>
          The 10-seed check tells a more honest story than the first run
          did: AD-conditioning costs about 2 percentage points of coverage
          in the smaller bin 1 (
          {(phase4Bins[1].plainMean * 100).toFixed(1)}% →{" "}
          {(phase4Bins[1].adMean * 100).toFixed(1)}%), but gains more than
          that back in bin 2 — the bulk of the test set (
          {(phase4Bins[2].plainMean * 100).toFixed(1)}% →{" "}
          {(phase4Bins[2].adMean * 100).toFixed(1)}%). Overall:{" "}
          {(phase4Overall.plainMean * 100).toFixed(1)}% →{" "}
          {(phase4Overall.adMean * 100).toFixed(1)}% coverage against a 90%
          target. A real, reproducible improvement where most of the data
          lives, at a real, smaller, reproducible cost elsewhere — shown
          with both sides, not just the flattering number.
        </p>
      </Phase>

      <Phase
        n="5 / 5.5 / 5.6"
        title="Chasing a signal for which predictions are wrong — mostly a null result"
      >
        <p>
          Three different attempts to answer &quot;can we predict which
          specific compounds the model will get wrong,&quot; beyond just
          flagging out-of-domain compounds in aggregate.
        </p>
        <ScrollReveal>
          <ChartCard
            height={300}
            title="Meta-AUROC — does each signal separate right from wrong predictions?"
          >
            <BarComparisonChart
              data={phase5_6MetaAuroc}
              categoryKey="signal"
              yDomain={[0.4, 0.7]}
              height={300}
              series={[{ key: "mean", label: "Meta-AUROC", color: COLOR.rf }]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          A dedicated failure-predictor classifier (trained directly on
          &quot;was the base model wrong&quot;) landed mid-pack — it did{" "}
          <em>not</em> beat the hand-crafted signals it was meant to
          replace. All four signals sit in a narrow, modest band
          (0.52–0.60): converging evidence that there may not be a strong,
          learnable &quot;which prediction is wrong&quot; signal in 2D
          structural features alone for this problem.
        </p>
        <p className="text-sm">
          An activity-cliff detector (flagging compounds whose nearest
          training neighbors disagree with each other) was rebuilt once
          after a literature review, with a more principled significance
          test — catch rate went from{" "}
          {(phase5ActivityCliff[0].catchRate * 100).toFixed(0)}% to{" "}
          {(phase5ActivityCliff[1].catchRate * 100).toFixed(0)}%, but lift
          over chance stayed essentially flat ({phase5ActivityCliff[0].lift}x
          → {phase5ActivityCliff[1].lift}x) — ruling out &quot;implemented
          sloppily&quot; without finding a stronger signal underneath.
        </p>
      </Phase>

      <Phase n="7" title="Extending to two more cardiac ion channels">
        <p>
          The same pipeline, unmodified, applied to Nav1.5 and Cav1.2 —
          two more channels relevant to cardiac drug safety. Both baselines
          score higher than hERG&apos;s, but on much smaller test sets (170
          and 81 compounds), so read these as single-run snapshots, not
          yet robustness-checked the way hERG&apos;s Phase 4 result was.
        </p>
        <ScrollReveal>
          <ChartCard height={300}>
            <BarComparisonChart
              data={phase7Channels}
              categoryKey="channel"
              yDomain={[0.5, 1]}
              height={300}
              series={[
                { key: "inDomain", label: "In-domain AUROC", color: COLOR.inDomain },
                { key: "outOfDomain", label: "Out-of-domain AUROC", color: COLOR.outDomain },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          Cav1.2&apos;s 801-compound training set produces zero
          out-of-domain test compounds — its bar is simply missing above,
          not zero — mirroring the same small-dataset problem TDC&apos;s
          original hERG set had. An overnight audit also found real
          near-duplicate leakage in Nav1.5 (11.2% of test compounds); tested
          directly, removing it didn&apos;t change the results.
        </p>
      </Phase>

      <Phase n="8" title="A composite risk score, checked against a hard problem">
        <p>
          Combined all three channels into one proxy risk score and checked
          it against 28 CiPA reference drugs with published clinical risk
          categories — a real external check, in theory.
        </p>
        <ScrollReveal>
          <ChartCard height={280}>
            <BarComparisonChart
              data={phase8Composite}
              categoryKey="setLabel"
              yDomain={[0, 1]}
              height={280}
              series={[
                { key: "auc", label: "AUC (low vs. higher risk)", color: COLOR.rf },
                { key: "spearman", label: "Spearman correlation", color: COLOR.xgb },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          The real finding here is structural, not numerical:{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            21 of 28 &quot;famous&quot; reference drugs turned out to already
            be in the training data.
          </strong>{" "}
          Only 5 were genuinely held out — far too few to trust either
          number above, which is exactly why Phase 6&apos;s prospective
          validation mattered: famous drugs are close to useless for
          externally validating models trained on public bioactivity
          databases.
        </p>
      </Phase>

      <Phase n="9" title="Does the applicability-domain claim generalize past cardiotox?">
        <p>
          First test on a structurally unrelated endpoint: AMES bacterial
          mutagenicity (7,278 compounds) — a positive result routinely
          triggers real in-vivo genotoxicity follow-up testing, so this
          isn&apos;t just a new benchmark to run.
        </p>
        <ScrollReveal>
          <ChartCard height={280}>
            <BarComparisonChart
              data={[
                {
                  label: "AUROC in-domain",
                  ames: phase9Ames.inDomain,
                  herg: 0.876,
                },
                {
                  label: "AUROC out-of-domain",
                  ames: phase9Ames.outOfDomain,
                  herg: 0.637,
                },
              ]}
              categoryKey="label"
              yDomain={[0.5, 1]}
              height={280}
              series={[
                { key: "ames", label: "AMES", color: COLOR.rf },
                { key: "herg", label: "hERG (ChEMBL, for comparison)", color: COLOR.xgb },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          The gap replicates (0.855 → 0.694, a 0.16 AUROC drop) — smaller
          than hERG&apos;s but the same direction, on a completely different
          toxicity mechanism. One reversal worth flagging plainly: across
          every cardiac-channel config, Venn-ABERS uncertainty beat AD
          distance as a risk-ranking signal; on AMES, AD distance ranks
          better. Reported as observed, not smoothed into the prior framing.
        </p>
      </Phase>

      <Phase n="10" title="Carcinogenicity: the weakest, most honestly mixed result">
        <p>
          TDC&apos;s 280-compound carcinogenicity set was too small to even
          compute an out-of-domain AUROC. Rather than stop there, a
          1,294-compound companion dataset was built from scratch from the
          Carcinogenic Potency Database — a real data-engineering job (CAS
          numbers, not SMILES; per-experiment votes aggregated into one
          call per chemical).
        </p>
        <ScrollReveal>
          <ChartCard height={280}>
            <BarComparisonChart
              data={phase10Carcinogens}
              categoryKey="setLabel"
              yDomain={[0.5, 1]}
              height={280}
              series={[
                { key: "auroc", label: "Overall AUROC", color: COLOR.rf },
                { key: "adInDomainFraction", label: "AD in-domain fraction", color: COLOR.xgb },
              ]}
            />
          </ChartCard>
        </ScrollReveal>
        <p>
          On the larger set, the in/out-of-domain gap replicates but is the
          weakest in the project (0.736 → 0.701). More notably, the 10-seed
          robustness check on AD-conditioned conformal prediction — the
          technique that worked on hERG and AMES —{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            did not help here
          </strong>{" "}
          ({(phase10Phase4.plainMean * 100).toFixed(1)}% →{" "}
          {(phase10Phase4.adMean * 100).toFixed(1)}%, essentially
          identical). The clearest properly-checked case in the project of
          this technique genuinely not helping on a real endpoint — a useful
          counterweight to the cleaner wins elsewhere.
        </p>
      </Phase>

      <div className="mt-4">
        <h2 className="text-lg font-medium">Paper</h2>
        {relatedPapers.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {relatedPapers.map((paper) => (
              <li key={paper.slug}>
                <Link
                  href={`/papers/${paper.slug}`}
                  className="group block rounded-lg border border-black/10 p-5 transition-colors hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
                >
                  <h3 className="font-medium group-hover:underline">
                    {paper.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {paper.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">
            No AI sim paper published yet.
          </p>
        )}
      </div>
    </div>
  );
}
