import { Store } from 'pullstate';

type State = {
  version: string;
};

/**
 * Store to handle global app state.
 */
const store = new Store<State>({
  version: '1.0.0',
});

export { store };
export type { State };
