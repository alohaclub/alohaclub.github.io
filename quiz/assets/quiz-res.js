const baseUrl = "https://www.alohaclub.nl/collections/intieme-wellness/";
const cfWorker = 'https://sweet-mouse-24b9.time2out.workers.dev/';

const legalFooterHtml = `
<footer class="quiz-legal-footer">
<p>Dit is uitsluitend ter informatie. Raadpleeg een arts of specialist voor medisch advies of diagnose.</p>
<a href="./privacy-policy.html" target="_blank">Privacybeleid</a>
<a href="./terms-of-service.html" target="_blank">Algemene Voorwaarden</a>
<a href="./contacts.html" target="_blank">Contactgegevens</a>
</footer>
`;

const descriptions = {
	"FirstExperience": "Je staat aan het begin van je reis met intieme zelfzorg, en dat is iets om trots op te zijn. Het gaat hier niet om presteren, maar om je lichaam zonder haast en zonder oordeel te leren kennen. Voor jou werkt het beste een heel eenvoudige bediening, een klein en zacht ontwerp en een fluisterstille start — zodat je in je eigen tempo vertrouwen kunt opbouwen.",

	"SoloPractices": "Voor jou zijn momenten alleen net zo belangrijk als een warm bad of een goede nachtrust. Je zoekt geen intense prikkel, maar een manier om spanning los te laten en weer contact te maken met jezelf. Een rustig ritme, intuïtieve knoppen en een comfortabele, lichaamsvriendelijke vorm helpen je om te ontspannen en je grenzen te respecteren.",

	"PartnerGames": "Intimiteit samen begint voor jou met veiligheid en open communicatie. Je wilt samen ontdekken, niet 'moeten'. Een hulpmiddel dat uitnodigt tot samenspel — zacht, makkelijk vast te houden en zonder ingewikkelde standen — kan het gesprek openen en jullie helpen om samen te ontspannen, zonder enige druk.",

	"SensualWellness": "Je ziet intimiteit als onderdeel van je dagelijkse balans en herstel. Na een drukke dag zoek je warmte en verzachting, geen opwinding. Voor jou past een zacht, kalmerend ritueel dat je zenuwstelsel tot rust brengt, je doorbloeding ondersteunt en je helpt om weer in je lichaam te zakken.",

	"GentleStimulation": "Jouw lichaam reageert het best op een langzame, geleidelijke opbouw. Te veel intensiteit voelt snel overweldigend. Kies voor standen die zacht beginnen en langzaam opbouwen, waarbij jij altijd de controle houdt — dat geeft je het vertrouwen om volledig te kunnen ontspannen.",

	"PointStimulation": "Je merkt dat je lichaam heel precies reageert op gerichte aanraking. Je zoekt geen brede stimulatie, maar een zachte, gefocuste ondersteuning die helpt om spanning op één plek los te laten. Een slanke, ergonomische tip die comfortabel blijft is hierbij belangrijker dan kracht.",

	"WaveStimulation": "Je bent nieuwsgierig naar een andere sensatie zonder directe wrijving. Moderne luchtdruktechnologie geeft een kloppend, zuigend gevoel dat veel vrouwen als dieper en minder vermoeiend ervaren. Het is een contactloze, zachte manier om ontspanning op te bouwen, ideaal als je gevoelig bent.",

	"DeepMassage": "Je ervaart vaak spanning in je bekkenbodem — door stress, sporten of lang zitten. Je zoekt geen oppervlakkige tinteling, maar een volle, ritmische massage die van binnenuit helpt loslaten. Belangrijk voor jou: controle over intensiteit, een verwarmende functie en een vorm die druk gelijkmatig verdeelt.",

	"DelicateDesign": "Design geeft jou een gevoel van veiligheid. Je houdt van minimalistisch, mat zacht silicone en een vorm die niet medisch of opzichtig voelt. Een fluisterstille motor en een discreet formaat helpen je om je op je gemak te voelen, juist als je net begint.",

	"PremiumDesign": "Je investeert bewust in je welzijn. Voor jou tellen medische siliconen, een lange batterijduur, 100% waterdicht design en doordachte ergonomie. Je ziet intieme zelfzorg niet als impuls, maar als onderdeel van je self-care routine — en dan kies je voor kwaliteit die jaren meegaat.",

	"PlayfulDesign": "Een vriendelijke, toegankelijke uitstraling verlaagt voor jou de drempel. Heldere knoppen, zachte pastelkleuren en een niet-intimiderende vorm helpen je om met een glimlach te ontdekken. Je wilt plezier zonder handleiding — gewoon aanzetten en voelen.",

	"DiscreetDesign": "Privacy is voor jou niet onderhandelbaar. Je waardeert een compact formaat dat in je toilettas past, een bijna geruisloze motor en een oplaadcase die lijkt op een lipstick of powerbank. Zo kun je je ritueel behouden, thuis of op reis, zonder je zorgen te maken."
};

