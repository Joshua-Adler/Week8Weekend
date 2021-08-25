import axios from 'axios'

// Limit a string's length to len, adding '...' as needed
export function limLen(str, len) {
	if(str.length > len) return str = str.slice(0, len - 3) + '...';
	return str;
}

// This Function Does Something That Will Never Be Revealed, Don't Even Try To Understand It
export function titleCase(str) {
	return str.toLowerCase().split(' ').map(
		function(word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		}
	).join(' ');
}

// Formats a price. ex. 22.3 => $22.30, 25 => $25
export function formatPrice(price) {
	return `$${price}${price !== Math.floor(price) && price * 100 % 10 === 0 ? '0' : ''}`
}

// There's no way to get the user from the username :/
export async function findUser(token, username, login, redirect) {
	let response = await axios.get('https://fakestoreapi.com/users');
	let data = response.data;
	let user = null;
	for (let iUser of data) {
		if (iUser.username === username) {
			user = iUser;
			break;
		}
	}
	login(token, user, username);
	redirect();
}

class Cart {
	constructor(cart) {
		// Is there an easier way to do this?
		this.id = cart.id;
		this.userId = cart.userId;
		this.date = cart.date;
		this.products = cart.products;
	}

	// Calling this isn't necessary because the API doesn't actually do anything,
	// but I do it anyway because I would need to if it did do anything
	async update(callback) {
		let cart = await axios.get(`https://fakestoreapi.com/carts/${this.id}`);
		cart = cart.data;
		this.date = cart.date;
		this.products = cart.products;
		callback();
	}

	// The docs are really vague on how this works, but considering that put & patch are
	// both available, and according to wikipedia, "the PATCH method supplies a set of
	// instructions to modify the resource.", I'm going to assume this is probably
	// how it works. It doesn't seem to return an error.
	add(product) {
		axios.patch(`https://fakestoreapi.com/carts/${this.id}`, {
			products:[{ productId: product.id, quantity: 1 }]
		});
	}

	productSum() {
		let sum = 0;
		for(let product of this.products) {
			sum += product.quantity;
		}
		return sum;
	}
}

// Little note: users can actually have multiple carts. The only logical conclusion is
// that this is a mistake, so I ignore all but the first cart found
export async function findCart(id, callback) {
	let response = await axios.get('https://fakestoreapi.com/carts');
	let data = response.data;
	for(let cart of data) {
		if(cart.userId === id) {
			cart = new Cart(cart);
			callback(cart);
			return;
		}
	}
	let cart = new Cart({
		id: null,
		userId: id,
		date: 'A date that definitely exists',
		products: []
	});
	// Override this so no shenanigans happen
	cart.update = () => { return; };
	callback(cart);
}