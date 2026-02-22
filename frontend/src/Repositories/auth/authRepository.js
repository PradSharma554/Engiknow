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
}

export const authRepository = AuthRepository.getInstance();
