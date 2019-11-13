import React from 'react'
import verifyScope from '../utils/verifyScope'

const ProtectedElement = ({ scope, requiredScope, callback, children }) =>
  verifyScope(scope, requiredScope) ? children : null

export default ProtectedElement
