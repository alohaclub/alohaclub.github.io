
const pix = {
	aloha: '2664730533928587',
	quiz: '1935071070694393',
}

const baseUrl = "./quiz-results.html";
// const postUrl = "https://api.site/quiz/quiz-results"; // ← ссылка для приёма POST-данных
const legalFooterHtml = `
<footer class="quiz-legal-footer">
<a href="./privacy-policy.html" target="_blank">Privacybeleid</a>
<a href="./terms-of-service.html" target="_blank">Algemene Voorwaarden</a>
<a href="./contacts.html" target="_blank">Contactgegevens</a>
</footer>
`;

// Объект с расшифровками предпочтений
const descriptions = {
	"FirstExperience": "Je start met intieme zelfzorg. Een eenvoudige, rustige kennismaking helpt je lichaam beter te leren kennen zonder haast. Kies voor oplossingen met eenvoudige bediening en zacht comfort.",
	"SoloPractices": "Momenten van rust en zelfzorg dragen bij aan je algehele welzijn. Aandacht voor intieme gezondheid kan ontspanning ondersteunen. Comfort en gebruiksgemak staan hierbij centraal.",
	"PartnerGames": "Communicatie en wederzijds comfort zijn belangrijk voor intiem welzijn samen. Je zoekt ondersteuning die gesprek en ontspanning bevordert, zonder druk.",
	"SensualWellness": "Voor jou hoort intimiteit bij balans en herstel. Je zoekt geen prikkeling, maar ondersteuning voor dagelijkse zelfzorg en comfort.",
	"GentleStimulation": "Je geeft de voorkeur aan milde, geleidelijke ondersteuning. Een rustige opbouw helpt ontspannen te blijven.",
	"PointStimulation": "Je zoekt gerichte ondersteuning voor specifieke zones, bijvoorbeeld bij lokale spanning of ongemak.",
	"WaveStimulation": "Je bent geïnteresseerd in moderne luchtdruktechnologie die zorgt voor een ander type zachte, ritmische ondersteuning.",
	"DeepMassage": "Je ervaart baat bij diepere, ontspannende ondersteuning van de bekkenbodem. Belangrijk is gecontroleerde intensiteit en comfort.",
	"DelicateDesign": "Een zacht, minimalistisch design geeft je vertrouwen. Comfort en discreet gebruik staan voorop.",
	"PremiumDesign": "Kwaliteit en duurzaamheid zijn belangrijk. Je kiest bewust voor betrouwbare materialen en doordachte ergonomie.",
	"PlayfulDesign": "Toegankelijkheid en een vriendelijke uitstraling helpen je om ontspannen te starten met intieme zelfzorg.",
	"DiscreetDesign": "Privacy en subtiliteit zijn belangrijk. Compacte, stille oplossingen passen bij jouw behoefte aan discretie."
};



const quizData = [
{
	id: "start",
	bg: "./img/q-start.webp",
	html: `
	<img class="logo" src="./img/logo.webp" alt="logo" width="128" height="114">
	<p>Onze winkel heeft samen met gezondheidsexperts een korte quiz samengesteld — zodat jij kunt ontdekken welke oplossing voor intieme wellness past bij jouw comfort en zelfzorg.</p>
	<p>Drie korte vragen. Geen goed of fout. Alleen gericht op welzijn.</p>
	`,
	isStart: true
},
{
	id: "q1",
	includeInUrl: true,
	title: "Waar wil je ondersteuning bij?",
	bg: "./img/q1.webp",
	options: [
	{ key: "FirstExperience", text: "Mijn eerste kennismaking" },
	{ key: "SoloPractices", text: "Ontspanning en zelfzorg" },
	{ key: "PartnerGames", text: "Samen comfort en communicatie" },
	{ key: "SensualWellness", text: "Algemeen welzijn en balans" },
	{ key: "FirstExperience", text: "Weet ik nog niet" },
	]
},
{
	id: "q2",
	includeInUrl: true,
	title: "Welk type comfort ervaar je als prettig?",
	bg: "./img/q2.webp",
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
	bg: "./img/q3.webp",
	options: [
	{ key: "DelicateDesign", text: "Zacht en minimalistisch" },
	{ key: "PremiumDesign", text: "Duurzaam en hoogwaardig" },
	{ key: "PlayfulDesign", text: "Toegankelijk en vriendelijk" },
	{ key: "DiscreetDesign", text: "Compact en discreet" }
	]
},
{
	id: "final",
	bg: "./img/q-final.webp",
	html: "<p>Dit is uitsluitend ter informatie. Raadpleeg een arts of specialist voor medisch advies of diagnose.</p>",
	isFinal: true
}
];

