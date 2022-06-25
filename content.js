var cfg = {
	keys: {
		goodsName: "PageUp",
		goodsPrice: "PageDown",
		paymentCash: 'Home',
		paymentCard: 'End',
		goodsQuantity: 'Delete',
		addPosition: '\\',
		goodsSale: '/',
		goodsMarkup: '*',
		plus: '+',
		minus: '-',
	},
	reactions: {
		goodsName: 'focus',
		goodsPrice: 'focus',
		paymentCash: 'focus',
		paymentCard: 'focus',
		goodsQuantity: 'focus',
		addPosition: 'click',
		goodsSale: 'focus',
		goodsMarkup: 'focus',
		plus: 'click',
		minus: 'click', 
	}
};
var assert = {
	raise(description='') {
		throw new Error(description)
	},
	bool(assertion, description='') {
		return assertion || assert.raise(description);
	},
 	element(element) {
		return assert.bool(element instanceof HTMLElement);
	},
};
var elements = {
	goodsName: document.getElementById('goodsName'),
	goodsPrice: document.getElementById('goodsPrice'),
	paymentCash: document.getElementById('paymentCash'),
	paymentCard: document.getElementById('paymentCard'),
	goodsQuantity: document.getElementById('goodsQuantity'),
	addPosition: document.getElementById('addPosition'),
	goodsSale: document.getElementById('goodsSale'),
	goodsMarkup: document.getElementById('goodsMarkup'),
	plus: document.querySelector('.sales-btn.sales-plus-btn.js-sales-plus.input-group-append'),
	minus: document.querySelector('.sales-btn.sales-minus-btn.js-sales-minus.input-group-prepend'),
};
function addHotKeyListener(id, key, type) {
	if (type === 'focus') {
		document.addEventListener('keydown', (e) => {
			attempt( (e) => {
				if (e.key !== key || e.repeat) return;
				elements[id].focus();
				e.preventDefault();
			}, e);
		});
		return;
	}
	if (type === 'click') {
		document.addEventListener('keydown', (e) => {
			attempt( (e) => {
				if (e.key !== key || e.repeat) return;
				elements[id].dispatchEvent(new Event('click', {bubbles: true}));
				e.preventDefault();
			}, e);
		});
		return;	
	}
}
function run() {
	for (var id in elements) {
		assert.element(elements[id]);
		addHotKeyListener(id, cfg.keys[id], cfg.reactions[id]);
		if (['plus', 'minus'].includes(id)) continue;
		if (['addPosition'].includes(id)) {
			elements[id].innerText += ' [ ' + cfg.keys[id] + ' ]';
			continue;
		}
		document.querySelector('label[for='+ id +']').innerText += ' [ ' + cfg.keys[id] + ' ]'
	}
}
function attempt(callback, ...args) {
	try { callback(...args); }
	catch (error) {
		alert('Ошибка в расширении Горячие клавиши Nurkassa.');
		console.log(error.stack);
	}
}


attempt(run);