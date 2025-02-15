const API_KEY = process.env.REACT_APP_NBA_API_KEY;
const API_HOST = process.env.REACT_APP_NBA_API_HOST;

interface Game {
  id: number;
  date: string;
  league: string;
  season: number;
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    visitors: {
      id: number;
      name: string;
      logo: string;
    };
  };
  scores: {
    home: number;
    visitors: number;
  };
  status: {
    clock: string;
    halftime: boolean;
    short: number;
    long: string;
  };
}

// Mock data for two upcoming games
const mockGames: Game[] = [
  {
    id: 1,
    date: "2025-02-22",
    league: "NBA",
    season: 2024,
    teams: {
      home: {
        id: 1,
        name: "Los Angeles Lakers",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/220px-Los_Angeles_Lakers_logo.svg.png"
      },
      visitors: {
        id: 2,
        name: "Golden State Warriors",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/200px-Golden_State_Warriors_logo.svg.png"
      }
    },
    scores: {
      home: 0,
      visitors: 0
    },
    status: {
      clock: "",
      halftime: false,
      short: 0,
      long: "Scheduled for 8:30 PM ET"
    }
  },
  {
    id: 2,
    date: "2025-02-23",
    league: "NBA",
    season: 2024,
    teams: {
      home: {
        id: 3,
        name: "Boston Celtics",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/200px-Boston_Celtics.svg.png"
      },
      visitors: {
        id: 4,
        name: "Miami Heat",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/200px-Miami_Heat_logo.svg.png"
      }
    },
    scores: {
      home: 0,
      visitors: 0
    },
    status: {
      clock: "",
      halftime: false,
      short: 0,
      long: "Scheduled for 7:00 PM ET"
    }
  }
];

// Mock data for team players
const mockPlayers = [
  {
    id: 1,
    firstname: "LeBron",
    lastname: "James",
    jersey: 23,
    position: "F",
    stats: {
      points: 25.4,
      rebounds: 7.9,
      assists: 8.1
    }
  },
  {
    id: 2,
    firstname: "Anthony",
    lastname: "Davis",
    jersey: 3,
    position: "F-C",
    stats: {
      points: 24.7,
      rebounds: 12.3,
      assists: 3.4
    }
  },
  {
    id: 3,
    firstname: "Austin",
    lastname: "Reaves",
    jersey: 15,
    position: "G",
    stats: {
      points: 15.6,
      rebounds: 4.2,
      assists: 5.1
    }
  },
  {
    id: 4,
    firstname: "D'Angelo",
    lastname: "Russell",
    jersey: 1,
    position: "G",
    stats: {
      points: 17.8,
      rebounds: 3.1,
      assists: 6.3
    }
  }
];

export const fetchGames = async (date: string): Promise<Game[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock games based on the date
  return mockGames.filter(game => game.date === date);
};

export const fetchTeamPlayers = async (teamId: string): Promise<any[]> => {
  // For now, return mock data
  // In production, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlayers);
    }, 500);
  });
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
