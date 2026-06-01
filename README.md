# "The Multimedia Chrono-Capture"

## Avaluació exclusiva: RA2 · RA3

## PART I 

---

### 🌀 CONTEXT NARRATIU

La Simulació s'ha fragmentat en capes temporals inestables. En cadascuna d'aquestes capes sorgeixen **Anomalies de Cronos**: entitats que vibren a freqüències irregulars, emeten ressonàncies sonores i deixen rastre de les seves coordenades espai-temporals. Si no es capturen i s'emmagatzemen de manera permanent, desapareixeran quan el sistema es reiniciï i el Buit guanyarà terreny irreversiblement.

Tu ets l'operador del **Capturador de Cronos**, un dispositiu de camp dissenyat per detectar, capturar i registrar de manera permanent cadascuna d'aquestes anomalies. El dispositiu ha de funcionar en terminals mòbils de camp —pantalles tàctils, sense teclat— i ha de ser capaç de llegir el moviment físic del dispositiu per orientar el visor de detecció.

**Cada anomalia capturada queda registrada per sempre. Cada anomalia perduda és una bretxa en la Simulació.**

---

### 📋 INFORMACIÓ GENERAL

|Paràmetre|Valor|
|---|---|
|**Durada total**|3 hores exactes|
|**Modalitat**|100% pràctica, individual|
|**Tecnologia principal**|Phaser 3 (versió ≥ 3.60)|
|**Entorn permès**|VS Code + Live Server o editor local. **Cap eina d'IA generativa.**|
|**Materials permesos**|Documentació oficial de Phaser 3 (offline o web oficial), apunts propis en paper|
|**Lliurament**|Carpeta `.zip` amb nom `NOM_COGNOM_ExtraRADOS_MMRM.zip` pujada a l'aula virtual en el temps indicat|
|**RA avaluats**|RA2 [24.2, 24.4, 24.6, 24.8] · RA3 [25.2, 25.5, 25.6, 25.7]|

---

### 🎯 DESCRIPCIÓ DEL PROJECTE: "CAPTURADOR DE CRONOS"

Has de construir una **aplicació interactiva** en Phaser 3 que simuli un dispositiu de captura d'anomalies temporals. L'aplicació ha de complir **totes** les especificacions tècniques descrites a continuació, organitzades en tres grans blocs funcionals.

L'estructura de fitxers mínima és la següent:

text

```
/
├── index.html
├── assets/
│   ├── audio/
│   │   ├── ambient.ogg
│   │   ├── capture.ogg
│   │   ├── error.ogg
│   │   └── pulse.ogg
│   └── sprites/
│       ├── visor.png          ← spritesheet del visor (jugador)
│       ├── anomaly.png        ← spritesheet de l'anomalia
│       └── particle.png       ← textura de partícula simple
├── src/
│   ├── main.js
│   ├── config.js
│   ├── scenes/
│   │   ├── ScanScene.js       ← escena principal
│   │   └── LogScene.js        ← escena del registre de captures
│   ├── objects/
│   │   ├── Visor.js           ← classe del visor (controlat per l'usuari)
│   │   └── Anomaly.js         ← classe de l'anomalia
│   └── services/
│       ├── StorageService.js  ← tota la lògica de localStorage
│       └── AudioService.js    ← tota la lògica d'àudio adaptatiu
└── README.md
```

> ⚠️ **L'estructura de fitxers és obligatòria.** Un lliurament que no la respecti té una penalització de **–1 punt** sobre la nota final i no pot superar el **6.9**.

---

### 🔧 ESPECIFICACIONS TÈCNIQUES OBLIGATÒRIES

---

#### BLOC A — GESTIÓ D'INPUT MÒBIL I SENSORS (RA2 · CE: 24.2, 24.4)

**A1 — Configuració del viewport mòbil**

El fitxer `index.html` ha de contenir la metaetiqueta de viewport correcta i el joc ha d'usar:

- Mode d'escala: `Phaser.Scale.FIT`
- Resolució base: **480 × 854 px** (format portrait mòbil)
- Alineació: centrada vertical i horitzontalment

**A2 — Controls tàctils: Gests de captura**

Implementa un sistema de **gest de lliscament (_swipe_)** per capturar anomalies. Les regles del gest són:

