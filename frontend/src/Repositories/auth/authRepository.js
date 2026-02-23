import api from "../../lib/api";

class AuthRepository {
  static instance = null;

  static getInstance() {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }
    return AuthRepository.instance;
  }

  async login({ email, password }) {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  }

  async register({ name, email, password }) {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return data;
  }

  async forgotPassword(email) {
    const { data } = await api.post("/auth/forgotpassword", { email });
    return data;
  }

  async resetPassword(resetToken, password) {
    const { data } = await api.put(`/auth/resetpassword/${resetToken}`, {
      password,
    });
    return data;
  }
}

export const authRepository = AuthRepository.getInstance();
