import type { ReactNode } from 'react';
import { useSay } from '@/lib/contentText';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AccountOnlyLink } from '@/components/layout/AccountOnlyLink';
import { CardCarousel } from '@/components/patterns/CardCarousel';
import { STAGES } from '@/config/stages';
import { useResults, useTransparency, type TransparencyPayload } from '@/services/hooks';
import { QueryState, WidgetBoundary } from '@/components/layout/QueryState';
import { FreshnessLine } from '@/components/layout/Shell';
import { StatSkeleton } from '@/components/ui/Feedback';
import { GateFile } from '@/components/domain/GateFile';
import { OutcomePie } from '@/components/domain/OutcomePie';
import { useReveal } from '@/lib/reveal';
import { moneyScaled, num } from '@/lib/format';


function Eyebrow({ children, tone = 'deep' }: { children: ReactNode; tone?: 'deep' | 'paper' }) {
  return (
    <p className={['field-label mb-3 flex items-center gap-2', tone === 'deep' ? '!text-deep-dim' : ''].join(' ')}>
      <span aria-hidden className={['inline-block h-px w-6', tone === 'deep' ? 'bg-deep-rule' : 'bg-rule'].join(' ')} />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ page */

export default function DemandBoard() {
  const say = useSay();
  const { t } = useTranslation();
  const stats = useTransparency();
  const results = useResults();

  useReveal([stats.data, results.data]);

  const h = stats.data?.data.headline;

  return (
    <div className="-mx-4 -mt-6 md:-mx-6">
      {/* ============================================== 1. the hero
        The claim and the evidence, side by side: the sentence on the left, and
        on the right an actual open case with its seven gates written down it —
        three stamped, one open, three still blank. It is the only thing on the
        page that could not be said by a brochure.
      */}
      <section className="deep deep-field full-bleed px-4 pb-16 pt-12 md:px-6 lg:pt-16">
        <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow>{t('pubStatic.demand.heroEyebrow')}</Eyebrow>
            <h1 className="max-w-hero font-display text-mega tracking-mega text-deep-ink">
              {t('pubStatic.demand.heroTitleLead')}
              <span className="block text-saffron">{t('pubStatic.demand.heroTitleAccent')}</span>
              {t('pubStatic.demand.heroTitleTail')}
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-deep-dim">{t('pubStatic.demand.heroLead')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#money-heading"
                className="press inline-flex h-12 items-center rounded-pill bg-saffron px-6 text-body font-semibold text-deep no-underline shadow-saffron"
              >
                {t('pubStatic.demand.seeTheMoney')}
              </a>
              <Link
                to="/how-it-works"
                className="swift inline-flex h-12 items-center rounded-pill border border-deep-rule px-6 text-body text-deep-ink no-underline hover:border-saffron hover:text-saffron"
              >
                {t('pubStatic.demand.gatesLink')}
              </Link>
            </div>

            {h ? (
              <dl className="mt-10 grid max-w-[540px] grid-cols-3 gap-px overflow-hidden rounded-block border border-deep-rule bg-deep-rule">
                {[
                  { k: t('pubStatic.demand.statDepartments'), v: num(h.departments), c: 'text-deep-ink' },
                  { k: t('pubStatic.demand.statDistricts'), v: num(h.districts), c: 'text-saffron' },
                  { k: t('pubStatic.demand.statCommitted'), v: moneyScaled(h.committedPaise), c: 'text-signal' },
                ].map((s) => (
                  <div key={s.k} className="bg-deep-2 px-4 py-4">
                    <dt className="field-label !text-deep-dim">{s.k}</dt>
                    <dd className={['mt-1 font-display text-figure tnum', s.c].join(' ')}>{s.v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="mt-10 h-[92px] max-w-[540px] rounded-block bg-deep-2" />
            )}
          </div>

          {/*
            A diagram of the process would only show how the programme is meant
            to work. Drawing a real case, standing where it actually stands,
            shows that it is working — which is the harder and more useful
            claim, and the only one this page is entitled to make.
          */}
          <figure className="m-0 lg:pl-6">
            <GateFile at={3} />
            <figcaption className="mt-4 max-w-[46ch] text-micro text-deep-dim">
              {t('pubStatic.demand.workedExample')}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============================================== 3. where the money goes
        The homepage of a procurement programme has one obligation to a reader
        who will never apply for anything: say what has been committed in their
        name, and how long the state takes to pay against evidence. Both are
        aggregate. Nothing here names a case, a department's current position,
        or anything a signed-out visitor is not entitled to.
      */}
      <section aria-labelledby="money-heading" className="full-bleed bg-sheet px-4 py-16 md:px-6">
        <div className="mx-auto max-w-shell">
          <Eyebrow tone="paper">{t('pubStatic.demand.moneyEyebrow')}</Eyebrow>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 id="money-heading" className="max-w-[20ch] font-display text-hero text-ink">
              {t('pubStatic.demand.moneyHeading')}
            </h2>
            <AccountOnlyLink
              to="/transparency"
              className="text-label text-ink underline underline-offset-4 hover:text-verify"
            >
              {t('pubStatic.demand.moneyLink')}
            </AccountOnlyLink>
          </div>

          <WidgetBoundary label={t('pubStatic.demand.moneyBoundary')}>
            <QueryState
              query={stats}
              errorTitle={t('pubStatic.demand.moneyErrorTitle')}
              loading={<StatSkeleton rows={2} />}
            >
              {(payload) => <MoneyPanel payload={payload.data} />}
            </QueryState>
          </WidgetBoundary>

          <p className="mt-8 max-w-doc text-body text-ink-soft">{t('pubStatic.demand.moneyNote')}</p>
        </div>
      </section>

      {/* ============================================== 5. the nine stages
        Numbered, because they genuinely run in order and a case cannot skip one.
      */}
      <section aria-labelledby="stages-heading" className="deep full-bleed bg-deep px-4 py-16 md:px-6">
        <div className="mx-auto max-w-shell">
          <Eyebrow>{t('pubStatic.demand.stagesEyebrow')}</Eyebrow>
          <h2 id="stages-heading" className="max-w-[16ch] font-display text-hero text-deep-ink">
            {t('pubStatic.demand.stagesHeading')}
          </h2>
          <p className="mt-4 max-w-[58ch] text-body text-deep-dim">{t('pubStatic.demand.stagesLead')}</p>

          {/*
            One accent across all nine. The stages are a sequence, not nine
            categories, and colouring them differently implied a difference
            between them that does not exist.

            Read one at a time, with the one behind and the one ahead left on
            screen — which is the whole claim of the section, and something a
            grid of nine equal blocks could not make.
          */}
          <div className="mt-10">
            <CardCarousel
              items={STAGES}
              itemKey={(stage) => stage.id}
              unit="Stage"
              label={t('pubStatic.demand.stagesCarouselLabel')}
              render={(stage, _i, live) => (
                <article className="slab flex h-full flex-col overflow-hidden" data-accent={live ? 'saffron' : 'signal'}>
                  <span aria-hidden className="carousel-rail block w-full" />
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sheet border border-deep-rule bg-deep-2 text-saffron"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          focusable="false"
                        >
                          <path d="M12 6.5V12l3.5 2M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8Z" />
                        </svg>
                      </span>
                      {/* The stage number as a watermark. On the dead rule it
                          measured 1.45 : 1 and was simply not there; the card
                          beside the live one is already at 40% opacity, so it
                          recedes without needing to be invisible up close. */}
                      <span aria-hidden className="type-register text-mega text-deep-dim">
                        {String(stage.index).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-h2 text-deep-ink">
                      <span className="sr-only">{t('pubStatic.demand.srStage', { index: stage.index })} </span>
                      {say(stage.title)}
                    </h3>
                    <p className="mt-3 text-body text-deep-dim">{say(stage.department.happens)}</p>

                    <p className="field-label mt-auto pt-6 !text-deep-dim">
                      {t('pubStatic.demand.stageActorGate', { actor: say(stage.actor), gate: stage.gate })}
                    </p>
                  </div>
                </article>
              )}
            />
          </div>
        </div>
      </section>

      {/* ============================================== 6. the proof */}
      <section aria-labelledby="proof-heading" className="full-bleed border-t border-rule bg-sheet px-4 py-16 md:px-6">
        <div className="mx-auto max-w-shell">
          <Eyebrow tone="paper">{t('pubStatic.demand.proofEyebrow')}</Eyebrow>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 id="proof-heading" className="max-w-[18ch] font-display text-hero text-ink">
              {t('pubStatic.demand.proofHeading')}
            </h2>
            <AccountOnlyLink to="/results" className="text-label text-ink underline underline-offset-4 hover:text-verify">
              {t('pubStatic.demand.readEveryResult')}
            </AccountOnlyLink>
          </div>

          <WidgetBoundary label="the published results">
            <QueryState
              query={results}
              errorTitle={t('pubStatic.demand.resultsErrorTitle')}
              loading={<StatSkeleton rows={4} />}
              isEmpty={(d) => d.data.length === 0}
              empty={{
                title: t('pubStatic.demand.proofEmptyTitle'),
                body: t('pubStatic.demand.proofEmptyBody'),
                /* Not the challenge register: it needs an account, and an empty
                   state that offers a locked door is worse than one that offers
                   nothing. How-it-works is open to anyone. */
                action: { label: t('pubStatic.demand.learnHowItWorks'), to: '/how-it-works' },
              }}
            >
              {(payload) => <ProofWall rows={payload.data} />}
            </QueryState>
          </WidgetBoundary>

          {stats.data ? (
            <div className="mt-10">
              <FreshnessLine servedAt={stats.data.servedAt} onRefresh={() => void stats.refetch()} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ============================================== 7. the way in */}
      <section className="deep full-bleed border-t border-deep-rule bg-deep px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 className="max-w-[20ch] font-display text-hero text-deep-ink">
              {t('pubStatic.demand.reliefHeading')}
            </h2>
            <p className="mt-4 max-w-[56ch] text-body text-deep-dim">{t('pubStatic.demand.reliefLead')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="press inline-flex h-12 items-center rounded-pill bg-signal px-6 text-body font-semibold text-deep no-underline shadow-signal"
            >
              {t('pubStatic.demand.createAccount')}
            </Link>
            <Link
              to="/how-it-works"
              className="swift inline-flex h-12 items-center rounded-pill border border-deep-rule px-6 text-body text-deep-ink no-underline hover:border-saffron hover:text-saffron"
            >
              {t('pubStatic.demand.gatesLink')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------- featured notice */

/* -------------------------------------------------------------- the proof */

/*
 * What this page is entitled to.
 *
 * Signed out, /api/results answers with the outcome and an id and nothing else
 * — the projection is decided on the server, not here. This type used to
 * declare the company and the challenge title as well, which it never read;
 * a type that claims more than the payload carries is how identifying data
 * ends up on a public page by accident.
 */
interface ResultRow {
  id: string;
  outcome?: string | null;
}

/**
 * The proportion of finished pilots that reproduced their claim.
 *
 * A pie, because the question is what share of the whole each finding took,
 * and there are only three findings a validator can sign. The list beside it
 * carries the same numbers in words, so the answer survives without colour.
 */

/**
 * What has been committed, and how fast it is actually paid.
 *
 * Two figures, because they answer two different questions and neither answers
 * the other: the money says how serious the programme is, and the clock says
 * whether a small supplier can survive taking part in it. The second is the one
 * a startup asks first and the one a procurement site almost never publishes.
 *
 * The bar is decorative and marked so. It is a second reading of the same two
 * numbers written beneath it, because a rule that carries meaning only in its
 * colour and its position is unreadable to a good share of the people this
 * programme exists to reach.
 */
function MoneyPanel({ payload }: { payload: TransparencyPayload }) {
  const { t } = useTranslation();
  const h = payload.headline;
  const m = payload.medians;

  /* Over the limit the marker pins to the end and turns, rather than running
     off the rule. A bar that overflows says less than one that stops. */
  const over = m.acceptanceToPaymentDays > m.limitDays;
  const at = Math.min(100, Math.round((m.acceptanceToPaymentDays / Math.max(1, m.limitDays)) * 100));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="rounded-block border border-rule bg-ledger p-6 shadow-sheet md:p-8">
        <p className="field-label">{t('pubStatic.demand.moneyCommitted')}</p>
        <p className="mt-2 font-display text-hero tnum text-ink">{moneyScaled(h.committedPaise)}</p>
        <p className="mt-3 max-w-[34ch] text-body text-ink-soft">
          {t('pubStatic.demand.moneyReach', {
            departments: h.departments,
            districts: h.districts,
            pilots: h.activePilots,
          })}
        </p>
      </div>

      <div className="rounded-block border border-rule bg-ledger p-6 shadow-sheet md:p-8">
        <p className="field-label">{t('pubStatic.demand.clockLabel')}</p>

        <div aria-hidden className="relative mt-6 h-2 rounded-pill bg-rule">
          <span
            className={['absolute inset-y-0 left-0 block rounded-pill', over ? 'bg-seal' : 'bg-verify'].join(' ')}
            style={{ width: `${at}%` }}
          />
          <span
            className={[
              'absolute top-1/2 block h-4 w-4 rounded-pill border border-sheet',
              over ? 'bg-seal' : 'bg-verify',
            ].join(' ')}
            style={{ left: `${at}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className={['font-display text-h2 tnum', over ? 'text-seal' : 'text-verify'].join(' ')}>
            {t('pubStatic.demand.clockMedian', { days: m.acceptanceToPaymentDays })}
          </p>
          <p className="text-micro tnum text-ink-soft">
            {t('pubStatic.demand.clockLimit', { days: m.limitDays })}
          </p>
        </div>

        <p className="mt-4 border-t border-rule pt-4 text-body text-ink-soft">
          {t('pubStatic.demand.clockTimeliness', { percent: m.paymentTimelinessPercent })}
        </p>
      </div>
    </div>
  );
}

function ProofWall({ rows }: { rows: readonly ResultRow[] }) {
  const { t } = useTranslation();
  const count = (key: string): number => rows.filter((r) => (r.outcome ?? 'not_validated') === key).length;

  const slices = [
    {
      key: 'validated' as const,
      label: t('pubStatic.demand.outcomeReproduced'),
      detail: t('pubStatic.demand.outcomeReproducedDetail'),
      count: count('validated'),
      colour: 'var(--verify)',
    },
    {
      key: 'validated_with_qualifications' as const,
      label: t('pubStatic.demand.outcomeQualified'),
      detail: t('pubStatic.demand.outcomeQualifiedDetail'),
      count: count('validated_with_qualifications'),
      colour: 'var(--hold)',
    },
    {
      key: 'not_validated' as const,
      label: t('pubStatic.demand.outcomeNotReproduced'),
      detail: t('pubStatic.demand.outcomeNotReproducedDetail'),
      count: count('not_validated'),
      colour: 'var(--seal)',
    },
  ];

  return (
    <div className="rounded-block border border-rule bg-ledger p-6 shadow-sheet md:p-10">
      <OutcomePie slices={slices} />

      <p className="mt-8 border-t border-rule pt-4 text-micro text-ink-soft">
        {t('pubResults.results.shape.note')}
      </p>
    </div>
  );
}
