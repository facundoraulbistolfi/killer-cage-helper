import { getCageCombinations, type CageQuery } from './lib/cage';

export function createApp(root: HTMLElement): void {
  root.innerHTML = `
    <main class="page-shell">
      <section class="panel hero-panel">
        <p class="eyebrow">Killer Sudoku</p>
        <h1>Killer Cage Helper</h1>
        <p class="hero-copy">
          Explore valid cage combinations from a target sum, a cell count, and optional digit filters.
        </p>
      </section>

      <section class="panel">
        <form id="cage-form" class="form-grid">
          <label>
            <span>Target sum</span>
            <input id="sum" name="sum" type="number" min="1" max="45" step="1" value="10" />
          </label>

          <label>
            <span>Cell count</span>
            <input id="cells" name="cells" type="number" min="1" max="9" step="1" value="2" />
          </label>

          <label>
            <span>Allowed digits (optional)</span>
            <input
              id="allowed-digits"
              name="allowed-digits"
              type="text"
              inputmode="numeric"
              placeholder="1,2,3,4,5,6,7,8,9"
            />
          </label>

          <label>
            <span>Excluded digits (optional)</span>
            <input
              id="excluded-digits"
              name="excluded-digits"
              type="text"
              inputmode="numeric"
              placeholder="1,2,3"
            />
          </label>

          <button type="submit">Calculate combinations</button>
        </form>
      </section>

      <section id="results" class="panel results-panel"></section>
    </main>
  `;

  const form = root.querySelector<HTMLFormElement>('#cage-form');
  const results = root.querySelector<HTMLElement>('#results');
  const sumInput = root.querySelector<HTMLInputElement>('#sum');
  const cellsInput = root.querySelector<HTMLInputElement>('#cells');
  const allowedDigitsInput = root.querySelector<HTMLInputElement>('#allowed-digits');
  const excludedDigitsInput = root.querySelector<HTMLInputElement>('#excluded-digits');

  if (!form || !results || !sumInput || !cellsInput || !allowedDigitsInput || !excludedDigitsInput) {
    throw new Error('App controls could not be initialized.');
  }

  const renderResults = (): void => {
    try {
      const query: CageQuery = {
        sum: Number(sumInput.value),
        cells: Number(cellsInput.value),
        digits: parseDigitList(allowedDigitsInput.value),
        excludedDigits: parseDigitList(excludedDigitsInput.value),
      };

      const combinations = getCageCombinations(query);
      const countLabel = combinations.length === 1 ? 'combination' : 'combinations';
      const cellLabel = query.cells === 1 ? 'cell' : 'cells';
      const renderedCombinations = combinations.length
        ? `
          <ol class="combo-list">
            ${combinations
              .map(
                (combination) =>
                  `<li><code>${combination.join(' + ')}</code><span>= ${query.sum}</span></li>`,
              )
              .join('')}
          </ol>
        `
        : '<p class="empty-state">No valid combinations for the current filters.</p>';

      results.innerHTML = `
        <div class="results-header">
          <div>
            <p class="eyebrow">Results</p>
            <h2>${combinations.length} ${countLabel}</h2>
          </div>
          <p class="query-summary">${query.cells} ${cellLabel} · sum ${query.sum}</p>
        </div>
        ${renderedCombinations}
      `;
    } catch (error) {
      results.innerHTML = `<p class="error-message">${formatError(error)}</p>`;
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderResults();
  });

  renderResults();
}

function parseDigitList(value: string): number[] | undefined {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  const digits = trimmedValue.split(',').map((segment) => Number(segment.trim()));

  if (digits.some((digit) => Number.isNaN(digit))) {
    throw new Error('Digit filters must be a comma-separated list like 1,2,3.');
  }

  return digits;
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : 'Unexpected error.';
}
