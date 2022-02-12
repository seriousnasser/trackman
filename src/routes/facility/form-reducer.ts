import { FacilityEntity } from 'models/Facility';
import { Reducer } from 'react';

enum ActionType {
  CHANGE = 'CHANGE',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SUBMITTING = 'SUBMITTING',
  PENDING = 'PENDING',
  READY = 'READY',
  ERROR = 'ERROR',
}

export type Values = Partial<Omit<FacilityEntity, 'id' | 'createdAt'>>;

export interface State {
  isSubmitting: boolean;
  isFailed: boolean;
  isPending: boolean;
  values: Values;
  errors: Values;
}

export interface Action {
  type: ActionType;
  values: Values;
}

export const initialState: State = {
  values: {
    name: '',
    type: 'range',
    address: '',
  },
  isSubmitting: false,
  isPending: false,
  errors: {},
  isFailed: false,
};

function changeAction(values: Values): Action {
  return { type: ActionType.CHANGE, values };
}

function validateAction(values: Values): Action {
  return { type: ActionType.VALIDATION_ERROR, values };
}

function submitAction(): Action {
  return { type: ActionType.SUBMITTING, values: {} };
}

function pendingAction(): Action {
  return { type: ActionType.PENDING, values: {} };
}

function readyAction(): Action {
  return { type: ActionType.READY, values: {} };
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.values,
        },
      };

    case ActionType.VALIDATION_ERROR:
      return {
        ...state,
        errors: action.values,
      };

    case ActionType.SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
        isPending: true,
      };

    case ActionType.PENDING:
      return {
        ...state,
        isPending: true,
      };

    case ActionType.READY:
      return {
        ...state,
        isPending: false,
      };

    default:
      throw new Error(`Unhandled action type="${action.type}"`);
  }
};

export {
  changeAction,
  validateAction,
  submitAction,
  pendingAction,
  readyAction,
  reducer,
};
