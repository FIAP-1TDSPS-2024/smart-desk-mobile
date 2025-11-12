import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN_KEY = "@smart-desk:auth-token";
const USER_DATA_KEY = "@smart-desk:user-data";

export interface UserData {
  id: string;
  name: string;
  email: string;
  company?: string;
  workMode?: string;
  phone?: string;
  position?: string;
  password: string;
  avatar?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  company?: string;
  workMode?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

class AuthService {
  // Store auth token
  async setAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving auth token:", error);
      throw new Error("Erro ao salvar token de autenticação");
    }
  }

  // Get auth token
  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  }

  // Remove auth token
  async removeAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error("Error removing auth token:", error);
      throw new Error("Erro ao remover token de autenticação");
    }
  }

  // Store user data
  async setUserData(userData: UserData): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
      throw new Error("Erro ao salvar dados do usuário");
    }
  }

  // Get user data
  async getUserData(): Promise<UserData | null> {
    try {
      const data = await AsyncStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  // Remove user data
  async removeUserData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error("Error removing user data:", error);
      throw new Error("Erro ao remover dados do usuário");
    }
  }

  // Login function
  async login(
    loginData: LoginData
  ): Promise<{ token: string; user: UserData }> {
    try {
      const user = await this.getUserData();

      if (!user) {
        throw new Error("Credenciais inválidas");
      }

      if (user.password !== loginData.password) {
        throw new Error("Credenciais inválidas - senha invalida");
      }

      const mockToken = `token-${Date.now()}-${loginData.email}`;

      // Store token and user data
      await this.setAuthToken(mockToken);
      await this.setUserData(user);

      return { token: mockToken, user: user };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Erro ao fazer login. Verifique suas credenciais.");
    }
  }

  // Signup function
  async signup(
    signupData: SignupData
  ): Promise<{ token: string; user: UserData }> {
    try {
      const mockUser: UserData = {
        id: `user-${Date.now()}`,
        name: signupData.name,
        email: signupData.email,
        company: signupData.company,
        workMode: signupData.workMode,
        password: signupData.password,
      };

      const mockToken = `token-${Date.now()}-${signupData.email}`;

      // Store token and user data
      await this.setAuthToken(mockToken);
      await this.setUserData(mockUser);

      return { token: mockToken, user: mockUser };
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Erro ao criar conta. Tente novamente.");
    }
  }

  // Logout function
  async logout(): Promise<void> {
    try {
      await this.removeAuthToken();
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Erro ao fazer logout");
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      return token !== null;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  }

  // Update user data
  async updateUserData(updates: Partial<UserData>): Promise<void> {
    try {
      const currentData = await this.getUserData();
      if (!currentData) {
        throw new Error("Usuário não encontrado");
      }
      const updatedData = { ...currentData, ...updates };
      await this.setUserData(updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
      throw new Error("Erro ao atualizar dados do usuário");
    }
  }
}

export default new AuthService();
