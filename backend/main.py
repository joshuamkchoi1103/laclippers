from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from nba_api.stats.endpoints import commonteamroster
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Clippers team ID (2024-25 season)
CLIPPERS_TEAM_ID = 1610612746

@app.get("/api/roster")
def get_clippers_roster():
    try:
        time.sleep(1)  # Rate limit
        roster_response = commonteamroster.CommonTeamRoster(team_id=CLIPPERS_TEAM_ID)
        data = roster_response.get_normalized_dict()

        if "CommonTeamRoster" not in data:
            return JSONResponse(status_code=500, content={"error": "Roster data not available"})

        raw_players = data["CommonTeamRoster"]

        players = [
            {
                "id": player.get("PLAYER_ID", "0"),
                "age": player.get("AGE", "N/A"),
                "name": f"{player.get('PLAYER', 'Unknown')}",
                "position": player.get("POSITION", "N/A"),
                "number": player.get("NUM", "N/A"),
                "height": player.get("HEIGHT", "N/A"),
                "weight": player.get("WEIGHT", "N/A"),
                "college": player.get("SCHOOL", "N/A"),
                "experience": player.get("EXP", "N/A"),
            }
            for player in raw_players
        ]


        return JSONResponse(content=players)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
