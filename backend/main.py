from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.static import teams
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_clippers_team_id():
    clippers = [team for team in teams.get_teams() if team["abbreviation"] == "LAC"]
    return clippers[0]["id"] if clippers else None

@app.get("/api/roster")
def get_clippers_roster():
    try:
        team_id = get_clippers_team_id()
        if not team_id:
            return JSONResponse(status_code=404, content={"error": "Clippers team not found"})

        # NBA API sometimes blocks rapid requests; simulate human behavior
        time.sleep(1.5)

        data = commonteamroster.CommonTeamRoster(team_id=team_id, season="2024-25")
        df = data.get_data_frames()[0]

        players = []
        for _, row in df.iterrows():
            player_id = row["PLAYER_ID"]
            image_url = f"https://cdn.nba.com/headshots/nba/latest/1040x760/{player_id}.png"

            players.append({
                "id": str(player_id),
                "name": row["PLAYER"],
                "number": str(row["NUM"]),
                "position": row["POSITION"],
                "height": row["HEIGHT"],
                "weight": row["WEIGHT"],
                "college": row["SCHOOL"],
                "birth_date": row["BIRTH_DATE"],
                "experience": row["EXP"],
                "image": image_url
            })

        return JSONResponse(content={"players": players, "coaches": []})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
