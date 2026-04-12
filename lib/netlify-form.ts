/** Submit to Netlify Forms via encoded POST (works with App Router client forms). */
export async function submitNetlifyForm(
  formName: string,
  form: HTMLFormElement,
): Promise<Response> {
  const fd = new FormData(form);
  fd.set("form-name", formName);
  const params = new URLSearchParams();
  for (const [key, value] of fd.entries()) {
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
}