const quizData = [
{
	id: "start",
	bg: "/quiz/img/q-start.webp",
	html: `
	<img class="logo" src="/quiz/img/logo.webp" alt="logo" width="128" height="114">
	<p>Onze winkel heeft samen met gezondheidsexperts een korte quiz samengesteld — zodat jij kunt ontdekken welke oplossing voor intieme wellness past bij jouw comfort en zelfzorg.</p>
	<p>Drie korte vragen. Geen goed of fout. Alleen gericht op welzijn.</p>
	`,
	isStart: true
},
{
	id: "q1",
	includeInUrl: true,
	title: "Waar wil je ondersteuning bij?",
	bg: "/quiz/img/q1.webp",
	options: [
	{ key: "FirstExperience", text: "Mijn eerste kennismaking" },
	{ key: "SoloPractices", text: "Ontspanning en zelfzorg" },
	{ key: "PartnerGames", text: "Samen comfort en communicatie" },
	{ key: "SensualWellness", text: "Algemeen welzijn en balans" },
	{ key: "FirstExperience", text: "Weet ik nog niet" }
	]
},
{
	id: "q2",
	includeInUrl: true,
	title: "Welk type comfort ervaar je als prettig?",
	bg: "/quiz/img/q2.webp",
	options: [
	{ key: "GentleStimulation", text: "Zachte, kalmerende ondersteuning" },
	{ key: "PointStimulation", text: "Gerichte, lokale verlichting" },
	{ key: "WaveStimulation", text: "Ritmische pulserende ondersteuning" },
	{ key: "DeepMassage", text: "Diepere, ontspannende massage" }
	]
},
{
	id: "q3",
	includeInUrl: true,
	title: "Welke eigenschappen vind je belangrijk?",
	bg: "/quiz/img/q3.webp",
	options: [
	{ key: "DelicateDesign", text: "Zacht en minimalistisch" },
	{ key: "PremiumDesign", text: "Duurzaam en hoogwaardig" },
	{ key: "PlayfulDesign", text: "Toegankelijk en vriendelijk" },
	{ key: "DiscreetDesign", text: "Compact en discreet" }
	]
},
{
	id: "final",
	bg: "/quiz/img/q-final.webp",
	html: `
	<h3>Jouw persoonlijke aanbeveling</h3>
	<p>Op basis van je antwoorden hebben we een selectie gemaakt die past bij intieme wellness en comfort.</p>
	`,
	isFinal: true
}
];

const app = document.querySelector("#quiz-app");


function acceptCookies() {
	document.getElementById('cookie-banner').style.display = 'none';
	localStorage.setItem('cookie_consent', 'granted');
	// try {
	// 	pixelInit();
	// } catch(e) {
	// }
}

function declineCookies() {
	localStorage.setItem('cookie_consent', 'denied');
	document.getElementById('cookie-banner').style.display = 'none';
}

function checkCookieConsent() {
	const consent = localStorage.getItem('cookie_consent');
	const banner = document.getElementById('cookie-banner');

	if (!consent) {
		banner.style.display = 'block';
	} else if (consent === 'granted') {
		// try {
		// 	pixelInit();
		// } catch(e) {
		// 	console.log(e);
		// }


		(function () {
			if (localStorage.getItem('ping')) {
				return;
			}

			const quizResults = sessionStorage.getItem('quiz_results') ?? '';

			const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
			const params = new URLSearchParams(window.location.search);
			const utmString = utmKeys
			.filter(key => params.has(key))
			.map(key => `${key}=${encodeURIComponent(params.get(key))}`)
			.join('&');

			const data = JSON.stringify({
				quiz_results: quizResults,
				utm: utmString,
			});
			const blob = new Blob([data], { type: 'application/json' });

			const status = navigator.sendBeacon(cfWorker, blob);

			localStorage.setItem('ping', '1');

			if (!status) {
				console.error('Beacon failed to queue');
			}
		})();
	}
}
checkCookieConsent();

