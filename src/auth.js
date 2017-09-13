
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const locationHelper = locationHelperBuilder({})

const userIsNotAuthenticated = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the trips page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/trips',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // Determine if the user is authenticated or not
  authenticatedSelector: state => {
    console.log(state);
    return !state.auth.logged_in;
  },
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

const userIsAuthenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: '/',
   // Determine if the user is authenticated or not
  authenticatedSelector: state => state.auth.logged_in,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

export {
  userIsNotAuthenticated,
  userIsAuthenticated
}