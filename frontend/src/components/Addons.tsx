import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const Addons = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) <Navigate to="/login" />;
  return (
    <Layout title="Addons">
      <h1>Addons</h1>
    </Layout>
  );
};

export default Addons;
