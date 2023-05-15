const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return auth ? (
    <Component {...rest} />
  ) : (
    <p>Please login to view this page.</p>
  );
};

export default ProtectedRoute;
