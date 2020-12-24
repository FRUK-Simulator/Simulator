import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

export enum ChallengeStatus {
  Pending,
  Failure,
  Success,
}

export type ChallengeInfo = {
  status: ChallengeStatus;
  id: string;
};

export const challengeSlice = createSlice({
  initialState: {
    challengeInfos: [] as ChallengeInfo[],
  },
  name: "challenge",
  reducers: {
    setChallengeStatus(
      state,
      action: PayloadAction<{ status: ChallengeStatus; id: string }>
    ) {
      const challengeIndex = state.challengeInfos.findIndex(
        (i) => i.id === action.payload.id
      );
      // If it's a new challenge, just accept any state that is being set
      if (challengeIndex === -1) {
        state.challengeInfos.push({
          status: action.payload.status,
          id: action.payload.id,
        });
        return state;
      }

      const currState = state.challengeInfos[challengeIndex].status;

      // If the challenge is already marked as success then do nothing
      if (currState === ChallengeStatus.Success) return state;
      if (currState === ChallengeStatus.Failure) {
        if (action.payload.status === ChallengeStatus.Pending) {
          state.challengeInfos[challengeIndex].status = ChallengeStatus.Pending;
        }
      }
      // Every transition from Pending is valid
      else {
        state.challengeInfos[challengeIndex].status = action.payload.status;
      }

      return state;
    },
  },
});

export const getChallengeInfo = (state: RootState) =>
  state.challenge.challengeInfos;
