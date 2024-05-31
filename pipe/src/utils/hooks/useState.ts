type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

/**
 * Returns a stateful value, and a function to update it.
 *
 * @version 16.8.0
 * @see {@link https://react.dev/reference/react/useState}
 */
function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
// convenience overload when first argument is omitted
/**
 * Returns a stateful value, and a function to update it.
 *
 * @version 16.8.0
 * @see {@link https://react.dev/reference/react/useState}
 */
// function useState<S = undefined>(): [
//   S | undefined,
//   Dispatch<SetStateAction<S | undefined>>
// ];

export default useState;
