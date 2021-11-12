/*
export type ActionsPayload = {

  setUserAction: [payload: string, returnVal: void];
};

export const actions: Actions = {
  setUserAction({ commit }, payload) {
    commit('changeUserName', payload);
  },
};

//   ---------------------- Actions no change code -----------------------------


type Actions = {
  [Property in keyof ActionsPayload]: (
    augContext: AugmentedActionContext,
    payload: ActionsPayload[Property][0]
  ) => ActionsPayload[Property][1];
};
*/

// A labeled tuple that has either one or two strings.
let d: [first: string, second?: string] = ['hello'];
d = ['hello', 'world'];

// A tuple with a *rest element* - holds at least 2 strings at the front,
// and any number of booleans at the back.
let e: [string, string, ...boolean[]];

e = ['hello', 'world'];
e = ['hello', 'world', true, false, true];

type FldArray = {
  id: [fldType: number, fldOptional: boolean];
};

type RecType = {
  [Property in keyof FldArray]: FldArray[Property][0];
};