if (document.querySelector('#quiz-app')) {


	let currentStep = 0;
	const selections = [];


	function init() {
		checkCookieConsent();
		renderAllSections();
		loadFromLocalStorage();
		handleRouting();
		window.addEventListener('hashchange', handleRouting);
	}


	function loadFromLocalStorage() {
		const saved = sessionStorage.getItem('quiz_results');
		if (saved) {
			const data = JSON.parse(saved);
			if (data.answers) {
				selections.length = 0;
				data.answers.forEach(val => selections.push(val));
			}
		}
	}

	function renderAllSections() {
		const container = document.getElementById('sections-container');
		quizData.forEach((step, index) => {
			const section = document.createElement('section');
			section.className = `quiz-section step-${index}`;
			section.id = `step-${index}`;

			let content = '';
			if (step.isStart) {
				content = `
				${step.html}
				<button class="btn btn-primary" onclick="nextStep()">Start</button>
				${legalFooterHtml} `;
			} else if (step.isFinal) {
				content = `
				${step.html}
				<div id="results-description"></div>
				<div id="final-actions">
				<a href="#" id="direct-link" class="btn btn-primary mt0">Resultaat weergeven</a>
				</div>
				${legalFooterHtml} `;
					/*
					<input type="email" id="email" placeholder="E-mailadres" required>
					<button class="btn btn-primary" onclick="finishWithEmail()">Verstuur & Bekijk resultaat</button>
					*/
				} else {
					content = `<h2>${step.title}</h2>`;
					step.options.forEach(opt => {
						content += `<button class="btn" onclick="makeSelection('${opt.key}')">${opt.text}</button>`;
					});
				}

				section.innerHTML = `<div class="screen">${content}</div>`;
				container.appendChild(section);
			});
	}



	function handleRouting() {
		const hash = window.location.hash.replace('#step-', '');
		currentStep = hash ? parseInt(hash) : 0;

		const nextBg = quizData[currentStep].bg;
		if (nextBg) {
			document.body.style.backgroundImage = `url('${nextBg}')`;
		}

		document.querySelectorAll('.quiz-section').forEach((s, idx) => {
			s.classList.toggle('active', idx === currentStep);
		});

		const progress = (currentStep / (quizData.length - 1)) * 100;
		document.getElementById('progress').style.width = `${progress}%`;

		if (quizData[currentStep].isFinal) {

			// injectDescriptions();
			updateFinalLink();

			try {
				fbq('trackSingle', pix.quiz, 'CompleteRegistration', {
					content_name: 'Quiz Complete',
					status: true
				});
			} catch(e) {
				console.log(e);
			}
		}
	}


	function injectDescriptions() {
		const descContainer = document.querySelector('.step-' + currentStep + ' #results-description');
		if (!descContainer) return;

		descContainer.innerHTML = '';
		selections.forEach(key => {
			if (descriptions[key]) {
				const p = document.createElement('p');
				p.textContent = descriptions[key];
				descContainer.appendChild(p);
			}
		});
	}


	function nextStep() {
		const next = currentStep + 1;

		if (currentStep === 0) {
			try {
				fbq('trackSingle', pix.quiz, 'ViewContent', {
					content_name: 'Quiz Start'
				});
			} catch(e) {
				console.log(e);
			}
		}

		if (next < quizData.length) window.location.hash = `step-${next}`;
	}


	function makeSelection(key) {
		const questionIdx = currentStep - 1;
		selections[questionIdx] = key;

		try {
			fbq('trackSingleCustom', pix.quiz, 'QuizAnswer');
		} catch(e) {
			console.log(e);
		}

		sessionStorage.setItem('quiz_results', JSON.stringify({ answers: selections }));
		nextStep();
	}


	function generateFinalUrl() {
		const currentQueryParams = window.location.search;

		// Собираем только ключи вопросов с includeInUrl !== false
		const urlKeys = selections.filter((key, idx) => {
			const questionStep = quizData.find(q => q.id === `q${idx + 1}`);
			return questionStep && questionStep.includeInUrl !== false;
		});

		const quizResultsPath = urlKeys.join('+');
		// let finalUrl = baseUrl +'?q='+ quizResultsPath;
		let finalUrl = baseUrl;

		if (currentQueryParams) {
			const separator = finalUrl.includes('?') ? '&' : '?';
			finalUrl += separator + currentQueryParams.substring(1);
		}

		return finalUrl;
	}


	// // Отправляет все ответы (включая те, что не в ссылке) POST-запросом
	// async function sendAnswersToServer(extraData = {}) {
	// 	// Формируем объект: { q1: "key", q2: "key", ... }
	// 	const payload = {};
	// 	selections.forEach((key, idx) => {
	// 		payload[`q${idx + 1}`] = key;
	// 	});

	// 	// Добавляем дополнительные данные (например, email)
	// 	Object.assign(payload, extraData);

	// 	try {
	// 		await fetch(postUrl, {
	// 			method: "POST",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify(payload)
	// 		});
	// 	} catch (err) {
	// 		console.error("Fout bij verzenden van antwoorden:", err);
	// 	}
	// }


	function updateFinalLink() {
		const linkElem = document.querySelector('.step-' + currentStep + ' #direct-link');
		if (linkElem) linkElem.href = generateFinalUrl();
	}


	async function finishWithEmail() {
		const email = document.getElementById('email').value;
		if (!email.includes('@')) return alert('Voer аub een geldig e-mailadres in.');

		// await sendAnswersToServer({ email }); // отправляем ответы + email на сервер
		window.location.href = generateFinalUrl();
	}

	function checkCookieConsent() {
		const consent = localStorage.getItem('cookie_consent');
		const banner = document.getElementById('cookie-banner');

		if (!consent) {
			banner.style.display = 'block';
		} else if (consent === 'granted') {
			try {
				// fbq('consent', 'grant');
				pixelInit();
			} catch(e) {
				console.log(e);
			}
		}
	}

	async function pixelInit() {
		if (window._pixelReady) return;
		window._pixelReady = true;

		!function(f,b,e,v,n,t,s)
		{if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
		// fbq('consent', 'revoke');

		fbq('set', 'autoConfig', false, pix.quiz);
		fbq('set', 'autoConfig', false, pix.aloha);
		fbq('set', 'automaticMatching', false, pix.quiz);
		fbq('set', 'automaticMatching', false, pix.aloha);
		fbq('init', pix.quiz);
		fbq('init', pix.aloha);
		fbq('track', 'PageView');
		/*
		fbq('init', pix.quiz, {autoConfig: false, automaticMatching: false}, {autoConfig: false, automaticMatching: false});
		fbq('init', pix.aloha, {autoConfig: false, automaticMatching: false}, {autoConfig: false, automaticMatching: false});
		*/
		/*
		fbq('init', pix.quiz, {autoConfig: false, automaticMatching: false});
		fbq('init', pix.aloha, {autoConfig: false, automaticMatching: false});
		fbq('trackSingle', pix.quiz, 'PageView');
		fbq('trackSingle', pix.aloha, 'PageView');
		*/

	}

	function acceptCookies() {
		document.getElementById('cookie-banner').style.display = 'none';
		localStorage.setItem('cookie_consent', 'granted');
		try {
			pixelInit();
		} catch(e) {
			// console.log(e);
		}
	}

	function declineCookies() {
		localStorage.setItem('cookie_consent', 'denied');
		// Пиксель останется в режиме 'revoke' и не будет слать данные
		document.getElementById('cookie-banner').style.display = 'none';
	}


	init();

}
