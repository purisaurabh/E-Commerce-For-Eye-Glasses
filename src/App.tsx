import { useSelector } from "react-redux";
import Index from "./components/routes";
import AdminDashboard from "./admin/AdminIndex";

function App() {
  const role = useSelector((state: any) => state.auth.userData?.role);
  return (
    <>
      {role === "admin" ? <AdminDashboard /> : <Index />}

    </>
  );
}

export default App;
