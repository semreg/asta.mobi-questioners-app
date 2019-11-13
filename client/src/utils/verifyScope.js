export default (scope, requiredScope) => requiredScope.reduce((acc, curr) =>
  scope.some(scopeItem => scopeItem === curr) ? acc : false, true)
