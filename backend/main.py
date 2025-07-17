import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/roster")
def get_clippers_roster():
    try:
        url = "https://www.basketball-reference.com/teams/LAC/2026.html"
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, "html.parser")

        # Parse players
        roster_table = soup.find("table", {"id": "roster"})
        players = []

        for row in roster_table.tbody.find_all("tr"):
            cols = row.find_all("td")
            if not cols:
                continue

            # Get player profile URL
            player_link_tag = row.find("th").find("a")
            player_name = player_link_tag.text if player_link_tag else row.find("th").text
            player_url = "https://www.basketball-reference.com" + player_link_tag['href'] if player_link_tag else None

            # Default image
            player_img = None

            # If profile URL exists, scrape headshot
            if player_url:
                try:
                    profile_res = requests.get(player_url, headers=headers)
                    profile_soup = BeautifulSoup(profile_res.text, "html.parser")
                    img_tag = profile_soup.select_one("#meta img")
                    if img_tag:
                        player_img = "https://www.basketball-reference.com" + img_tag['src']
                except Exception as e:
                    print(f"Failed to load image for {player_name}")

            player = {
                "number": cols[0].text,
                "name": player_name,
                "position": cols[1].text,
                "height": cols[2].text,
                "weight": cols[3].text,
                "birth_date": cols[4].text,
                "college": cols[5].text,
                "experience": cols[6].text,
                "image": player_img
            }
            players.append(player)

        # Parse coaches
        coaches = []
        coaches_header = soup.find("span", string="Coaches")
        if coaches_header:
            coach_table = coaches_header.find_parent("h2").find_next_sibling("div")
            for li in coach_table.find_all("li"):
                name = li.find("a").text if li.find("a") else li.text
                role = li.text.replace(name, "").strip()
                coaches.append({
                    "name": name,
                    "role": role
                })

        return JSONResponse(content={
            "players": players,
            "coaches": coaches
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
