# HEY! Die Nachbarschaftsjob App - Umsetzung mit Progressive Web Apps

Dieses Projekt beruht auf den Vorlesungsmaterialien des Studienmoduls "Aktuelle Trends der IKT 2022" an der HTW Berlin - Studiengang FIW. Auf der Basis des zur Verfügung gestellten Codes entstand durch Anpassungen der Funktionalitäten und des Designs eine *Progressive Web Application*, die dem Vermitteln von Jobs in der Nachbarschaft der User imitieren soll. 

## Installation

Voraussetzung zum Ausführen des Projektes ist die vorherige Installation von [Node.js](https://nodejs.org) auf dem Rechner.

Umgesetzt wurde das Projekt in der IDE "Studio Visual Code". Welche IDE beim Einlesen oder Bearbeiten des Codes verwenden wird, sei den Entwickler:innen überlassen.

Um das Projektzu starten, gehe in den Terminal Zum Starten des Projektes wechseln Sie im Terminal (Terminal Ihres Rechners oder das Terminal in der IDE) in den Projektordner (`cd IKT-PWA-01`) und führen dort 

	`npm install` 

	aus (es genügt auch `npm i`). Damit werden alle erforderlichen Abhängigkeiten installiert. Es entsteht der `node_modules`-Ordner. 

- Nach erfolgreicher Installation der Abhängigkeiten, geben Sie  

	`npm start` 

	ein, um Ihr Projekt auszuführen (Es wird der `http-server` mit der Option `-c-1` gestartet. Diese Option disabled Caching). Klicken Sie danach auf [localhost:8080](http://localhost:8080) oder geben Sie die URL direkt in Ihren Browser ein.

- Sollten Sie Änderungen an der IMplementierung vornehmen und diese ausprobieren wollen, müssen Sie den Server zunächst wieder stoppen:

	`Ctrl-C`

	und geben dann erneut 

	`npm start` 

	ein. 