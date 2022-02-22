import axios from "axios";

const API_URL = "/api/goals/";

const getAllGoals = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

const deleteGoal = async (id, token) => {
  const response = await axios.delete(`${API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createGoal = async (goalData, token) => {
  const response = await axios.post(API_URL, goalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const goalService = {
  getAllGoals,
  deleteGoal,
  createGoal,
};

export default goalService;
