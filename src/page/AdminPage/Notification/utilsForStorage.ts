import { TypeOrderData, TypeProductOrderedData } from "../../../types";

export const MAX_RANGE_OF_STORAGE = 50;

export const sortNotifsOlder = (notifs: TypeOrderData[]) => {
	return notifs.sort((prev, next) => {
		return (
			new Date(next.createdAt).getTime() - new Date(prev.createdAt).getTime()
		);
	});
};

export const getstorageNotifs = () => {
	const jsonStorageData = window.localStorage.getItem("recentNotifications");
	return jsonStorageData ? JSON.parse(jsonStorageData) : [];
};

export const alreadyInStorage = (order: TypeOrderData) => {
	const storageNotifs = getstorageNotifs();
	if (storageNotifs.length > 0) {
		const index = storageNotifs.findIndex(
			(storageOrder: TypeOrderData) => storageOrder.createdAt === order.createdAt
		);
		return index >= 0;
	}
};

export const saveReadNotifs = (readNotifs: TypeOrderData[]) => {
	const storageData = getstorageNotifs();
	if (readNotifs.length === 0 || storageData.length === 0) {
		return;
	} else {
		readNotifs.forEach((readNotif: TypeOrderData) => {
			if (!alreadyInStorage(readNotif)) {
				storageData.push(readNotif);
			}
		});
		while (storageData.length > MAX_RANGE_OF_STORAGE) {
			storageData.shift();
		}
		window.localStorage.setItem(
			"recentNotifications",
			JSON.stringify([...storageData])
		);
	}
};

export const amountNotifsCameWhenOffline = (allOrdersData: TypeOrderData[]) => {
	const storageData = getstorageNotifs();
	if (storageData.length > 0) {
		const lastSaveNotifOrder = storageData[storageData.length - 1];
		const index = allOrdersData.findIndex(
			(order: TypeOrderData) => order._id === lastSaveNotifOrder?._id
		);
		return allOrdersData.length - index - 1;
	}
	return 0;
};

export const getNewNotifOrders = (
	allOrdersData: TypeOrderData[],
	amountNewNotif: number
) => {
	const newNotifs: TypeOrderData[] = [];
	for (
		let i = allOrdersData.length - amountNewNotif;
		i < allOrdersData.length;
		i++
	) {
		newNotifs.push(allOrdersData[i]);
	}
	return newNotifs;
};

// export const updateNotifStorage = (newNotifOrders: TypeOrderData[]) => {
// 	const jsonStorageData = window.localStorage.getItem("recentNotifications");
// 	if (jsonStorageData) {
// 		let storageData = JSON.parse(jsonStorageData);
// 		storageData = [...storageData, ...newNotifOrders];
// 		while (storageData.length > MAX_RANGE_OF_STORAGE) {
// 			storageData.shift();
// 		}
// 		window.localStorage.setItem(
// 			"recentNotifications",
// 			JSON.stringify([...storageData])
// 		);
// 	}
// };

export const getTotalItems = (order: TypeOrderData) => {
	return order.products.reduce(
		(total: number, orderedProduct: TypeProductOrderedData) => {
			return total + orderedProduct.quantity;
		},
		0
	);
};
