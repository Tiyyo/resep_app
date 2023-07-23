export function extractEntityNameFromUrl(url: string): string {
  const urlParts = url.split("/");
  urlParts.shift();
  const startUpdateUrl = urlParts
    .map((p, index) => {
      if (index === urlParts.length - 1) return "update/" + p;
      return p;
    })
    .join("/");
  return startUpdateUrl;
}
