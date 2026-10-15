// Lote 2 da fila social (30 posts). Gera assets/social/queue.json + os cards.
// type: card (headline + accent + body) | list (itens) | price (3 linhas) | photo (imagem ja existente)
const WA = 'wa.me/18634381727';
const CTA = [
  ['Text us on WhatsApp for a flat quote, no home visit needed.', 'Escríbenos por WhatsApp y te damos precio fijo, sin visita previa.'],
  ['Send us your bedroom count, we send the number back.', 'Mándanos cuántas recámaras y te devolvemos el precio.'],
  ['Message us on WhatsApp. A real person answers.', 'Escríbenos por WhatsApp. Te contesta una persona real.'],
];
const TAGS = [
  '#DavenportFL #ChampionsGate #KissimmeeFL #HouseCleaning #LimpiezaDeCasas #CleaningService #CentralFlorida',
  '#DavenportFL #PolkCounty #OsceolaCounty #LimpiezaDavenport #CasaLimpia #HouseCleaning #CleaningCompany',
  '#CleaningTips #DavenportFlorida #ReunionFL #CondoLiving #ApartmentCleaning #TipsDeLimpieza #CentralFlorida',
];

const posts = [
  { slug: 'tip-microwave-en', kind: 'tip', type: 'card',
    label: 'CLEANING TIP', headline: 'Microwave caked on?', accent: 'Steam it.',
    body: 'Bowl of water, slice of lemon, 3 minutes on high. Leave the door shut 2 more. Everything wipes off.',
    en: `Your microwave doesn't need scrubbing. It needs steam.\n\nMicrowave-safe bowl, a cup of water, a slice of lemon. Three minutes on high, then leave the door closed for two more. The splatter softens and comes off with one wipe.`,
    es: `Tu microondas no necesita que lo talles. Necesita vapor.\n\nUn tazón apto para microondas, una taza de agua y una rodaja de limón. Tres minutos en alto y deja la puerta cerrada dos minutos más. La grasa se ablanda y sale con una sola pasada.` },

  { slug: 'price-weekly-en', kind: 'price', type: 'price',
    label: 'WEEKLY PLAN', headline: 'Weekly, per visit',
    rows: [['1 bedroom', '$75'], ['2 bedrooms', '$99'], ['3 bedrooms', '$125']],
    note: 'Condos & apartments · pets at no extra charge',
    en: `Weekly cleaning, per visit:\n1 bedroom $75. 2 bedrooms $99. 3 bedrooms $125.\n\nWeekly is the cheapest per visit because the house never gets far from clean. Less buildup, less time, lower price. Dogs and cats don't change the number.`,
    es: `Limpieza semanal, por visita:\n1 recámara $75. 2 recámaras $99. 3 recámaras $125.\n\nSemanal es lo más barato por visita porque la casa nunca se aleja de limpia. Menos suciedad acumulada, menos tiempo, menor precio. Perros y gatos no cambian el precio.` },

  { slug: 'myth-bleach-en', kind: 'safety', type: 'card',
    label: 'SAFETY FIRST', headline: 'Bleach + vinegar?', accent: 'Toxic gas.',
    body: 'Same with bleach + ammonia. Never mix cleaners, and never in a closed bathroom.',
    en: `Never mix bleach with vinegar. Never mix bleach with ammonia.\n\nBoth combinations release a gas that burns your lungs, and a small bathroom with the door closed is the worst place for it. One product at a time, rinse between them, and keep the fan on.`,
    es: `Nunca mezcles cloro con vinagre. Nunca mezcles cloro con amoníaco.\n\nLas dos mezclas sueltan un gas que quema los pulmones, y un baño chico con la puerta cerrada es el peor lugar para eso. Un producto a la vez, enjuaga entre uno y otro, y deja el extractor prendido.` },

  { slug: 'ba-sala-en.jpg', kind: 'before-after', type: 'photo',
    en: `Real living room, real Tuesday.\n\nThe "before" isn't dirty. It's lived in: towels, supplies, a blanket nobody folded. That's what most homes look like by the middle of the week, and it's exactly what a recurring clean is for.`,
    es: `Sala real, martes real.\n\nEl "antes" no está sucio. Está vivido: toallas, cosas, una cobija que nadie dobló. Así se ven casi todas las casas a mitad de semana, y para eso es una limpieza recurrente.` },

  { slug: 'tip-disinfect-es', kind: 'tip', type: 'card',
    label: 'TIP DE LIMPIEZA', headline: '¿Rocías y limpias al instante?', accent: 'No desinfecta.',
    body: 'El desinfectante necesita minutos mojado sobre la superficie. Lee el tiempo en la etiqueta.',
    en: `Spray and wipe right away? That cleans. It doesn't disinfect.\n\nEvery disinfectant has a contact time on the label, usually a few minutes the surface has to stay wet. Wipe it off sooner and the germs win. Spray, walk away, come back, then wipe.`,
    es: `¿Rocías y limpias de inmediato? Eso limpia, pero no desinfecta.\n\nCada desinfectante trae en la etiqueta un tiempo de contacto, normalmente unos minutos en que la superficie tiene que quedar mojada. Si lo quitas antes, ganan los gérmenes. Rocía, vete, regresa y luego limpia.` },

  { slug: 'svc-turnover-en', kind: 'owners', type: 'list',
    label: 'VACATION HOME OWNERS', headline: 'Turnovers, direct. No agency.',
    items: ['Custom price per property size', 'Linens, restock, guest-ready', 'Damage report with photos', 'Insured: COI & W-9 on request'],
    en: `Own or manage a vacation home in Davenport, ChampionsGate or Reunion?\n\nWe do turnover cleaning direct, no agency in the middle. Custom price per property, linens and restock, and a damage report with photos after every checkout. COI and W-9 on request. You talk to the owner of the company.`,
    es: `¿Tienes o administras una casa vacacional en Davenport, ChampionsGate o Reunion?\n\nHacemos la limpieza entre huéspedes directo, sin agencia en medio. Precio según la propiedad, blancos y reposición, y reporte de daños con fotos después de cada salida. COI y W-9 si los pides. Hablas con el dueño de la empresa.`,
    cta: ['Owners & managers: request a turnover quote on urbancleanfl.com', 'Dueños y administradores: pide tu cotización en urbancleanfl.com'] },

  { slug: 'tip-tracks-en', kind: 'florida', type: 'card',
    label: 'FLORIDA HOMES', headline: 'Sliding door stuck?', accent: 'Check the track.',
    body: 'Sand and pool grit pile up in the rail. Vacuum with the crevice tool, then a dry brush.',
    en: `If your sliding door drags, it's probably not the door. It's the track.\n\nSand from the beach, grit from the pool deck, dead leaves. It all collects in the rail. Vacuum it with the crevice tool, loosen the rest with a dry brush, vacuum again. Wet first and you just make mud.`,
    es: `Si tu puerta corrediza se atora, casi nunca es la puerta. Es el riel.\n\nArena de la playa, tierra de la alberca, hojas secas. Todo se junta ahí. Aspira con la boquilla delgada, afloja lo demás con un cepillo seco y aspira otra vez. Si lo mojas primero, haces lodo.` },

  { slug: 'trust-languages-es', kind: 'trust', type: 'card',
    label: 'EN · PT · ES', headline: 'Agenda en tu idioma.', accent: 'Sin traductor.',
    body: 'English, Português o Español. Por WhatsApp, a cualquier hora, con Sofia.',
    en: `Book in English, Português or Español.\n\nMessage us on WhatsApp in whatever language you think in. Sofia, our assistant, answers right away and a person from our family confirms your visit. Nothing lost in translation about what you want cleaned.`,
    es: `Agenda en English, Português o Español.\n\nEscríbenos por WhatsApp en el idioma en que piensas. Sofia, nuestra asistente, contesta al momento y una persona de nuestra familia confirma tu visita. Nada se pierde en la traducción sobre lo que quieres que limpiemos.` },

  { slug: 'tip-fan-en', kind: 'tip', type: 'card',
    label: 'CLEANING TIP', headline: 'Ceiling fan dust?', accent: 'Pillowcase.',
    body: 'Slide an old pillowcase over each blade and pull back. The dust stays inside, not on your bed.',
    en: `The pillowcase trick for ceiling fans.\n\nTurn the fan off, slide an old pillowcase over one blade, press gently and pull it back toward you. All the dust stays inside the case instead of raining onto your bed and floor. Shake it out outside, then wash it.`,
    es: `El truco de la funda para el ventilador de techo.\n\nApaga el ventilador, mete una funda vieja en una aspa, presiona suave y jala hacia ti. Todo el polvo se queda dentro de la funda y no cae en la cama ni en el piso. Sacúdela afuera y lávala.` },

  { slug: 'offer-60-en', kind: 'offer', type: 'card',
    label: 'NEW CLIENTS', headline: '$15 off your first visits.', accent: 'Up to $60.',
    body: '4 visits on weekly, 3 on bi-weekly, 2 on monthly.',
    en: `New here? Your first visits are $15 off each.\n\n4 visits on a weekly plan, 3 on bi-weekly, 2 on monthly. That's up to $60 back while you see if we're a fit.`,
    es: `¿Eres nuevo? Tus primeras visitas tienen $15 de descuento cada una.\n\n4 visitas en plan semanal, 3 en quincenal, 2 en mensual. Hasta $60 de ahorro mientras ves si te gustamos.` },

  { slug: 'ba-bancada-en.jpg', kind: 'before-after', type: 'photo',
    en: `Countertops are where the day lands.\n\nGroceries, mail, the coffee ring from this morning. We clear, wipe, degrease and dry, so the stone looks like stone again and not like a filing cabinet.`,
    es: `La barra de la cocina es donde cae todo el día.\n\nEl súper, el correo, la marca del café de la mañana. Despejamos, limpiamos, desengrasamos y secamos, para que la piedra vuelva a verse como piedra y no como archivero.` },

  { slug: 'tip-closet-es', kind: 'florida', type: 'card',
    label: 'CASAS EN FLORIDA', headline: '¿Clóset con olor a humedad?', accent: 'Deja que respire.',
    body: 'No guardes ropa húmeda, deja espacio entre perchas y usa un absorbente de humedad.',
    en: `Musty closet? In Florida, it's the humidity, not the clothes.\n\nNever put anything away damp, even gym clothes. Leave a little space between hangers so air moves. A moisture absorber on the shelf helps a lot, and so does opening the door for an hour while the AC runs.`,
    es: `¿Clóset con olor a humedad? En Florida es la humedad, no la ropa.\n\nNunca guardes nada húmedo, ni la ropa del gym. Deja un poco de espacio entre perchas para que circule el aire. Un absorbente de humedad en la repisa ayuda mucho, y abrir la puerta una hora con el aire prendido también.` },

  { slug: 'svc-deep-en', kind: 'service', type: 'list',
    label: 'DEEP CLEANING · FROM $165', headline: 'The spots a regular clean skips.',
    items: ['Inside appliances & cabinets', 'Baseboards & detail work', 'Ceiling fans', 'Grout'],
    en: `A deep clean is a reset, not a regular visit with more effort.\n\nInside the appliances and cabinets, baseboards, ceiling fans, grout. The spots that don't get touched week to week. Most homes need it every 6 to 12 months. From $165.`,
    es: `Una limpieza profunda es empezar de cero, no una visita normal con más ganas.\n\nDentro de electrodomésticos y gabinetes, zócalos, ventiladores de techo, juntas del azulejo. Lo que no se toca semana a semana. Casi todas las casas la necesitan cada 6 a 12 meses. Desde $165.` },

  { slug: 'tip-showerhead-en', kind: 'tip', type: 'card',
    label: 'CLEANING TIP', headline: 'Weak shower?', accent: 'It\'s scale.',
    body: 'Chrome heads: bag of white vinegar, rubber band, 1 hour. Skip it on brass or matte black.',
    en: `If the shower pressure dropped, look at the nozzles. That white crust is mineral scale.\n\nFor chrome shower heads: fill a plastic bag with white vinegar, tie it on with a rubber band, wait an hour, run hot water. Brass, nickel or matte black finishes? Skip the vinegar, it can strip them.`,
    es: `Si bajó la presión de la regadera, revisa los orificios. Esa costra blanca es sarro.\n\nRegaderas cromadas: llena una bolsa con vinagre blanco, amárrala con una liga, espera una hora y abre el agua caliente. ¿Latón, níquel o negro mate? Nada de vinagre, puede dañar el acabado.` },

  { slug: 'pets-safe-es', kind: 'pets', type: 'card',
    label: 'PET-FRIENDLY', headline: 'Productos seguros', accent: 'para patas y narices.',
    body: 'Limpiadores de bajo olor, pelo fuera de sillones y esquinas, y camas y areneros tratados.',
    en: `Your dog walks on the floor we just cleaned. Then licks its paws.\n\nThat's why we use pet-safe, low-fume products. We go after hair where it hides (upholstery, corners, baseboards) and treat crates, beds and litter areas so the house smells clean, not "pet". No extra charge for having them.`,
    es: `Tu perro camina en el piso que acabamos de limpiar. Luego se lame las patas.\n\nPor eso usamos productos seguros para mascotas y de bajo olor. Buscamos el pelo donde se esconde (sillones, esquinas, zócalos) y tratamos jaulas, camas y areneros para que la casa huela a limpio, no a "mascota". Sin costo extra por tenerlos.` },

  { slug: 'geo-reunion-en', kind: 'geo', type: 'card',
    label: 'WE COVER', headline: 'Reunion & Solterra.', accent: 'Yes, we go there.',
    body: 'Condos, townhomes and vacation homes on the 532 side. Same team, same day every visit.',
    en: `Reunion and Solterra: yes, that's our side of town.\n\nCondos, townhomes and vacation homes along the 532 side of Davenport. Same team every visit, on the same day of the week, so you always know who's coming in.`,
    es: `Reunion y Solterra: sí, es nuestra zona.\n\nCondominios, townhomes y casas vacacionales por el lado de la 532 en Davenport. El mismo equipo en cada visita, el mismo día de la semana, para que siempre sepas quién entra a tu casa.` },

  { slug: 'myth-more-en', kind: 'myth', type: 'card',
    label: 'CLEANING MYTH', headline: 'More product = cleaner?', accent: 'Stickier.',
    body: 'Extra soap leaves residue, and residue grabs dirt. Use less, rinse, dry.',
    en: `More cleaner doesn't mean more clean.\n\nExtra product leaves a film behind, and that film grabs dust and footprints faster than the bare surface would. That's why some floors feel tacky a day after mopping. Use less than the bottle says, rinse, and dry.`,
    es: `Más producto no significa más limpio.\n\nEl exceso deja una película, y esa película atrapa polvo y pisadas más rápido que la superficie limpia. Por eso algunos pisos se sienten pegajosos un día después de trapear. Usa menos de lo que dice la botella, enjuaga y seca.` },

  { slug: 'svc-moveout-es', kind: 'service', type: 'list',
    label: 'MUDANZA · DESDE $195', headline: 'Recupera tu depósito.',
    items: ['Cocina a detalle', 'Baños a detalle', 'Dentro de gabinetes', 'Listo para la inspección'],
    en: `Moving out? The deposit usually comes down to the kitchen and the bathrooms.\n\nOur move-out clean details both, inside the cabinets too, so the walkthrough is short. From $195. Book it for the day after the movers, not the same day.`,
    es: `¿Te mudas? El depósito casi siempre depende de la cocina y los baños.\n\nNuestra limpieza de mudanza deja los dos a detalle, también dentro de los gabinetes, para que la inspección sea rápida. Desde $195. Agéndala para el día después de la mudanza, no el mismo día.` },

  { slug: 'tip-dishwasher-en', kind: 'tip', type: 'card',
    label: 'CLEANING TIP', headline: 'Dishwasher smells?', accent: 'Clean the filter.',
    body: 'Twist it out from the bottom, rinse under hot water, scrub with a soft brush. Once a month.',
    en: `If the dishwasher smells, the filter hasn't been cleaned. Most people don't know there is one.\n\nIt's at the bottom, under the lower rack. Twist it out, rinse it under hot water, scrub with a soft brush and put it back. Five minutes, once a month.`,
    es: `Si el lavaplatos huele mal, el filtro no se ha limpiado. Casi nadie sabe que existe.\n\nEstá abajo, debajo de la canasta inferior. Gíralo para sacarlo, enjuágalo con agua caliente, tállalo con un cepillo suave y vuelve a ponerlo. Cinco minutos, una vez al mes.` },

  { slug: 'ba-cozinha-ilha-en.jpg', kind: 'before-after', type: 'photo',
    en: `The island is the busiest surface in the house, so it's the one people see first.\n\nWe start there on every visit. Clear it, clean it, dry the stone so there are no streaks when the afternoon light hits it.`,
    es: `La isla es la superficie más usada de la casa, por eso es lo primero que se ve.\n\nEmpezamos por ahí en cada visita. La despejamos, la limpiamos y secamos la piedra para que no queden marcas cuando le pega la luz de la tarde.` },

  { slug: 'price-monthly-es', kind: 'price', type: 'price',
    label: 'PLAN MENSUAL', headline: 'Mensual, por visita',
    rows: [['1 recámara', '$105'], ['2 recámaras', '$140'], ['3 recámaras', '$175']],
    note: 'Condominios y apartamentos · mascotas sin costo extra',
    en: `Monthly cleaning, per visit:\n1 bedroom $105. 2 bedrooms $140. 3 bedrooms $175.\n\nGood for people who keep up with the basics and want a real reset once a month. Same team, same checklist, photos when we finish.`,
    es: `Limpieza mensual, por visita:\n1 recámara $105. 2 recámaras $140. 3 recámaras $175.\n\nIdeal si tú mantienes lo básico y quieres una limpieza a fondo una vez al mes. El mismo equipo, la misma lista, fotos al terminar.` },

  { slug: 'tip-microfiber-en', kind: 'tip', type: 'card',
    label: 'CLEANING TIP', headline: 'Paper towels on glass?', accent: 'Lint.',
    body: 'Microfiber grabs dust instead of pushing it around. Wash it without fabric softener.',
    en: `Paper towels leave lint. Old t-shirts push dust around. Microfiber actually picks it up.\n\nOne catch: never wash microfiber with fabric softener. It clogs the fibers and the cloth stops grabbing anything. Wash it separately, warm water, air dry.`,
    es: `Las toallas de papel dejan pelusa. Las camisetas viejas mueven el polvo. La microfibra sí lo levanta.\n\nUn detalle: nunca la laves con suavizante. Tapa las fibras y el trapo deja de atrapar. Lávala aparte, con agua tibia, y sécala al aire.` },

  { slug: 'trust-steps-en', kind: 'trust', type: 'list',
    label: 'HOW IT WORKS', headline: 'Three messages. That\'s it.',
    items: ['You send your home details', 'We confirm the day on WhatsApp', 'We text you when we\'re on the way'],
    en: `Booking us takes three messages.\n\n1. You tell us bedrooms, bathrooms and pets.\n2. We send a flat price and confirm the day on WhatsApp.\n3. On the day, a real person texts you when we're on the way.\n\nNo home visit, no call center, no app to download.`,
    es: `Agendar con nosotros toma tres mensajes.\n\n1. Nos dices recámaras, baños y mascotas.\n2. Te mandamos precio fijo y confirmamos el día por WhatsApp.\n3. Ese día, una persona real te avisa cuando vamos en camino.\n\nSin visita previa, sin call center, sin app que descargar.` },

  { slug: 'tip-mattress-es', kind: 'tip', type: 'card',
    label: 'TIP DE LIMPIEZA', headline: '¿Y el colchón?', accent: 'Bicarbonato.',
    body: 'Espolvorea, espera 30 minutos y aspira. Gíralo cada 3 meses para que se gaste parejo.',
    en: `When did you last clean the mattress, not the sheets?\n\nStrip the bed, sprinkle baking soda over the top, wait 30 minutes, vacuum it all up with the upholstery tool. It pulls out odor and moisture. Rotate the mattress every 3 months so it wears evenly.`,
    es: `¿Cuándo fue la última vez que limpiaste el colchón, no las sábanas?\n\nQuita todo, espolvorea bicarbonato encima, espera 30 minutos y aspira con la boquilla de tapicería. Saca olores y humedad. Gira el colchón cada 3 meses para que se gaste parejo.` },

  { slug: 'svc-onetime-en', kind: 'service', type: 'price',
    label: 'HOSTING THIS SEASON?', headline: 'One-time, no contract',
    rows: [['1 bedroom', '$115'], ['2 bedrooms', '$150'], ['3 bedrooms', '$185']],
    note: 'Before or after the party · book by WhatsApp',
    en: `Family coming for the holidays? Book one clean, no plan, no contract.\n\n1 bedroom $115. 2 bedrooms $150. 3 bedrooms $185.\n\nBook it two days before they arrive so you're not cleaning the night before. Or book it for the morning after.`,
    es: `¿Viene la familia para las fiestas? Agenda una sola limpieza, sin plan y sin contrato.\n\n1 recámara $115. 2 recámaras $150. 3 recámaras $185.\n\nAgéndala dos días antes de que lleguen para no estar limpiando la noche anterior. O para la mañana siguiente.` },

  { slug: 'tip-topdown-en', kind: 'tip', type: 'card',
    label: 'CLEANING TIP', headline: 'Floors first?', accent: 'Backwards.',
    body: 'Top to bottom, dry to wet. Dust falls. Fans and shelves first, floors always last.',
    en: `Top to bottom, dry to wet. That's the whole order.\n\nDust falls, so fans, shelves and frames come first, then counters, then floors. Dry dusting before anything wet, or you're turning dust into paste. Mop first and you'll mop twice.`,
    es: `De arriba hacia abajo, de seco a mojado. Ese es todo el orden.\n\nEl polvo cae, así que primero ventiladores, repisas y cuadros, luego superficies y al final el piso. Sacude en seco antes de mojar, o conviertes el polvo en pasta. Si trapeas primero, vas a trapear dos veces.` },

  { slug: 'ba-quarto-master-en.jpg', kind: 'before-after', type: 'photo',
    en: `Coming home to a made bed changes the whole evening.\n\nThis one took less time than you'd think: strip, dust, vacuum under and around, fresh fold. The room you sleep in deserves the same attention as the one guests see.`,
    es: `Llegar a casa con la cama tendida cambia toda la noche.\n\nEsta tomó menos de lo que crees: quitar, sacudir, aspirar debajo y alrededor, doblar todo. El cuarto donde duermes merece la misma atención que el que ven las visitas.` },

  { slug: 'tip-fridge-es', kind: 'tip', type: 'card',
    label: 'TIP DE LIMPIEZA', headline: '¿Manchas negras en el refri?', accent: 'Es el empaque.',
    body: 'El moho se esconde en los pliegues de la goma. Agua jabonosa, cepillo de dientes viejo y secar.',
    en: `Black spots on the fridge door seal? That's mold living in the rubber folds.\n\nWarm soapy water and an old toothbrush, get into every fold, then dry it completely. A clean seal also closes tighter, so the fridge works less. Florida humidity makes this a monthly job.`,
    es: `¿Puntos negros en la goma de la puerta del refri? Es moho viviendo en los pliegues.\n\nAgua tibia con jabón y un cepillo de dientes viejo, entra a cada pliegue y seca todo. Un empaque limpio cierra mejor y el refri trabaja menos. Con la humedad de Florida, es tarea de cada mes.` },

  { slug: 'trust-checklist-en', kind: 'trust', type: 'list',
    label: 'EVERY RECURRING VISIT', headline: 'What "cleaned" means here.',
    items: ['Kitchens & bathrooms sanitized', 'Dusting, vacuuming, mopping', 'Cobwebs removed', 'Photos sent when we finish'],
    en: `"Cleaned" means something different to every company. Here's what it means to us, every recurring visit:\n\nKitchens and bathrooms sanitized. Dusting, vacuuming and mopping. Cobwebs gone. Surfaces and electronics wiped. And photos on WhatsApp when we finish, so you see it before you get home.`,
    es: `"Limpio" significa algo distinto para cada empresa. Esto es lo que significa para nosotros en cada visita recurrente:\n\nCocinas y baños desinfectados. Sacudir, aspirar y trapear. Telarañas fuera. Superficies y electrónicos limpios. Y fotos por WhatsApp al terminar, para que lo veas antes de llegar.` },

  { slug: 'tip-ac-vents-en', kind: 'florida', type: 'card',
    label: 'FLORIDA HOMES', headline: 'Dusty vents?', accent: 'Check the filter.',
    body: 'The AC runs almost all year here. Look at the filter monthly; dirty vents usually start there.',
    en: `Dust lines around the AC vents are a filter problem first.\n\nIn Central Florida the AC runs most of the year, so the filter fills faster than the box says. Check it every month and change it when it's grey. Then wipe the vent covers with a damp microfiber cloth. Less dust on every other surface too.`,
    es: `Las líneas de polvo alrededor de las rejillas del aire son, primero, un problema del filtro.\n\nEn Florida central el aire está prendido casi todo el año, así que el filtro se llena más rápido de lo que dice la caja. Revísalo cada mes y cámbialo cuando se vea gris. Luego limpia las rejillas con microfibra húmeda. También habrá menos polvo en todo lo demás.` },
];

module.exports = { posts, CTA, TAGS, WA };
