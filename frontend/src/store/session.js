// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const CHANGE_THEME = "session/CHANGE_THEME";

// Actions
const setUser = (data) => ({
	type: SET_USER,
	data
});
const removeUser = () => ({
	type: REMOVE_USER,
});

export const changeTheme = (theme) => ({
	type: CHANGE_THEME,
	theme
});


// Thunks
export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {"Content-Type": "application/json"}
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) return;
		dispatch(setUser(data));
	};
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({email, password})
	});

	const data = await response.json();
	if (response.ok) dispatch(setUser(data));
	return data;
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {"Content-Type": "application/json"}
	});

	if (response.ok) dispatch(removeUser());
};

export const signUp = (user) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstName: user.firstName,
			lastName: user.lastName,
			companyName: user.companyName || '',
			email: user.email,
			work_email: user.workEmail,
			phone_number: user.phone,
			age: user.age,
			username: user.username,
			password: user.password,
			confirmPassword: user.confirmPassword
		})
	});

	const data = await response.json();
	
	if (response.ok) {
		dispatch(setUser(data));
	}
	
	return data
};

export const changeThemeThunk = (userId, theme) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/theme`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			theme
		})
	});
	
	const data = await response.json();
	
	if (response.ok) {
		dispatch(changeTheme(theme));
		dispatch(setUser(data));
	}
	
	return data;
};



const initialState = { 
	user: null, 
	theme: 'light'
};
export default function reducer(state = initialState, action) {
	let newState = {...state}
	switch (action.type) {
		case SET_USER:
			newState.user = action.data;
			return newState;
		case REMOVE_USER:
			newState.user = null;
			return newState;
		case CHANGE_THEME:
			newState.theme = action.theme;
			return newState;
		default:
			return state;
	};
};
