import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/agencies");
  }, [navigate]);

  return null;
};

export default Index;
