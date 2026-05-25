/* ============================================================
   INTESA VINCENTE — WORD LIST (500+ words)
   ============================================================ */
const WORDS = [
  // Animali
  "Cane","Gatto","Leone","Tigre","Elefante","Giraffa","Scimmia","Delfino","Pinguino","Coccodrillo",
  "Struzzo","Pappagallo","Camaleonte","Cobra","Rinoceronte","Ippopotamo","Gorilla","Koala","Panda","Canguro",
  "Orso","Lupo","Volpe","Cervo","Capra","Mucca","Cavallo","Asino","Maiale","Pecora",
  "Gallina","Tacchino","Piccione","Aquila","Falco","Gufo","Pipistrello","Topo","Coniglio","Scoiattolo",
  "Riccio","Talpa","Lontra","Castoro","Lemure","Fenicottero","Pellicano","Cicogna","Rondine","Passero",
  "Polipo","Medusa","Granchio","Aragosta","Gamberetto","Trota","Tonno","Squalo","Balena","Foca",
  "Tartaruga","Lucertola","Iguana","Geco","Salamandra","Rana","Rospo","Alligatore","Bisonte","Yak",
  // Cibo e cucina
  "Pizza","Pasta","Risotto","Lasagna","Carbonara","Amatriciana","Gnocchi","Polpette","Cotoletta","Bistecca",
  "Salmone","Sogliola","Baccalà","Gamberi","Cozze","Vongole","Polpo","Calamari","Bruschetta","Crostini",
  "Pane","Focaccia","Grissini","Cornetto","Croissant","Brioche","Ciambella","Biscotti","Torta","Crostata",
  "Gelato","Sorbetto","Tiramisù","Panna cotta","Cannoli","Sfogliatella","Babà","Struffoli","Pandoro","Panettone",
  "Fragola","Ciliegia","Pesca","Albicocca","Susina","Melone","Cocomero","Mango","Ananas","Papaya",
  "Mela","Pera","Banana","Uva","Arancia","Limone","Pompelmo","Fico","Melograno","Kiwi",
  "Pomodoro","Melanzana","Zucchina","Peperone","Cetriolo","Carota","Sedano","Porro","Cipolla","Aglio",
  "Patata","Spinaci","Broccoli","Cavolfiore","Carciofo","Asparago","Funghi","Piselli","Fagioli","Lenticchie",
  // Sport
  "Calcio","Tennis","Pallavolo","Pallacanestro","Nuoto","Atletica","Ciclismo","Sci","Pugilato","Lotta",
  "Golf","Rugby","Baseball","Cricket","Badminton","Ping pong","Scherma","Equitazione","Tiro con l'arco","Canottaggio",
  "Kayak","Surf","Windsurf","Snowboard","Pattinaggio","Ginnastica","Judo","Karate","Taekwondo","Boxe",
  "Maraton","Triathlon","Pentathlon","Decathlon","Salto con l'asta","Salto in lungo","Lancio del martello","Lancio del disco","Lancio del giavellotto","Corsa a ostacoli",
  "Formula uno","MotoGP","Ciclismo su pista","BMX","Mountain bike","Tiro a segno","Tiro a volo","Vela","Pallanuoto","Tuffi",
  // Professioni
  "Medico","Infermiere","Chirurgo","Dentista","Farmacista","Veterinario","Psicologo","Fisioterapista","Radiologo","Cardiologo",
  "Avvocato","Giudice","Notaio","Commercialista","Bancario","Assicuratore","Economista","Ingegnere","Architetto","Geometra",
  "Insegnante","Professore","Preside","Bibliotecario","Ricercatore","Scienziato","Matematico","Fisico","Chimico","Biologo",
  "Giornalista","Scrittore","Poeta","Editore","Traduttore","Fotografo","Regista","Attore","Musicista","Cantante",
  "Pittore","Scultore","Grafico","Designer","Stilista","Chef","Cuoco","Cameriere","Barman","Sommelier",
  "Pilota","Hostess","Controllore di volo","Macchinista","Autista","Camionista","Tassista","Postino","Corriere","Spedizioniere",
  "Poliziotto","Carabiniere","Vigile del fuoco","Guardia di sicurezza","Militare","Marinaio","Astronauta","Sommozzatore","Alpinista","Esploratore",
  "Falegname","Idraulico","Elettricista","Muratore","Pittore edile","Meccanico","Saldatore","Fabbro","Ceramista","Gioielliere",
  // Luoghi
  "Roma","Milano","Napoli","Torino","Venezia","Firenze","Bologna","Genova","Palermo","Bari",
  "Parigi","Londra","Berlino","Madrid","Barcellona","Vienna","Amsterdam","Bruxelles","Zurigo","Ginevra",
  "New York","Los Angeles","Chicago","Houston","Miami","Las Vegas","San Francisco","Seattle","Boston","Washington",
  "Tokyo","Pechino","Shanghai","Hong Kong","Seoul","Bangkok","Taipei","Singapore","Giacarta","Manila",
  "Cairo","Nairobi","Lagos","Johannesburg","Accra","Addis Abeba","Casablanca","Tunisi","Algeri","Dakar",
  "Spiaggia","Montagna","Foresta","Deserto","Isola","Lago","Fiume","Cascata","Grotta","Vulcano",
  "Castello","Fortezza","Cattedrale","Basilica","Tempio","Moschea","Sinagoga","Piazza","Porto","Stazione",
  "Aeroporto","Autostrada","Sentiero","Ponte","Tunnel","Faro","Baia","Promontorio","Penisola","Arcipelago",
  // Oggetti di casa
  "Divano","Poltrona","Tavolo","Sedia","Letto","Armadio","Cassettiera","Libreria","Scrivania","Lampada",
  "Televisore","Computer","Tastiera","Mouse","Stampante","Telefono","Tablet","Cuffia","Altoparlante","Telecamera",
  "Frigorifero","Forno","Microonde","Lavastoviglie","Lavatrice","Asciugatrice","Aspirapolvere","Ferro da stiro","Ventilatore","Condizionatore",
  "Pentola","Padella","Coltello","Forchetta","Cucchiaio","Piatto","Bicchiere","Tazza","Brocca","Tagliere",
  "Specchio","Quadro","Vaso","Candela","Tappeto","Tenda","Cuscino","Coperta","Lenzuolo","Asciugamano",
  // Natura e scienze
  "Sole","Luna","Stelle","Pianeta","Cometa","Asteroide","Galassia","Nebulosa","Buco nero","Supernova",
  "Oceano","Mare","Spiaggia","Coral reef","Mangrovie","Savana","Foresta pluviale","Tundra","Permafrost","Ghiacciaio",
  "Terremoto","Vulcano","Tornado","Uragano","Tsunami","Valanga","Frana","Alluvione","Siccità","Tempesta",
  "Fotosintesi","Metamorfosi","Ibernazione","Migrazione","Simbiosi","Mimetismo","Predazione","Evoluzione","Adattamento","Ecosistema",
  "Atomo","Molecola","Elettrone","Protone","Neutrone","Ione","Legame chimico","Reazione","Acido","Base",
  "Forza","Energia","Massa","Velocità","Accelerazione","Gravità","Magnetismo","Elettricità","Luce","Suono",
  // Cultura e intrattenimento
  "Cinema","Teatro","Opera","Balletto","Circo","Concerto","Festival","Mostra","Museo","Galleria",
  "Romanzo","Poesia","Racconto","Fumetto","Manga","Graphic novel","Biografie","Saggio","Enciclopedia","Dizionario",
  "Rock","Jazz","Blues","Hip hop","Reggae","Soul","Country","Classica","Elettronica","Pop",
  "Tragedia","Commedia","Thriller","Horror","Fantascienza","Fantasy","Romantico","Western","Documentario","Animazione",
  "Scacchi","Dama","Monopoly","Risiko","Trivial Pursuit","Scarabeo","Clue","Jenga","Pictionary","Taboo",
  "Maschera","Costume","Truccatura","Parrucca","Scenografia","Regia","Sceneggiatura","Colonna sonora","Effetti speciali","Doppiaggio",
  // Trasporti e veicoli
  "Automobile","Moto","Bicicletta","Monopattino","Autobus","Filobus","Tram","Metropolitana","Treno","Alta velocità",
  "Aereo","Elicottero","Deltaplano","Mongolfiera","Zeppelin","Navicella","Razzo","Satellite","Stazione spaziale","Shuttle",
  "Nave","Traghetto","Hovercraft","Sottomarino","Canoa","Kayak","Vela","Motoscafo","Yacht","Cargo",
  "Camion","Furgone","Pickup","SUV","Berlina","Coupé","Cabrio","Station wagon","Minivan","Limousine",
  // Abbigliamento
  "Maglietta","Camicia","Felpa","Maglione","Giacca","Cappotto","Giubbotto","Impermeabile","Gilet","Blazer",
  "Pantaloni","Jeans","Shorts","Gonna","Vestito","Tuta","Pigiama","Kimono","Sari","Kilt",
  "Scarpe","Stivali","Sandali","Mocassini","Sneakers","Tacchi","Ballerine","Ciabatte","Stivaletti","Anfibi",
  "Cappello","Berretto","Bombetta","Cilindro","Casco","Corona","Turbante","Basco","Bandana","Visiera",
  "Borsa","Zaino","Valigia","Borsetta","Portafoglio","Cintura","Cravatta","Foulard","Sciarpa","Guanti",
  // Corpo umano e salute
  "Cuore","Polmone","Fegato","Rene","Cervello","Stomaco","Intestino","Pancreas","Milza","Tiroide",
  "Osso","Muscolo","Tendine","Legamento","Cartilagine","Nervo","Arteria","Vena","Capillare","Midollo",
  "Vitamina","Minerale","Proteina","Carboidrato","Lipide","Fibra","Antiossidante","Probiotico","Ormone","Enzima",
  "Raffreddore","Influenza","Febbre","Tosse","Mal di testa","Allergia","Asma","Diabete","Ipertensione","Anemia",
  // Tecnologia e informatica
  "Internet","Social media","Intelligenza artificiale","Robot","Drone","Realtà virtuale","Cloud","Blockchain","Criptovaluta","Hacker",
  "Software","Hardware","App","Browser","Motore di ricerca","Database","Algoritmo","Codice","Programmazione","Debug",
  "Schermo","Processore","Memoria","Disco rigido","SSD","GPU","CPU","RAM","USB","Bluetooth",
  // Parole divertenti / wildcards
  "Arcobaleno","Farfalla","Fuochi d'artificio","Tramonto","Alba","Nebbia","Arcobaleno","Temporale","Grandine","Neve",
  "Sorriso","Risata","Lacrime","Sogno","Incubo","Memoria","Nostalgia","Speranza","Coraggio","Gentilezza",
  "Magia","Mistero","Avventura","Libertà","Giustizia","Pace","Guerra","Rivoluzione","Scoperta","Invenzione"
];