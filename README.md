# 1 Chat - Frontend

Unser Fokus liegt bei dieser Anwendung auf **einfacher Ausführbarkeit** beziehungsweise auf **einfachem Deployment**. Daher wird Docker zum Deployment genutzt. Dadurch kann die Anwendung mit minimalem Aufwand auf jedem System ausgeführt werden, auf dem **Docker** und **Docker Compose** installiert ist 

## Installationsanleitung

Die Anwendung kann mit Docker installiert werden. Zum Starten und Testen auf dem Localhost sind die URLs schon angepasst, es müssen nur die beiden Repos geklont werden. Die Daten, die in der Datenbank gespeichert werden, sind über ein Docker Volume in den Container eingebunden. Somit werden die Daten nicht im Container sondern im Volume gespeichert. Das bedeutet, dass der Container für die Datenbank bei Bedarf im späteren Verlauf auf eine neuere Version der Datenbank (hier: MongoDB) aktualisiert werden kann, ohne dass die Daten verloren gehen.

```shell
mkdir einsChat &&
cd einsChat &&
git clone https://github.com/eins-chat/frontend.git &&
git clone https://github.com/eins-chat/backend.git &&
cd frontend &&
docker compose up --build
```

Zur Installation auf einem Server müssen die URLs in der Docker Compose Datei und die `environment.prod.ts` angepasst werden. In der `environment.prod.ts` müssen für das Frontend die URLs für den Server und den Websocket angepasst werden. In der Docker Compose Datei muss die URL für den Server für die CORS-Einstellungen angepasst werden.

```shell
mkdir einsChat &&
cd einsChat &&
git clone https://github.com/eins-chat/frontend.git &&
git clone https://github.com/eins-chat/backend.git &&
cd frontend &&
vim docker-compose.yml &&
vim src/environments/environment.prod.ts &&
docker compose up --build
```

Zum Testen muss für jeden eingeloggten Account ein eigenes Browserfenster (am besten im Privatmodus) geöffnet werden, da für jeden Account im Local Storage ein JWT gespeichert wird.
Um einen anderen Nutzer zu finden, kann die Suche genutzt werden. Um einen Chat mit einem gefundenen Nutzer zu beginnen, muss auf den Namen des Nutzer geklickt werden. Des weiteren können Gruppen über den entsprechenden Button erstellt werden. Chats werden in einer Datenbank gespeichert und bleiben somit bestehen, auch wenn der Browser geschlossen wird.
