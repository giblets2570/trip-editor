import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const userPageHash = {
  user: '/trips',
  manager: '/users',
  admin: '/users',
}

const userRoles = Object.keys(userPageHash);

const locationHelper = locationHelperBuilder({});

const userIsNotAuthenticated = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the trips page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/users',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // Determine if the user is authenticated or not
  authenticatedSelector: state => !state.auth.logged_in,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

const userIsAuthenticated = function(roles) {
  return connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: (state, ownProps) => {
      let route = '/';
      if(state.auth.user &&
        state.auth.user.role &&
        userRoles.indexOf(state.auth.user.role) !== -1){
        route = userPageHash[state.auth.user.role];
      }
      return route;
    },
    // This prevents us from adding the query parameter when we send the user away from the login page
    allowRedirectBack: false,
    // Determine if the user is authenticated or not
    authenticatedSelector: (state) => {
      return (
        state.auth.logged_in && 
        state.auth.user && 
        state.auth.user.role &&
        roles.indexOf(state.auth.user.role) !== -1
      )
    },
    // A nice display name for this check
    wrapperDisplayName: "UserIsAuthenticated"
  });
}

export {
  userIsNotAuthenticated,
  userIsAuthenticated
}