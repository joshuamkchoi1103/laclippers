// src/types/player.ts
export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  jersey_number: string;
  team: {
    full_name: string;
    abbreviation: string;
  };
}
