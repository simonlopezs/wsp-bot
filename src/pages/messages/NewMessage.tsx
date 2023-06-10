import { ipcRenderer } from "electron";
import { Page } from "../../components/Page";
import { Button } from "../../components/Button";
import { WriteEventPayload } from "../../models/WriteEvent";
import { FormField } from "../../components/FormField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewMessage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState([]);

  const save = () => {
    const payload: WriteEventPayload = {
      collection: "messages",
      data: {
        title,
        body,
        recipients,
      },
      action: "add",
    };
    ipcRenderer.once("reply:write-item", (_, result) =>
      result ? navigate("/messages") : ""
    );
    ipcRenderer.send("write-item", payload);
  };

  const cancel = () => navigate("/messages");

  return (
    <Page title="Nuevo mensaje">
      <div>
        <FormField label="Título" value={title} setValue={setTitle} />
        <FormField
          label="Contenido"
          value={body}
          setValue={setBody}
          fieldType="textarea"
        />
        <FormField
          label="Destinatarios"
          value={recipients}
          setValue={setRecipients}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button onClick={cancel} label="Cancelar" variant="secondary" />
        <Button onClick={save} label="Guardar" />
      </div>
    </Page>
  );
};
