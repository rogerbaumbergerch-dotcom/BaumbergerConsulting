const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

/**
 * Convert a camelCase string to snake_case.
 *
 * :param str: String to convert
 * :type str: string
 * :return: Converted snake_case string
 * :rtype: string
 */
const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * Get an app parameter value from URL query params or localStorage.
 *
 * Checks URL parameters first, then localStorage, then returns default.
 * Can optionally remove the parameter from the URL after extraction.
 *
 * :param paramName: Parameter name to retrieve
 * :type paramName: string
 * :param options: Optional configuration object
 * :type options: Object
 * :return: Parameter value or default
 * :rtype: string | null
 */
const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const storageKey = toSnakeCase(paramName);
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		storage.setItem(storageKey, searchParam);
		return searchParam;
	}
	if (defaultValue) {
		storage.setItem(storageKey, defaultValue);
		return defaultValue;
	}
	const storedValue = storage.getItem(storageKey);
	if (storedValue) {
		return storedValue;
	}
	return null;
};

/**
 * Get all app parameters from environment and storage.
 *
 * :return: Application parameters object
 * :rtype: Object
 */
const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		storage.removeItem('app_token');
	}
	return {
		appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_APP_ID }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
	};
};

export const appParams = {
	...getAppParams(),
};
