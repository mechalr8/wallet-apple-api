const authenticationContextReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return {
                user: action?.email
            }
        case 'signout':
            return {
                user: null
            }

    }
}
export default authenticationContextReducer;
