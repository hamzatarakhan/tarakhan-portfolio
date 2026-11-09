// Page <title> and description (what Next's generateMetadata did). Pages call this in an effect.
export function setMeta(title: string, description?: string, noindex = false) {
  document.title = title;
  const tag = (name: string) => {
    let m = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!m) {
      m = document.createElement("meta");
      m.name = name;
      document.head.appendChild(m);
    }
    return m;
  };
  if (description) tag("description").content = description;
  if (noindex) tag("robots").content = "noindex";
  else document.querySelector('meta[name="robots"]')?.remove();
}
