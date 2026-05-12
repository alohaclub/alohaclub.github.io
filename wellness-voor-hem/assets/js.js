const pix = {
	aloha: '1935071070694393',
	quiz: '2664730533928587',
}

checkCookieConsent();

function checkCookieConsent() {
	const consent = localStorage.getItem('cookie_consent');
	const banner = document.getElementById('cookie-banner');
	localStorage.setItem('ses', '1');

	if (!consent) {
		document.body.style.overflow = 'hidden';
		banner.style.display = 'flex';
	} else if (consent === 'granted') {
		try {
			// fbq('consent', 'grant');
			pixelInit()
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

	fbq('set', 'autoConfig', false, pix.quiz);
	fbq('set', 'autoConfig', false, pix.aloha);
	fbq('set', 'automaticMatching', false, pix.quiz);
	fbq('set', 'automaticMatching', false, pix.aloha);
	fbq('init', pix.quiz);
	fbq('init', pix.aloha);
	fbq('track', 'PageView');
}

function acceptCookies() {
	localStorage.setItem('cookie_consent', 'granted');
	document.body.style.overflow = '';
	try {
		// fbq('consent', 'grant');
		pixelInit();
	} catch(e) {
		console.log(e);
	}
	document.getElementById('cookie-banner').style.display = 'none';
}

(function () {
	const params = new URLSearchParams(window.location.search);
	if (!params.toString()) return;

	document.querySelectorAll('a.review-btn').forEach(link => {
		const url = new URL(link.href, window.location.origin);
		params.forEach((value, key) => url.searchParams.set(key, value));
		link.href = url.toString();
	});
})();

// ── PRODUCT ACCORDIONS (independent toggle) ──
document.querySelectorAll('[data-product]').forEach(acc => {
	const btn = acc.querySelector('.product-trigger');
	const panel = acc.querySelector('.product-panel');

	btn.addEventListener('click', () => {
		const isOpen = acc.classList.contains('open');
		acc.classList.toggle('open', !isOpen);
		panel.classList.toggle('open', !isOpen);
		btn.setAttribute('aria-expanded', String(!isOpen));
	});
});

// ── FAQ ACCORDIONS ──
document.querySelectorAll('.faq-item').forEach(item => {
	item.querySelector('.faq-trigger').addEventListener('click', () => {
		item.classList.toggle('open');
	});
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(
	entries => entries.forEach(e => {
		if (e.isIntersecting) {
			e.target.classList.add('visible');
			observer.unobserve(e.target);
		}
	}), { threshold: 0.08 }
	);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));