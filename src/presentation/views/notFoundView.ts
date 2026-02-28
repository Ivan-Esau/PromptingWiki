export function renderNotFoundView(): string {
  return `
    <section class="section-intro">
      <p class="eyebrow">Not Found</p>
      <h1>The requested page does not exist.</h1>
      <p>Use the section navigation to continue browsing the wiki.</p>
      <a href="#/" class="action primary">Back to Home</a>
    </section>
  `;
}
