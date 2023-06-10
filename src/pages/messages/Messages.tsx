import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { Table } from "../../components/Table";
import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { Column } from "../../components/Table";

const columns: Column[] = [
  {
    header: "Título",
    param: "title",
  },
  {
    header: "Destinatarios",
    param: (item) => item.recipients?.length || 0,
  },
  {
    header: "Estado",
    param: "state",
  },
  {
    header: "Fecha de envío",
    param: "sentAt",
  },
];

export const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const createMessage = () => navigate("/messages/new");

  ipcRenderer.on("reply:messages", (_, items) => setMessages(items));
  useEffect(() => {
    ipcRenderer.send("get-items", "messages");
  }, []);

  const actions = (
    <>
      <Button label="Nuevo mensaje" onClick={createMessage} />
    </>
  );
  return (
    <Page title="Mensajes" actions={actions}>
      <Table
        data={messages}
        columns={columns}
        onClick={({ id }) => navigate("/messages/" + id)}
      />
    </Page>
  );
};
