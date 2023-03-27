'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const tabs = require('./modules/tabs');
	const modal = require('./modules/modal');
	const calc = require('./modules/calc');
	const forms = require('./modules/forms');
	const slider = require('./modules/slider');
	const timer = require('./modules/timer');
	const cards = require('./modules/cards');

	tabs();
	modal();
	timer();
	cards();
	calc();
	forms();
	slider();
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


//Прием модуль
// const app = '123';
// const num = 1;
// //1 approach
// (function(){
// 	let num = 2;
// 	console.log(num);
// 	console.log(num + 3);
// }());

// console.log(num);
// //second approach
// const user = (function(){
// 	function privat() {
// 		console.log('I am a privat');
// 	}

// 	return {
// 		sayHi: privat
// 	};
// }()); 

// user.sayHi();