- L'usuari ha de prémer sobre una anomalia (`pointerdown` sobre l'sprite de l'anomalia) i lliscar el dit en qualsevol direcció un mínim de **80 píxels lògics** (`pointermove`).
- En alliberar el dit (`pointerup`), si la distància és ≥ 80 px i la velocitat del gest és suficient (veure A3), es dispara la **seqüència de captura**.
- Si la distància és < 80 px o es fa el gest sobre un espai buit, es dispara la **seqüència d'error**.
- Ha d'existir un indicador visual del gest en curs: una línia o traça que es dibuixa en temps real des del punt d'inici fins al dit (usant l'API `Graphics` de Phaser).

**A3 — Velocitat del gest**

La velocitat del gest es calcula com:

text

```
velocitat = distància / temps_del_gest_en_ms * 1000
```

La captura és exitosa si `velocitat > 200` (píxels/segon). Mostra la velocitat calculada en pantalla per als últims 2 segons (debug HUD visible).

**A4 — Sensor d'acceleròmetre (Input de moviment)**

Implementa la lectura de l'acceleròmetre del dispositiu per moure el **Visor de Detecció** per la pantalla:

- Usa l'event de la Web API: `window.addEventListener('devicemotion', callback)`.
- Els valors `acceleration.x` i `acceleration.y` han de translladar-se a una velocitat del Visor (escala recomanada: `velocitat = valor_accel * 15`).
- El Visor ha de tenir límits de pantalla (no pot sortir del viewport).
- **Alternativa per a depuració en escriptori:** Si `DeviceMotionEvent` no és disponible o l'acceleròmetre retorna `null`, el Visor ha de poder moure's amb les tecles de cursor. Ambdós sistemes han de coexistir.
- Mostra els valors bruts de l'acceleròmetre en un text de depuració a la cantonada inferior esquerra (format: `Accel X: 0.00 | Y: 0.00`).

---

#### BLOC B — MOTOR MULTIMÈDIA: ANIMACIONS I SPRITESHEETS (RA3 · CE: 25.2, 25.6)

**B1 — Spritesheet del Visor (`Visor.js`)**

El Visor és l'element controlat per l'usuari. El seu spritesheet (`visor.png`) ha de tenir **mínim 12 fotogrames** distribuïts en **tres estats d'animació**, cadascun definit amb `this.anims.create()`:

|Nom de l'animació|Estat|Frames|frameRate|Loop|
|---|---|---|---|---|
|`visor-idle`|Repòs, escanejant|0–3|8|Sí|
|`visor-capture`|Seqüència de captura|4–9|16|No|
|`visor-error`|Seqüència d'error|10–11|12|No|

Regles de transició d'animació:

- `visor-idle` s'activa per defecte i quan no hi ha gest actiu.
- `visor-capture` s'activa en iniciar un gest exitós. Quan l'animació acaba (`animationcomplete`), torna a `visor-idle`.
- `visor-error` s'activa en un gest fallit. Quan l'animació acaba, torna a `visor-idle`.
- **Cap animació ha de reenviar-se si ja s'està reproduint** (comprovació de `anims.currentAnim.key`).

**B2 — Spritesheet de l'Anomalia (`Anomaly.js`)**

Les anomalies apareixen de manera aleatòria a la pantalla. El spritesheet (`anomaly.png`) ha de tenir **mínim 8 fotogrames** en **dos estats**:

|Nom de l'animació|Estat|Frames|frameRate|Loop|
|---|---|---|---|---|
|`anomaly-pulse`|Pulsació normal|0–5|10|Sí|
|`anomaly-captured`|Seqüència de desaparició|6–7|8|No|

- Quan una anomalia és capturada, s'activa `anomaly-captured` i, en completar-se, l'objecte es destrueix (`destroy()`).
- La classe `Anomaly` ha de tenir un mètode `onCapture()` i un mètode `onMiss()` que gestionin les transicions d'estat internament.
- Les anomalies apareixen en intervals aleatoris entre 3 i 7 segons. Màxim 3 anomalies simultànies a pantalla.

**B3 — Efecte de partícules en captura**

En una captura exitosa, s'ha de generar un burst de partícules en la posició de l'anomalia:

- Usa `this.add.particles()` de Phaser 3 (API de partícules nova ≥ 3.60).
- El burst ha de ser d'emissió única (`emitParticleAt()` o `explode()`), no contínua.
- L'emitter s'ha de destruir o desactivar **5 segons** després de l'emissió per alliberar recursos.

---

#### BLOC C — PERSISTÈNCIA I ÀUDIO ADAPTATIU (RA2 · RA3 · CE: 24.6, 25.5, 25.7)

**C1 — Log d'Anomalies: Persistència real (`StorageService.js`)**

Tota la lògica de persistència ha d'estar **encapsulada** a la classe `StorageService`. Aquesta classe ha de ser una **classe singleton** (o mòdul amb mètodes estàtics) que exposi els mètodes següents:

JavaScript

```
// Retorna l'array de registres del localStorage, o [] si no n'hi ha
static getLog()

// Afegeix un nou registre a l'array i el guarda a localStorage
static addEntry(entry)

// Esborra tots els registres del localStorage
static clearLog()

// Retorna el nombre total de captures
static getCount()
```

Cada registre (`entry`) ha de ser un objecte JSON amb l'estructura:

JSON

```
{
  "id": "uuid-o-timestamp-unic",
  "timestamp": "2025-01-15T14:32:00.000Z",
  "coordenades": { "x": 234.5, "y": 412.0 },
  "velocitat_gest": 342.7,
  "durada_anomalia_ms": 4521
}
```

- La clau de `localStorage` ha de ser exactament: `'chrono_capture_log'`.
- La clau s'ha d'inicialitzar amb un array buit `[]` si no existeix.
- Tota la lògica ha d'estar dins d'un bloc `try-catch` per gestionar el cas en que `localStorage` no sigui accessible.

**C2 — Escena del Registre (`LogScene.js`)**

Crea una escena secundària accessible des d'un botó visible a `ScanScene` (etiqueta: "VER LOG").

- En entrar a `LogScene`, ha de llegir el log de `StorageService.getLog()` i mostrar **fins a 10 registres** en una llista renderitzada amb `add.text()` o `add.dom()`.
- Cada entrada ha de mostrar: número d'ordre, hora (format `HH:MM:SS`), coordenades (format `(X, Y)`) i velocitat del gest.
- Hi ha d'haver un botó "ESBORRAR LOG" que cridi `StorageService.clearLog()` i actualitzi la vista.
- Hi ha d'haver un botó "TORNAR" que transicioni de tornada a `ScanScene`.
- Si el log és buit, ha de mostrar el missatge: _"Cap anomalia registrada. El Buit avança."_

**C3 — Àudio adaptatiu (`AudioService.js`)**

Tota la lògica d'àudio ha d'estar encapsulada a la classe `AudioService`. Requeriments:

**Música ambient (bucle continu):**

- S'inicia en arrencar `ScanScene` amb `setLoop(true)`.
- El **volum** de la música ambient varia en funció de la distància entre el Visor i l'anomalia més propera:
    - Distància > 300 px: volum = 0.2
    - Distància entre 100 i 300 px: volum interpolat linealment entre 0.2 i 0.8
    - Distància < 100 px: volum = 0.8 (màxim)
- El **pitch (rate)** de la música varia de la mateixa manera:
    - Distància > 300 px: rate = 0.8
    - Distància entre 100 i 300 px: rate interpolat entre 0.8 i 1.3
    - Distància < 100 px: rate = 1.3
- La interpolació s'ha de calcular amb la fórmula del **lerp lineal**:
    
    text
    
    ```
    valor = min + (max - min) * ((distanciaMax - distancia) / (distanciaMax - distanciaMin))
    ```
    
- L'actualització del volum i el pitch ha de fer-se en el `update()` de l'escena, no en un timer.

**Efectes de so concurrents:**

- So de pulsació (`pulse.ogg`): es reprodueix cada vegada que una nova anomalia apareix.
- So de captura (`capture.ogg`): es reprodueix en cada captura exitosa.
- So d'error (`error.ogg`): es reprodueix en cada gest fallit.
- **Restricció de concurrència:** `capture.ogg` i `error.ogg` **no es poden solapar** entre si. Si un d'ells s'està reproduint, l'altre no s'inicia fins que el primer acabi. Usa `sound.isPlaying` per implementar aquesta lògica.
- `pulse.ogg` **sí** pot solapar-se amb els altres sons (és un so breu d'ambient).

**C4 — Integració del cicle de vida de l'escena**

Quan es transiciona a `LogScene` des de `ScanScene`:

- La música ambient s'ha de **pausar** (`sound.pause()`), no aturar.
- Quan es torna a `ScanScene`, la música ha de **reprendre's** des del punt on estava (`sound.resume()`).
- Implementa els mètodes de cicle de vida `create()`, `update()`, i el listener `this.events.on('shutdown', ...)` per netejar els recursos en cada escena.

---

### 📄 DOCUMENTACIÓ OBLIGATÒRIA (README.md)

El `README.md` ha d'incloure obligatòriament:

1. **Nom complet i grup.**
2. **Descripció tècnica breu** de l'arquitectura de l'app (màxim 8 línies).
3. **Instruccions d'execució** pas a pas (com servir el projecte localment i com provar-lo en mòbil).
4. **Decisió de sensors:** Explica com has implementat el fallback de l'acceleròmetre i quin problema has hagut de resoldre (mínim 5 línies).
5. **Llista d'assets** amb font i llicència de cada fitxer d'àudio i sprite.
6. **Autoavaluació honesta** de les tasques completades i no completades (màxim 10 línies).
7. **Dos problemes tècnics** trobats durant el desenvolupament i com els has resolt.

> ⚠️ **Un `README.md` absent o buit aplica una penalització de –1 punt sobre la nota final i limita la nota màxima al 6.9.**

---

### ⏱️ DISTRIBUCIÓ ORIENTATIVA DEL TEMPS

|Franja|Activitat recomanada|Fita de comprovació|
|---|---|---|
|**0:00 – 0:15**|Estructura de fitxers, `index.html`, `config.js`, `main.js`. Verificar arrencada sense errors.|El joc obre una pantalla sense errors de consola.|
|**0:15 – 0:45**|Classe `Visor.js`: spritesheet, animacions i moviment per acceleròmetre/teclat.|El visor es mou i les tres animacions es reprodueixen manualment.|
|**0:45 – 1:15**|Classe `Anomaly.js`: spritesheet, animacions, aparició aleatòria, lògica de `onCapture()` i `onMiss()`.|Les anomalies apareixen i es poden activar les seves animacions des de la consola.|
|**1:15 – 1:45**|Gest de _swipe_: detecció, càlcul de distància i velocitat, indicador visual i crida a les seqüències de captura/error.|Un _swipe_ exitós activa `visor-capture` i un de fallit activa `visor-error`.|
|**1:45 – 2:15**|`StorageService.js`: implementació completa. `LogScene.js`: llista de registres i botons.|En recarregar la pàgina, els registres anteriors persisteixen i es mostren a LogScene.|
|**2:15 – 2:45**|`AudioService.js`: música adaptativa (volum + pitch), SFX concurrents.|La música canvia de volum i pitch en apropar el visor a l'anomalia.|
|**2:45 – 3:00**|Revisió d'errors de consola, efecte de partícules, `README.md`, compressió i lliurament.|El `.zip` és complet i s'obre sense errors.|

---

### 🚫 CONDUCTES NO PERMESES

- Ús de qualsevol IA generativa (ChatGPT, Copilot, Gemini, Claude, etc.).
- Copiar codi de repositoris externs sense documentar la font al `README.md`.
- Usar biblioteques de tercers no aprovades (únicament Phaser 3 és permès; `nipplejs` queda **exclòs** en aquest examen).
- El professor es reserva el dret de fer una **defensa oral individual** de l'examen a qualsevol alumne.

---

## PART II — TASQUES CRÍTIQUES I FITES TÈCNIQUES

---

> Aquesta secció detalla les tres tasques principals amb els criteris d'avaluació associats. Es proporciona a l'alumne com a guia de progressió.

---

### ⚙️ TASCA 1 — Estructura de classes i interfície de controls mòbils

**Durada orientativa: 1 hora | RA: RA2 | CE: 24.1, 24.2, 24.4**

|#|Subtasca|Criteri vinculat|
|---|---|---|
|T1.1|Crear l'estructura de fitxers completa i verificar l'arrencada sense errors|24.1 — Organitzar el codi en mòduls|
|T1.2|Configurar `config.js` amb `Phaser.Scale.FIT`, resolució 480×854, i registrar les dues escenes|24.2 — Adaptar l'aplicació per a mòbils|
|T1.3|Implementar `Visor.js` amb spritesheet carregat i cos físic d'Arcade actiu|24.2 — Usar el motor per a renderitzar interfícies|
|T1.4|Implementar la lectura de `devicemotion` i aplicar la velocitat al Visor|24.4 — Llegir sensors del dispositiu|
|T1.5|Implementar el fallback de teclat quan l'acceleròmetre no és disponible|24.4 — Gestionar la indisponibilitat del sensor|
|T1.6|Mostrar el debug HUD de l'acceleròmetre (valors X i Y en temps real)|24.4 — Validar la lectura del sensor|
|T1.7|Implementar la detecció del gest de _swipe_ (distància + velocitat) amb indicador visual|24.2 — Implementar input tàctil complex|
|T1.8|Implementar la crida a les seqüències de captura i error en funció del gest|24.2 — Connectar l'input amb la lògica del joc|

---

### 🎨 TASCA 2 — Sistema d'animacions complex i lògica de captura multimèdia

**Durada orientativa: 1 hora | RA: RA3 | CE: 25.2, 25.6**

|#|Subtasca|Criteri vinculat|
|---|---|---|
|T2.1|Definir les tres animacions del Visor (`visor-idle`, `visor-capture`, `visor-error`)|25.6 — Crear animacions per fotogrames|
|T2.2|Implementar les transicions d'animació del Visor amb `animationcomplete` i comprovació de `currentAnim.key`|25.6 — Controlar el flux d'animació|
|T2.3|Definir les dues animacions de l'Anomalia (`anomaly-pulse`, `anomaly-captured`)|25.6 — Gestionar múltiples spritesheets|
|T2.4|Implementar els mètodes `onCapture()` i `onMiss()` a `Anomaly.js` amb les transicions correctes|25.2 — Encapsular la lògica multimèdia en classes|
|T2.5|Implementar la lògica d'aparició aleatòria d'anomalies (3–7 s, màxim 3 simultànies)|25.2 — Gestionar objectes multimèdia dinàmics|
|T2.6|Implementar el sistema de partícules en captura exitosa (burst únic + destrucció a 5s)|25.6 — Aplicar efectes visuals avançats|
|T2.7|Integrar la seqüència completa: gest exitós → `visor-capture` + `anomaly-captured` + partícules + so|25.2 — Sincronitzar elements multimèdia|

---

### 💾 TASCA 3 — Persistència, àudio adaptatiu i cicle de vida

**Durada orientativa: 1 hora | RA: RA2 + RA3 | CE: 24.6, 25.5, 25.7**

|#|Subtasca|Criteri vinculat|
|---|---|---|
|T3.1|Implementar `StorageService.js` amb els quatre mètodes estàtics requerits|24.6 — Usar mecanismes de persistència local|
|T3.2|Integrar `StorageService.addEntry()` en la seqüència de captura exitosa|24.6 — Persistir dades d'events de l'aplicació|
|T3.3|Implementar `LogScene.js` amb la llista de registres llegida de `StorageService.getLog()`|24.6 — Recuperar i mostrar dades persistides|
|T3.4|Implementar el botó "ESBORRAR LOG" i la vista de log buit|24.6 — Gestionar el cicle de vida de les dades|
|T3.5|Implementar `AudioService.js` amb la música ambient en bucle|25.7 — Gestionar àudio continu|
|T3.6|Implementar la variació de volum i pitch de la música per distància (fórmula de lerp)|25.5 — Processar àudio de manera dinàmica|
|T3.7|Implementar els SFX concurrents amb la restricció de no-solapament entre `capture` i `error`|25.7 — Gestionar events d'àudio concurrents|
|T3.8|Implementar la pausa/represa de la música en transicionar a `LogScene` i tornar|25.7 — Gestionar el cicle de vida de l'àudio|
|T3.9|Implementar el listener `shutdown` en ambdues escenes per netejar recursos|24.6 / 25.7 — Gestionar el cicle de vida de l'app|
