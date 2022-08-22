import * as sharedModel from '../shared/shared.model.js';
import * as friendModel from './friend.model.js';

export const sendRequest = async (user_a, user_b) => {
  const me = await sharedModel.selectUserByEmail(user_a);
  const friendId = await sharedModel.selectUserByUsername(user_b);

  if (!friendId) {
    throw new Error('User not found');
  }

  user_b = friendId.user_id;

  const friend = await friendModel.sendRequest(me.user_id, user_b);

  return friend;
};

export const getRequests = async (user_a) => {
  const me = await sharedModel.selectUserByEmail(user_a);
  console.log(me.user_id);

  return friendModel.getRequests(me.user_id);
};
