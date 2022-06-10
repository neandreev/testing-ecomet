export type EpisodeI = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type EpisodeForSortI = {
  id: number;
  name: string;
  air_date: Date;
  seasonEpisodeNumber: number;
  amountOfCharacters: number;
};

export interface tableStateI {
  sortBy: sortByI;
  sortType: sortTypeI;
  tables: {
    id: {
      visibleName: string;
      isVisible: boolean;
    };
    name: {
      visibleName: string;
      isVisible: boolean;
    };
    air_date: {
      visibleName: string;
      isVisible: boolean;
    };
    seasonEpisodeNumber: {
      visibleName: string;
      isVisible: boolean;
    };
    amountOfCharacters: {
      visibleName: string;
      isVisible: boolean;
    };
  };
}

export type CharacterI = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type TableHeadersI = keyof tableStateI["tables"];

export type sortByI = TableHeadersI | null;
export type sortTypeI = "ascending" | "descending" | null;
