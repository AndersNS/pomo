import { TimerConfig } from '../models';
import { createContext, ReactNode, useReducer, useContext } from 'react';

type Action = { type: 'update'; configs: TimerConfig[] };
type Dispatch = (action: Action) => void;
type State = TimerConfig[];

const defaultConfig: TimerConfig[] = [
  {
    id: '1',
    length: 25,
    type: 'focus',
  },
  {
    id: '2',
    length: 5,
    type: 'break',
  },
  { id: '3', length: 10, type: 'break' },
];

const TimerConfigContext = createContext<State | undefined>(undefined);
const TimerConfigDispatchContext = createContext<Dispatch | undefined>(
  undefined,
);

function configReducer(_state: State, action: Action) {
  switch (action.type) {
    case 'update': {
      return [...action.configs];
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TimerConfigProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configReducer, defaultConfig);

  return (
    <TimerConfigContext.Provider value={state}>
      <TimerConfigDispatchContext.Provider value={dispatch}>
        {children}
      </TimerConfigDispatchContext.Provider>
    </TimerConfigContext.Provider>
  );
}

function useTimerConfigs() {
  const context = useContext(TimerConfigContext);
  if (context === undefined) {
    throw new Error(
      'useTimerConfigs must be used within a TimerConfigProvider',
    );
  }

  return context;
}

function useTimerConfigDispatch() {
  const context = useContext(TimerConfigDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useTimerConfigs must be used within a TimerConfigProvider',
    );
  }

  return context;
}

export { TimerConfigProvider, useTimerConfigs, useTimerConfigDispatch };
