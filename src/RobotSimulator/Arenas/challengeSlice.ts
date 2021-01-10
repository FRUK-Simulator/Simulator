import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

export enum ChallengeStatus {
  Pending,
  Failure,
  Success,
  Pending_LastRunFailure,
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

      // The challenge status is being updated according to the state machine
      // below:
      //
      // o Once a challenge is marked as 'Success', it will stay that way.
      // o If a failure occurs, then a fresh attempt to solve the challenge
      //   can cause a transition to 'Pending_LastRunFailure', from which
      //   both 'Success' and 'Failure' are reachable.
      // o The 'Pending_LastRunFailure' state is our mechanism to
      //   memorize that we observed a failure for the current challenge
      //   in the past, but that the user has started over.
      //
      //                   (Start)
      //                 +---------+
      //       +---------+ Pending +--------+
      //       |         +---------+        |
      //       |                            |
      //       v                            v
      //  +----+----+                   +---+-----+
      //  | Failure +<--------+         | Success |
      //  +---+-----+         |         +-----+---+
      //      |               |               ^
      //      |               |               |
      //      |               |               |
      //      |    +----------+-------------+ |
      //      +--->+ Pending_LastRunFailure +-+
      //           +------------------------+

      const currState = state.challengeInfos[challengeIndex].status;

      if (currState === ChallengeStatus.Success) {
        return state;
      }

      if (currState === ChallengeStatus.Failure) {
        if (action.payload.status === ChallengeStatus.Pending) {
          state.challengeInfos[challengeIndex].status =
            ChallengeStatus.Pending_LastRunFailure;
        }
      } else if (currState === ChallengeStatus.Pending_LastRunFailure) {
        if (action.payload.status === ChallengeStatus.Success) {
          state.challengeInfos[challengeIndex].status = ChallengeStatus.Success;
        } else if (action.payload.status === ChallengeStatus.Failure) {
          state.challengeInfos[challengeIndex].status = ChallengeStatus.Failure;
        }
      } else {
        state.challengeInfos[challengeIndex].status = action.payload.status;
      }

      return state;
    },
  },
});

export const getChallengeInfo = (state: RootState) =>
  state.challenge.challengeInfos;
