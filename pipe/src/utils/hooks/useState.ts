function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  let state = initialValue;
  const getState = () => state;
  const setState = (newValue: T) => {
    state = newValue;
  };

  console.log("state ", state);
  return [getState(), setState];
}

export default useState;
