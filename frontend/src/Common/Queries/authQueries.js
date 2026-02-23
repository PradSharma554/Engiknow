import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../../Repositories/auth/authRepository";

export function useLoginMutation(options = {}) {
  return useMutation({
    mutationFn: (params) => authRepository.login(params),
    ...options,
  });
}

export function useRegisterMutation(options = {}) {
  return useMutation({
    mutationFn: (params) => authRepository.register(params),
    ...options,
  });
}

export function useForgotPasswordMutation(options = {}) {
  return useMutation({
    mutationFn: (email) => authRepository.forgotPassword(email),
    ...options,
  });
}

export function useResetPasswordMutation(options = {}) {
  return useMutation({
    mutationFn: ({ resetToken, password }) =>
      authRepository.resetPassword(resetToken, password),
    ...options,
  });
}
