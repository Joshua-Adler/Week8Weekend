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
export async function findName(token, username, login, redirect) {
	let response = await axios.get('https://fakestoreapi.com/users');
	let data = response.data;
	let name = '?????';
	for (let user of data) {
		if (user.username === username) {
			name = `${user.name.firstname} ${user.name.lastname}`;
			break;
		}
	}
	login(token, name);
	redirect();
}