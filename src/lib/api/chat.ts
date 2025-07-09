/**
 * 2 July 2025
 * The axios can't handle streaming response, so we use fetch instead.
 */
export async function giveInstructions(instruction: string, selected_files: string[], stream: boolean = false) {
  const queryParams = new URLSearchParams({
    instruction,
    stream: stream ? 'true' : 'false',
  });
  return await fetch(`http://localhost:8000/generate/?${queryParams.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selected_files),
  });
}

export async function createArticle(selected_files: string[]) {
  const response = await fetch('http://localhost:8000/generate/article/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selected_files),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create article: ${errorText}`);
  }

  return await response.json();
}