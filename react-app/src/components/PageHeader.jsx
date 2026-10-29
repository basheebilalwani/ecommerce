function PageHeader({ title, subtitle }) {
  if (!title) {
    console.warn('PageHeader: title prop is required');
    return null;
  }

  return (
    <section id="page-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </section>
  );
}

export default PageHeader;
