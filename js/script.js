'use strict';

window.addEventListener('DOMContentLoaded', () => {
	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabParant = document.querySelector('.tabheader__items');

	//Создали функцию скрывабщую контент табов и убирающую класс активности у табов
	function hideTabContent () {
		tabsContent.forEach(item => {
			// item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show', 'fade');

			tabs.forEach(item => {
				item.classList.remove('tabheader__item_active');
			});
		});
	}

	//Создали функцию показа контента табов и добавление класса активности для таба по номеру №
	function showTabContent (i = 0) {
		// tabsContent[i].style.display = 'block';
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();   
	showTabContent();

	//Создали событие на клик по табам, проверили на условие, что б клик был именно на элемент таба а не на родителя и при вызове функции showTabContent передаем туда агрумент номера №  
	tabParant.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();   
					showTabContent(i); 
				}
			});
		}
	});

	//Timer
	const deadline = '2023-03-27';

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());
		if (t <= 0 ) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60) % 24));
			minutes = Math.floor((t / 1000 / 60) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();
		
		function updateClock() {
			const t = getTimeRemaining(endtime);
			
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	//Modal window
	const showModal = document.querySelectorAll('[data-modal]'),
		  modal = document.querySelector('.modal');

	function openModalWindow() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerID);
	}

	showModal.forEach(btn => {
		btn.addEventListener('click', openModalWindow);
	});

	function closeModalWindow() {
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModalWindow();
		}
	});

	document.addEventListener('keydown', (e) =>{
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModalWindow();
		}
	});

	//Show modal after scroll down or TimeOut
	const modalTimerID = setTimeout(openModalWindow, 50000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModalWindow();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	//Использование class для карточек
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector); 
			this.transfer = 37;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	const getRosurce = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		} 

		return  await res.json();
	};

	getRosurce('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// axios.get('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.data.forEach(({img, altimg, title, descr, price}) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	// getRosurce('http://localhost:3000/menu')
	// 	.then(data => createCard(data));

	// function createCard(data) {
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');
	// 		price = price * 37;

	// 		element.classList.add('menu__item');

	// 		element.innerHTML = `
	// 			<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 			</div>
	// 		`;

	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }

	//Forms. Спинер на форме и уведомления об операции отправки
	
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return  await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto
			`; 
			// form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);
			
			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries())); 

			//Fetch API
			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModalWindow();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() =>{
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModalWindow();
		}, 4000);
	}

	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));
	
	//Slider
	const prev = document.querySelector('.offer__slider-prev'),
		  next = document.querySelector('.offer__slider-next'),
		  slides = document.querySelectorAll('.offer__slide'),
		  slider = document.querySelector('.offer__slider'),
		  current = document.querySelector('#current'),
		  total = document.querySelector('#total'),
		  //Доп перемененные лоя 2 варианта
		  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		  slidesField = document.querySelector('.offer__slider-inner'),
		  width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	//Second simple variant of slider
	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	//slider dotteds
	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		  dots = [];

	indicators.classList.add('carousel-indicators');

	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;

	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;	
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	//end of dotteds ------

	function forDots(item) {
		item.forEach(dot => dot.style.opacity = '.5');
		item[slideIndex - 1].style.opacity = 1;
	}

	function onlyNumber(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset == onlyNumber(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += onlyNumber(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		forDots(dots);
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = onlyNumber(width) * (slides.length - 1);
		} else {
			offset -= onlyNumber(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		forDots(dots);
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = onlyNumber(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			forDots(dots);		
		});
	});

	//First simple variant of slider
	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => item.classList.add('hide', 'fade'));

	// 	slides[slideIndex - 1].classList.remove('hide');

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(+1);
	// });

	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}
	//Calculating of Call выше переменные и ниже код выполнения

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio') ) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____ ';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 *weight) + (3.1 * height) - (4.3 * age)) * ratio);
		}
		else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}
	
	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
	
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
	
				e.target.classList.add(activeClass);
	
				calcTotal();
			});
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '2px solid red';
			} else {
				input.style.border = 'none';
			}

			switch (input.getAttribute('id')) {
			case 'height':
				height = +input.value;
				break;
			case 'weight':
				weight = +input.value;
				break;
			case 'age':
				age = +input.value;
				break;
			}

			calcTotal();
		});

	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');

});



//Rest operator
// const log = function(a, b, ...rest) {
//     console.log(a, b, rest);
// }

// log('basic', 'rest', 'operator', 'usage');

// function calcOrDouble(num, basis=2) {
// basis = basis || 2; //Раньше делали так, но это ненадежно
//     console.log(num * basis);
// }

// calcOrDouble(3,10);

//Json Operator
// const persone = {
//     name: 'Alex',
//     tel: '+380506777354',
//     parents: {
//         mom: 'Olga',
//         dad: 'Mike'
//     }
// };

// const clone = JSON.parse(JSON.stringify(persone));
// clone.parents.mom = 'Ann';
// console.log(persone);
// console.log(clone);

//Promise (ES6)
// console.log('Запрос данных...');

// const req = new Promise((resolve, reject) => { // resolve - если выполнилось правильно, rect - не выполнилось
//     setTimeout(() => {
//         console.log('Подготовка данных...');
	
//         const product = {
//             name: 'TV',
//             price: 2000
//         };
	
//         resolve(product);
//     }, 2000);
// });

// req.then((product) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'order';
//             resolve(product);
//             // reject();
//         }, 2000);
//     });
// }).then(data => {
//     data.amount = 11;
//     data.modify = true;
//     return data;
// }).then(data => {
//     console.log(data);
// }).catch(() => {
//     console.error('Произошла ошибка');
// }).finally(() => {
//     console.log('Finally')
// });

//methods all, race
// const test = time => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(), time);
//     });
// };

// test(1000).then(() => console.log('1000 ms'));
// test(2000).then(() => console.log('2000 ms'));

// Promise.all([test(1000), test(2000)]).then(() => {
//     console.log('All');
// });

// Promise.race([test(1000), test(2000)]).then(() => {
//     console.log('All');
// });

//Fetch API
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({name: 'Alex'}),
//     headers: {
//         'Content-type': 'application/json'
//     }
// })
//   .then(response => response.json())
//   .then(json => console.log(json));



//Методы перебора массивов
//Метод ForEach никогда не возвращает массив, он их только перебирает

//Метод FILTER - фильтрует элементы внутри массива
// const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];

// const shorNames = names.filter(function(name) {
//     return name.length < 5;
// });

// console.log(shorNames);

//Метод MAP - позволяет взять исходный массив и изменить каждый элемент внутри него
// const answers = ['IvAn', 'AnnA', 'Hello'];

// const result = answers.map(item => item.toLowerCase());

// console.log(result);

//Методы EVERY и SOME - два метода, которые очень похожи по структуре и по задачам. Он берет массив и перебирает его и если хотя бы 1 элемент подходит по заданному условию, то он вернет true, а если нет, то - false
// const some = [4, 'ffefef', 'DEddd']; 

// console.log(some.some(item => typeof(item) === 'number'));
// console.log(some.every(item => typeof(item) === 'number'));

//Метод REDUCE - он для того, что бы схлопывать или собирать массив в одно единое целое
// const arr = [4, 5, 1, 3, 2, 6];

//first example
// const res = arr.reduce((sum, current) => sum + current);

// console.log(res);

//second example
// const arr = ['orange', 'apple', 'melon', 'banana'];

// const res = arr.reduce((sum, current) => sum + ', ' + current);

// console.log(res);

//standart example
// let sumOfArray = 0;
// arr.forEach(item => {
//     sumOfArray += item;
// });
// console.log(sumOfArray);

// const obj = {
//     ivan: 'persone',
//     ann: 'persone',
//     dog: 'animal',
//     cat: 'animal'
// };

// const newArray = Object.entries(obj)
// .filter(item => item[1] === 'persone')
// .map(item => item[0]);

// console.log(newArray);

//Метод FILTER - фильтрует элементы внутри массива
//Метод MAP - позволяет взять исходный массив и изменить каждый элемент внутри него
//Методы EVERY и SOME - два метода, которые очень похожи по структуре и по задачам. Он берет массив и перебирает его и если хотя бы 1 элемент подходит по заданному условию, то он вернет true, а если нет, то - false
//Метод REDUCE - он для того, что бы схлопывать или собирать массив в одно единое целое

//LOCAL STORAGE

// localStorage.setItem('number', 5);

// localStorage.removeItem('Aumber'); localStorage.clear() - очистить всё

// console.log(localStorage.getItem('number'));


//Getter and Setter
// const persone = {
// 	name: 'Alex',
// 	age: 25,

// 	get userAge() {
// 		return this.age; 
// 	},

// 	set userAge(num) {
// 		this.age = num;
// 	}
// };

// console.log(persone.userAge = 30);
// console.log(persone.userAge);


//ИНКАПСУЛЯЦИ
// class User {
// 	constructor(name, age) {
// 		this.name = name;
// 		this._age = age;
// 	}

// 	#surname = 'Pochechun';

// 	say = () => {
// 		console.log(`Имя пользователя: ${this.name} ${this.#surname}, возраст: ${this._age}`);
// 	}

// 	get age() {
// 		return this._age;
// 	}

// 	set age(age) {
// 		if (typeof age === 'number' && age > 0 && age < 110) {
// 			this._age = age;
// 		} else {
// 			console.log(`Недопустимое значение: ${age}`);
// 		}
// 	}
// }

// const ivan = new User('Vladyslav', 20);
// // console.log(ivan.age); //getter
// // ivan.age = 99; //setter
// // console.log(ivan.age);
// console.log(ivan.surname);
// ivan.say();