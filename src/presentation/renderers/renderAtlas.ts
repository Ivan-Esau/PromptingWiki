import {
  buildAtlasSnapshot,
  type AtlasFilters,
  type AtlasNodeViewModel,
  type AtlasPaperDetail,
  type AtlasSnapshot
} from '../../application/usecases/buildAtlasSnapshot';
import { PAPER_TOPIC_LABELS, type PaperTopic } from '../../domain/models/paper';
import type { PaperRepository } from '../../infrastructure/repositories/paperRepository';

interface AtlasState extends AtlasFilters {}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function topicName(topic: PaperTopic): string {
  return PAPER_TOPIC_LABELS[topic] ?? topic;
}

function formatScore(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatTopicChips(topics: PaperTopic[]): string {
  return topics
    .map((topic) => `<span class="chip">${escapeHtml(topicName(topic))}</span>`)
    .join('');
}

function renderTimeline(snapshot: AtlasSnapshot, selectedPaperId?: string): string {
  if (snapshot.timeline.length === 0) {
    return '<p class="empty">No papers match the current filters.</p>';
  }

  return snapshot.timeline
    .map(
      (group) => `
        <article class="timeline-group">
          <h3 class="timeline-year">${group.year}</h3>
          <div class="paper-list">
            ${group.papers
              .map(
                (paper) => `
                  <button
                    class="paper-item ${paper.id === selectedPaperId ? 'selected' : ''}"
                    type="button"
                    data-select-paper="${paper.id}"
                  >
                    <h4 class="title">${escapeHtml(paper.title)}</h4>
                    <div class="meta">${escapeHtml(paper.venue)} · Influence ${formatScore(paper.influenceScore)}</div>
                    <div class="chip-row">${formatTopicChips(paper.topics)}</div>
                  </button>
                `
              )
              .join('')}
          </div>
        </article>
      `
    )
    .join('');
}

function renderYearGuides(nodes: AtlasNodeViewModel[]): string {
  const yearX = new Map<number, number>();

  for (const node of nodes) {
    if (!yearX.has(node.year)) {
      yearX.set(node.year, node.x);
    }
  }

  return [...yearX.entries()]
    .sort((left, right) => left[0] - right[0])
    .map(
      ([year, x]) => `
        <line x1="${x}" y1="20" x2="${x}" y2="540" stroke="#dce6eb" stroke-width="1" />
        <text x="${x}" y="16" text-anchor="middle" fill="#6b808d" font-family="JetBrains Mono, monospace" font-size="10">${year}</text>
      `
    )
    .join('');
}

function renderGraph(snapshot: AtlasSnapshot, selectedPaperId?: string): string {
  if (snapshot.graphNodes.length === 0) {
    return '<p class="empty">No graph nodes to render for the current filter.</p>';
  }

  const nodeById = new Map(snapshot.graphNodes.map((node) => [node.id, node]));

  const edges = snapshot.graphEdges
    .map((edge) => {
      const source = nodeById.get(edge.sourceId);
      const target = nodeById.get(edge.targetId);
      if (!source || !target) {
        return '';
      }

      const width = edge.kind === 'cites' ? 1.25 : Math.min(1.1 + edge.weight * 0.42, 2.5);
      return `
        <line
          class="graph-edge ${edge.kind}"
          x1="${source.x}"
          y1="${source.y}"
          x2="${target.x}"
          y2="${target.y}"
          style="stroke-width:${width}"
        />
      `;
    })
    .join('');

  const nodes = snapshot.graphNodes
    .map((node) => {
      const selectedClass = node.id === selectedPaperId ? 'selected' : '';
      const shortTitle = node.title.length > 34 ? `${node.title.slice(0, 31)}...` : node.title;
      const ariaLabel = `${node.title}, ${node.year}`;

      return `
        <g class="graph-node ${selectedClass}" transform="translate(${node.x}, ${node.y})" data-select-paper="${node.id}" role="button" tabindex="0" aria-label="${escapeHtml(ariaLabel)}">
          <circle class="node-core" r="${node.radius}" />
          <text text-anchor="middle" y="${node.radius + 12}">${escapeHtml(shortTitle)}</text>
        </g>
      `;
    })
    .join('');

  return `
    <div class="graph-wrap">
      <svg viewBox="0 0 1120 560" aria-label="Paper relationship graph">
        ${renderYearGuides(snapshot.graphNodes)}
        ${edges}
        ${nodes}
      </svg>
    </div>
  `;
}

function renderPaperList(items: Array<{ id: string; title: string; venue: string; influenceScore: number }>): string {
  if (items.length === 0) {
    return '<p class="empty">None in the current corpus subset.</p>';
  }

  return `
    <ol class="ref-list">
      ${items
        .map(
          (item) => `
            <li>
              <button type="button" data-select-paper="${item.id}" class="paper-link-button">${escapeHtml(item.title)}</button>
              <small> · ${escapeHtml(item.venue)} · ${formatScore(item.influenceScore)}</small>
            </li>
          `
        )
        .join('')}
    </ol>
  `;
}

function renderDetail(detail: AtlasPaperDetail | undefined): string {
  if (!detail) {
    return '<p class="empty">Select a paper from the timeline or graph to inspect its references.</p>';
  }

  const doiMarkup = detail.doi
    ? `<div><strong>DOI:</strong> ${escapeHtml(detail.doi)}</div>`
    : '';

  return `
    <article>
      <h2>${escapeHtml(detail.title)}</h2>
      <p class="detail-meta">${detail.year} · ${escapeHtml(detail.venue)} · ${detail.authors.map((author) => escapeHtml(author)).join(', ')}</p>
      <p>${escapeHtml(detail.summary)}</p>
      <div class="chip-row">${formatTopicChips(detail.topics)}</div>
      <div class="score-row">
        <span class="score-pill">Influence ${formatScore(detail.influenceScore)}</span>
        <span class="score-pill">Origin ${formatScore(detail.originScore)}</span>
      </div>
      <div class="detail-meta">
        <div><strong>Primary Source:</strong> <a href="${escapeHtml(detail.url)}" target="_blank" rel="noreferrer">Open paper</a></div>
        ${doiMarkup}
      </div>
      <div class="detail-columns">
        <section>
          <h3>References</h3>
          ${renderPaperList(detail.references)}
        </section>
        <section>
          <h3>Cited By</h3>
          ${renderPaperList(detail.citedBy)}
        </section>
      </div>
    </article>
  `;
}

function renderTopicBridges(snapshot: AtlasSnapshot): string {
  if (snapshot.topicBridges.length === 0) {
    return '<p class="empty">No topic bridges available.</p>';
  }

  return `
    <div class="bridges-grid">
      ${snapshot.topicBridges
        .map(
          (bridge) => `
            <article class="bridge">
              <strong>${escapeHtml(topicName(bridge.left))} ↔ ${escapeHtml(topicName(bridge.right))}</strong>
              <small>${bridge.count} papers connect these topics.</small>
            </article>
          `
        )
        .join('')}
    </div>
  `;
}

function renderAppMarkup(snapshot: AtlasSnapshot, state: AtlasState): string {
  const topicOptions = [
    '<option value="all">All topics</option>',
    ...snapshot.availableTopics.map(
      (stat) =>
        `<option value="${stat.topic}" ${state.topic === stat.topic ? 'selected' : ''}>${escapeHtml(
          topicName(stat.topic)
        )} (${stat.count})</option>`
    )
  ].join('');

  return `
    <div class="atlas-shell">
      <section class="hero card">
        <h1>AI Research Atlas</h1>
        <p>
          A linear scientific library for prompting, LLM, and agentic systems research.
          The graph overlays citation links and topic overlaps so origin papers and high-impact bridges are easy to trace.
        </p>
        <div class="stat-row">
          <article class="stat">
            <div class="label">Papers</div>
            <div class="value">${snapshot.stats.visiblePapers} / ${snapshot.stats.totalPapers}</div>
          </article>
          <article class="stat">
            <div class="label">Years</div>
            <div class="value">${snapshot.stats.yearStart} - ${snapshot.stats.yearEnd}</div>
          </article>
          <article class="stat">
            <div class="label">Citation Edges</div>
            <div class="value">${snapshot.stats.citationEdges}</div>
          </article>
          <article class="stat">
            <div class="label">Topic Edges</div>
            <div class="value">${snapshot.stats.topicEdges}</div>
          </article>
        </div>
      </section>

      <section class="card control-bar">
        <div class="field">
          <label for="query-filter">Search by title, author, topic, or venue</label>
          <input id="query-filter" name="query-filter" placeholder="e.g. chain-of-thought, alignment, benchmark" value="${escapeHtml(
            state.query
          )}" />
        </div>
        <div class="field">
          <label for="topic-filter">Topic</label>
          <select id="topic-filter" name="topic-filter">${topicOptions}</select>
        </div>
        <div class="field">
          <label for="relation-filter">Graph relation mode</label>
          <select id="relation-filter" name="relation-filter">
            <option value="all" ${state.relation === 'all' ? 'selected' : ''}>Citations + topic overlap</option>
            <option value="citations" ${state.relation === 'citations' ? 'selected' : ''}>Citations only</option>
          </select>
        </div>
      </section>

      <section class="graph-panel card">
        <h2>Citation + Topic Graph</h2>
        <div class="graph-legend">
          <span><span class="legend-line" style="background:#5f7c8a;"></span>Citation edge</span>
          <span><span class="legend-line" style="background:#c4a174;"></span>Topic overlap edge</span>
          <span><span class="legend-dot" style="background:#fff0e8;border:1px solid #b94825;"></span>Selected paper</span>
        </div>
        ${renderGraph(snapshot, snapshot.selectedPaper?.id)}
      </section>

      <section class="timeline-panel card">
        <h2>Linear Timeline</h2>
        <div class="timeline">
          ${renderTimeline(snapshot, snapshot.selectedPaper?.id)}
        </div>
      </section>

      <section class="detail-panel card">
        <h2>Paper Detail</h2>
        ${renderDetail(snapshot.selectedPaper)}
      </section>

      <section class="bridges-panel card">
        <h2>Topic Bridges</h2>
        <p class="detail-meta">Top recurring co-occurrences across the corpus. Useful for connecting prompt topics to agentic design patterns.</p>
        ${renderTopicBridges(snapshot)}
      </section>
    </div>
  `;
}

export async function renderAtlasApp(root: HTMLElement, repository: PaperRepository): Promise<void> {
  const papers = await repository.listPapers();
  const state: AtlasState = {
    query: '',
    topic: 'all',
    relation: 'all',
    selectedPaperId: papers[0]?.id
  };

  const render = (): void => {
    const snapshot = buildAtlasSnapshot(papers, state);
    state.selectedPaperId = snapshot.selectedPaper?.id;
    root.innerHTML = renderAppMarkup(snapshot, state);

    const queryInput = root.querySelector<HTMLInputElement>('#query-filter');
    const topicSelect = root.querySelector<HTMLSelectElement>('#topic-filter');
    const relationSelect = root.querySelector<HTMLSelectElement>('#relation-filter');

    queryInput?.addEventListener('input', (event) => {
      const nextQuery = (event.currentTarget as HTMLInputElement).value;
      state.query = nextQuery;
      render();
    });

    topicSelect?.addEventListener('change', (event) => {
      const nextTopic = (event.currentTarget as HTMLSelectElement).value;
      state.topic = nextTopic as AtlasState['topic'];
      render();
    });

    relationSelect?.addEventListener('change', (event) => {
      const nextRelation = (event.currentTarget as HTMLSelectElement).value;
      state.relation = nextRelation as AtlasState['relation'];
      render();
    });

    for (const element of root.querySelectorAll<HTMLElement>('[data-select-paper]')) {
      const paperId = element.dataset.selectPaper;
      if (!paperId) {
        continue;
      }

      element.addEventListener('click', () => {
        state.selectedPaperId = paperId;
        render();
      });

      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          state.selectedPaperId = paperId;
          render();
        }
      });
    }
  };

  render();
}
