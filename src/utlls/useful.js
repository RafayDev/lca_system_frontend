const extractUserIdFromToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jwtPayload = JSON.parse(window.atob(base64));
  const userId = jwtPayload.user.id;
  return userId;
};

const extractPermissionsFromToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jwtPayload = JSON.parse(window.atob(base64));
  const permissions = jwtPayload.user.permissions;
  return permissions;
};

export { extractUserIdFromToken, extractPermissionsFromToken };
