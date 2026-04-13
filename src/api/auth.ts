import { api } from "./api";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<void> => {
  await api.post("/auth/login", data);
};

export const registerUser = async (data: {
  email: string;
  password: string;
  name: string;
  surname: string;
}): Promise<void> => {
  await api.post("/user", data);
};

export const fetchMe = async () => {
  try {
    const res = await api.get("/profile");
    return res.data;
  } catch (e: any) {
    if (e.response?.status === 401) {
      throw new Error("unauthorized");
    }
    throw e;
  }
};

export const logout = async (): Promise<void> => {
  await api.get("/auth/logout");
};



