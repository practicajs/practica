import axios from 'axios';
import { AppError } from '@practica/error-handling';

export async function assertUserExists(userId: number) {
  const userVerificationRequest = await axios.get(
    `http://localhost/user/${userId}`,
    {
      validateStatus: () => true,
    }
  );
  if (userVerificationRequest.status !== 200) {
    throw new AppError(
      'user-doesnt-exist',
      `The user ${userId} doesnt exist`,
      userVerificationRequest.status,
      true
    );
  }

  return userVerificationRequest.data;
}
