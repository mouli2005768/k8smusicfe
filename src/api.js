import axios from "axios";

// Base URL comes from environment variable (Vite)
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// ================== USER AUTH ==================
export const signIn = async (email, password) => {
  try {
    const response = await API.post("/user/signin", {
      emailid: email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("SignIn Error:", error);
    return "401::Server Error";
  }
};

export const signUp = async (fullname, email, password, role) => {
  try {
    const response = await API.post("/user/signup", {
      fullname,
      emailid: email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("SignUp Error:", error);
    return "401::Server Error";
  }
};

// ================== SONGS ==================
export const getSongs = () => API.get("/songs");
export const addSong = (songData) => API.post("/songs", songData);
export const deleteSong = (id) => API.delete(`/songs/${id}`);
export const uploadSong = (formData) =>
  API.post("/songs/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ================== ALBUMS ==================
export const getAlbums = () => API.get("/albums");
export const deleteAlbum = (id) => API.delete(`/albums/${id}`);
export const addAlbum = (formData) =>
  API.post("/albums/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ================== PAYMENTS ==================
export const makePayment = async (paymentData) => {
  try {
    const response = await API.post("/payments/pay", paymentData);
    return response.data;
  } catch (error) {
    console.error("Payment Error:", error);
    throw error;
  }
};

export const getPaymentStatus = async (email) => {
  try {
    const response = await API.get(`/payments/status/${email}`);
    return response.data;
  } catch (error) {
    console.error("Payment Status Error:", error);
    return "Error fetching payment status";
  }
};

// ================== FAVOURITES ==================
export const getUserFavourites = (email) =>
  API.get(`/favourites/${email}/songs`);

export const addFavourite = (email, songId) =>
  API.post(`/favourites/add?email=${email}&songId=${songId}`);

export const removeFavourite = (email, songId) =>
  API.delete(`/favourites/remove?email=${email}&songId=${songId}`);

// ================== ADMIN STATS ==================
export const getAdminStats = () => API.get("/admin/stats");

export default API;
