import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllGoals, reset } from "../features/goals/goalSlice";
// Components
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";
import GoalForm from "../components/GoalForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getAllGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goal Deshboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => {
              return <GoalItem key={goal._id} goal={goal} />;
            })}
          </div>
        ) : (
          <h3>You have not set any goal</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
