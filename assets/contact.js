
const formContainer = document.getElementById('form-container');

const formHtml = `
<form id="lead-form">
<input type="text" name="firstname" placeholder="Voornaam" required>
<input type="email" name="email" required placeholder="E-mailadres">
<label><input type="checkbox" name="isAdult" required>Ik bevestig dat ik 18+ ben</label>
<label><input type="checkbox" name="privacyAccepted" required>Ik accepteer het <a href="/privacy-policy.html">privacybeleid</a></label>
<button type="submit">Ontvang de gids</button>
</form>
`;

const injectFormStyles = () => {
	const css = `
	#form-container {
		max-width: 400px;
		margin: 20px auto;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0,0,0,0.1);
		font-family: sans-serif;
	}

	#lead-form {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	#lead-form input[type="text"],
	#lead-form input[type="email"] {
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
	}

	#lead-form label {
		font-size: 14px;
		display: flex;
		align-items: flex-start;
		gap: 8px;
		cursor: pointer;
	}

	#lead-form input[type="checkbox"] {
		margin-top: 3px;
	}

	#lead-form button {
		background-color: #007bff;
		color: white;
		padding: 12px;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		transition: background 0.3s;
	}

	#lead-form button:hover {
		background-color: #0056b3;
	}

	#lead-form a {
		color: #007bff;
		text-decoration: none;
	}
	`;

	const styleSheet = document.createElement("style");
	styleSheet.innerText = css;
	document.head.appendChild(styleSheet);
};


try {
	formContainer.innerHTML = formHtml;

	injectFormStyles();

	const form = document.getElementById('lead-form');

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const data = {
			firstname: formData.get('firstname'),
			email: formData.get('email'),
			isAdult: formData.get('isAdult') === 'on',
			privacyAccepted: formData.get('privacyAccepted') === 'on'
		};

		try {
			const response = await fetch('https://spring-cloud-86f4.time2out.workers.dev/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const result = await response.json();

			if (response.ok) {
				form.reset();

				form.style.transition = 'opacity 0.5s ease';
				form.style.opacity = '0';

				setTimeout(() => {
					formContainer.innerHTML = `
					<div id="success-message" style="text-align: center; padding: 20px;">
					<div style="font-size: 50px; color: #28a745; margin-bottom: 10px;">✓</div>
					<h3 style="margin-bottom: 10px;">Bedankt!</h3>
					<p>${result.message || 'Je gids is onderweg naar je e-mail.'}</p>
					<a href="https://www.facebook.com/profile.php?id=61589270080962" style="margin-top: 15px; background: none; border: 1px solid #ccc; cursor: pointer; padding: 5px 10px; border-radius: 4px;">Bekijk onze groep</a>
					</div>
					`;
				}, 500);
			} else {
				const errorMsg = document.createElement('p');
				errorMsg.style.color = 'red';
				errorMsg.innerText = 'Fout: ' + (result.message || 'Probeer het later opnieuw.');
				form.appendChild(errorMsg);
			}
		} catch (error) {
			console.error('Network error:', error);
			alert('Server connection failed');
		}
	});
} catch (e) {
	console.log(e);
} finally {
	console.log('form loaded');
}

function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.async = true;
		script.onload = () => resolve(script);
		script.onerror = () => reject(new Error(`error: ${src}`));
		document.head.append(script);
	});
}
function isShowCapcha() {
	const isChrome = /Chrome/.test(navigator.userAgent);

	const checks = {
		webdriver: navigator.webdriver === true,
		noPlugins: isChrome && navigator.plugins.length === 0,
		noLanguages: navigator.languages.length === 0,
		headlessUA: /HeadlessChrome/.test(navigator.userAgent),
	};

    // console.table(checks);
    return Object.values(checks).some(Boolean);
}

document.addEventListener('DOMContentLoaded', async function(event) {
	if (localStorage.getItem('ses') && !isShowCapcha()) {
		try {
			loadScript('/assets/gate.js').then(() => {})
			.catch(err => {
				console.error(err.message);
			});
		} catch(e) {
			console.log(e);
		}
	} else if (isShowCapcha()) {
		document.querySelector('#turnstile-container').style.display = 'flex';
		await loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js');

		turnstile.render('#turnstile-container', {
			sitekey: '0x4AAAAAADN33-XxYLv9o8zP',
			callback: function(token) {
				console.log('Captcha passed, token:', token);
				loadScript('/assets/gate.js').then(() => {})
				.catch(err => {
					console.error(err.message);
				});
				document.querySelector('#turnstile-container').style.display = 'none';
			},
		});
	}
});