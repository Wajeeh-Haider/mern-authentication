const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState) return JSON.parse(serializedState);
    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export { saveState, loadState };
