export const appReducer = (state = {}, action) => {
  switch (action.type) {
    case "COOL_UPDATE":
      return action.whatever;
    default:
      return;
  }
};