if (app) {
	const container = document.querySelector("#sections-container");
	const progress = document.querySelector("#progress");
	const selections = loadSelections();

	let currentStep = getRestoredStep();

	renderAllSections();
	renderStep(currentStep);

	container.addEventListener("click", function (event) {
		const button = event.target.closest("button");
		if (!button) return;

		if (button.dataset.action === "next") {
			nextStep();
			return;
		}

		if (button.dataset.key) {
			makeSelection(button.dataset.key);
		}
	});

	function loadSelections() {
		try {
			const saved = JSON.parse(sessionStorage.getItem("quiz_results") || "{}");
			return Array.isArray(saved.answers) ? saved.answers.filter(Boolean) : [];
		} catch (e) {
			return [];
		}
	}

	function getRestoredStep() {
		const finalStep = quizData.length - 1;

		// 0 ответов = start
		// 1 ответ = q2
		// 2 ответа = q3
		// 3 ответа = final
		return Math.min(selections.length + 1, finalStep);
	}

	function renderAllSections() {
		container.innerHTML = "";

		quizData.forEach((step, index) => {
			const section = document.createElement("section");
			section.className = `quiz-section step-${index}`;
			section.id = `step-${index}`;

			section.innerHTML = `
			<div class="screen">
			${getStepHtml(step)}
			</div>
			`;

			container.appendChild(section);
		});
	}

	function getStepHtml(step) {
		if (step.isStart) {
			return `
			${step.html}
			<button class="btn btn-primary" data-action="next">Start</button>
			${legalFooterHtml}
			`;
		}

		if (step.isFinal) {
			return `
			${step.html}
			<div id="results-description"></div>
			<div id="final-actions">
			<a href="#" id="direct-link" class="btn btn-primary">Ga naar de aanbeveling</a>
			</div>
			${legalFooterHtml}
			`;
		}

		return `
		<h2>${step.title}</h2>
		${step.options.map(option => `
			<button class="btn" data-key="${option.key}">
			${option.text}
			</button>
			`).join("")}
		`;
	}

	function renderStep(stepIndex) {
		currentStep = stepIndex;

		const step = quizData[currentStep];

		document.querySelectorAll(".quiz-section").forEach((section, index) => {
			section.classList.toggle("active", index === currentStep);
		});

		if (step.bg) {
			document.body.style.backgroundImage = `url('${step.bg}')`;
		}

		progress.style.width = `${(currentStep / (quizData.length - 1)) * 100}%`;

		if (step.isFinal) {
			injectDescriptions();
			updateFinalLink();
		}
	}

	function nextStep() {
		renderStep(Math.min(currentStep + 1, quizData.length - 1));
	}

	function makeSelection(key) {
		const questionIndex = currentStep - 1;

		selections[questionIndex] = key;
		saveSelections();

		nextStep();
	}

	function saveSelections() {
		sessionStorage.setItem("quiz_results", JSON.stringify({
			answers: selections.filter(Boolean)
		}));
	}

	function injectDescriptions() {
		const descContainer = document.querySelector("#results-description");
		if (!descContainer) return;

		descContainer.innerHTML = "";

		selections.forEach(key => {
			if (!descriptions[key]) return;

			const p = document.createElement("p");
			p.textContent = descriptions[key];
			descContainer.appendChild(p);
		});
	}

	function generateFinalUrl() {
		const currentQueryParams = window.location.search;

		// Собираем только ключи вопросов с includeInUrl !== false
		const urlKeys = selections.filter((key, idx) => {
			const questionStep = quizData.find(q => q.id === `q${idx + 1}`);
			return questionStep && questionStep.includeInUrl !== false;
		});

		const quizResultsPath = urlKeys.join('+');
		let finalUrl = baseUrl + quizResultsPath;

		if (currentQueryParams) {
			const separator = finalUrl.includes('?') ? '&' : '?';
			finalUrl += separator + currentQueryParams.substring(1);
		}

		return finalUrl;
	}

	function updateFinalLink() {
		const link = document.querySelector("#direct-link");
		if (link) {
			link.href = generateFinalUrl();
		}
	}
}