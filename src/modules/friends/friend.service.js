import * as sharedModel from '../shared/shared.model.js';
import * as friendModel from './friend.model.js';

export const sendRequest = async (user_a, user_b) => {
  const me = await sharedModel.selectUserByEmail(user_a);
  const friendId = await sharedModel.selectUserByUsername(user_b);

  if (!friendId) {
    throw new Error('User not found');
  }

  const friend = await friendModel.sendRequest(me.user_id, friendId.user_id);

  return friend;
};

export const getRequests = async (user_a) => {
  const me = await sharedModel.selectUserByEmail(user_a);
  console.log(me.user_id);

  return friendModel.getRequests(me.user_id);
};

export const acceptRequest = async (user_a, user_b) => {
  const me = await sharedModel.selectUserByEmail(user_a);
  const friendId = await sharedModel.selectUserByUsername(user_b);

  if (!friendId) {
    throw new Error('User not found');
  }

  if (me.user_id === friendId.user_id) {
    throw new Error('You cannot add yourself as a friend');
  }

  const friend = await friendModel.acceptRequest(friendId.user_id, me.user_id);

  return friend;
};
