import { HashRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { LuContact, LuSend } from "react-icons/lu";
import { Contacts } from "./pages/contacts/Contacts";
import { Messages } from "./pages/messages/Messages";
import { NewMessage } from "./pages/messages/NewMessage";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";

const routes = [
  {
    path: "/messages",
    label: "Mensajes",
    icon: <LuSend />,
  },
  {
    path: "/contacts",
    label: "Contactos",
    icon: <LuContact />,
  },
];

export const App = () => {
  const [subscription, setSubscription] = useState(false);
  useEffect(() => {
    if (!subscription) {
      ipcRenderer.addListener("notification", (_, arg) => {
        const { message, type } = arg;
        notify(message, type);
      });
      setSubscription(true);
    }
    return () => {
      ipcRenderer.removeListener("notification", () => {});
    };
  }, []);

  const notify = (message: string, type: "success" | "error") =>
    toast[type](message, { duration: 5000, id: "notification" });

  return (
    <HashRouter>
      <main className="h-full w-full bg-gray-100 text-gray-700" x-data="layout">
        <div className="flex">
          <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 h-screen">
            {routes.map((route, index) => (
              <NavLink
                key={index}
                to={route.path}
                style={({ isActive }) => {
                  return {
                    background: isActive ? "#f3f4f6" : "",
                  };
                }}
                className="flex items-center space-x-3 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
              >
                {route.icon}
                <span>{route.label}</span>
              </NavLink>
            ))}
          </aside>

          <div className="h-screen overflow-auto w-full p-10">
            <Routes>
              <Route path="/" element={<Navigate replace to="/messages" />} />
              <Route path="/messages" Component={Messages} />
              <Route path="/messages/new" Component={NewMessage} />
              <Route path="/messages/:id" Component={NewMessage} />
              <Route path="/contacts" Component={Contacts} />
            </Routes>
            <Toaster />
          </div>
        </div>
      </main>
    </HashRouter>
  );
};

export default App;
