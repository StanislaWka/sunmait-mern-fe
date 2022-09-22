import { RootState } from 'index';
import { select, SelectEffect } from 'redux-saga/effects';

export function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}
