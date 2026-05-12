const nextLinks = document.querySelectorAll('a.btn');
const to = {
	/*

	-- add item and go to checkout
	https://shop.nl/cart/52961265484112:1

	-- add item and go to storefront
	https://shop.nl/cart/52961265484112:1?storefront=true

	-- add +1 item and go to checkout
	https://shop.nl/cart/add?id=52961265484112

	-- add item and open collection
	https://shop.nl/cart/add?id=52961265484112&quantity=1&return_to=/collections/bestsellers

	add ".xml" to get product variant id in "<id>" tag, eg. https://shop.nl/products/item.xml
	search for <id type="integer">52770624373072</id>

	*/

	'best': 'https://www.alohaclub.nl/collections/bestsellers',
	// 52961265484112
	// 'scorpion': 'https://www.alohaclub.nl/products/scorpion-wetenschappelijk-bewezen-stimulatie',
	'scorpion': 'https://www.alohaclub.nl/cart/52961265484112:1?storefront=true',
	'undrw': 'https://www.alohaclub.nl/cart/52166721667408:1?storefront=true',
	// 10441039544656
	'aloha-control': 'https://www.alohaclub.nl/products/aloha-control-x',
}
const params = new URLSearchParams(window.location.search);
const q = params.get('q');

if (q && to[q]) {
	const forwardParams = new URLSearchParams();
	params.forEach((value, key) => {
		if (key !== 'q') forwardParams.set(key, value);
	});

	const queryString = forwardParams.toString();

	nextLinks.forEach(link => {
		link.href = to[q] + (queryString ? '?' + queryString : '');
	});
}