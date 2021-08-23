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