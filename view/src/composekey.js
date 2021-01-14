function formatString (subkey) {
		return `${subkey.replace(/\s/g, '-').replace(/\(/g, '').replace(/\)/g, '').toLowerCase()}`;
};

export default function composeKey (substring) {
		function composer (nextSubstring) {
			if (!nextSubstring) {
				return formatString(substring);
			} else {
				substring = `${substring}-${nextSubstring}`;
				return composer;
			}
		}
		return composer;
};
