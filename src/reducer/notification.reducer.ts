import * as types from "../action/actionType";
import { Reducer } from "redux";
import { TypeOrderData, NotifActions } from "../types";
import { saveReadNotifs } from "../page/AdminPage/Notification/utilsForStorage";

interface IInitState {
	currentNotifications: TypeOrderData[];
	hasNewNotif: boolean;
}

const initState: IInitState = {
	currentNotifications: [],
	hasNewNotif: false,
};

const notificationReducer: Reducer<IInitState, NotifActions> = (
	state = initState,
	action
) => {
	switch (action.type) {
		case types.PUSH_NEW_NOTIFICATION: {
			// console.log(state.currentNotifications);

			const newData = action.payload
				? [...state.currentNotifications, ...action.payload]
				: [...state.currentNotifications];
			return {
				...state,
				currentNotifications: [...newData],
			};
		}
		case types.DELETE_ALL_NOTIFICATIONS: {
			saveReadNotifs([...state.currentNotifications]);
			return {
				...state,
				currentNotifications: [],
			};
		}
		case types.DELETE_A_NOTIFICATION: {
			if (action.payload) {
				saveReadNotifs(action.payload);
				const deleteId = action.payload[0]._id;
				const newData = [...state.currentNotifications].filter(
					(order: TypeOrderData) => order._id !== deleteId
				);
				return {
					...state,
					currentNotifications: [...newData],
				};
			} else {
				return state;
			}
		}
		case types.NOT_HAVE_NEW_NOTIF: {
			return {
				...state,
				hasNewNotif: false,
			};
		}
		case types.HAVE_NEW_NOTIF: {
			return {
				...state,
				hasNewNotif: true,
			};
		}
	}
	return state;
};

export default notificationReducer;
