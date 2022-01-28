export function setLocalStorage(storeName: string, content: any) {
	localStorage.setItem(storeName, JSON.stringify(content));
}
