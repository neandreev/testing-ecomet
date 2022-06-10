import { createEffect } from "effector-logger";

export const fetchEpisodes = createEffect(async () => {
  const firstPageUrl = "https://rickandmortyapi.com/api/episode";
  const firstPageReq = await fetch(firstPageUrl);
  const firstPageJson = await firstPageReq.json();
  const availablePages = firstPageJson.info.pages;

  const allPagesResponses = await Promise.all(
    Array.from(Array(availablePages), async (_, i) => {
      const request = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${i + 1}`
      );
      return request.json();
    })
  );

  const allEpisodes = allPagesResponses.reduce(
    (episodes, episodesPage) => [...episodes, ...episodesPage.results],
    []
  );

  return allEpisodes;
});

export const fetchEpisode = createEffect(async (id: string) => {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  const req = await fetch(url);
  return req.json();
});

export const fetchCharacters = createEffect(async (charactersUrls: string[]) => {
  const allData = await Promise.all(charactersUrls.map(async (characterUrl) => {
    const req = await fetch(characterUrl);
    return req.json();
  }));

  return allData;
});

