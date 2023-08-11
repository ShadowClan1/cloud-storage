import React from "react";
import { downloadAxios, renameAxios } from "../../api/api";
import { useState } from "react";
import ConfirmationDialogueBox from "./ConfirmationDialogueBox";
import FormDialog from "../Forms/DialogForm";

const File = ({ fileName, type, size, setPath, path, setUpdateData }) => {
  const [formDialougeOpen, setFormDialougeOpen] = useState(false);
  const [fileNewName, setFileNewName] = useState("");

  const download = async () => {
    const data = downloadAxios(path + "/" + fileName);
    if (data.status == true) {
      console.log("file downloaded");
    } else {
    }
  };
  const [dialogue, setDialogue] = useState({
    visible: false,
    title: "Hare krishna",
    confirmation: "Hare krishan",
    button: "delete",
    fileName,
    path,
  });
  const showDialogueDelete = async () => {
    setDialogue({
      ...dialogue,
      visible: true,
      title: "Delete",
      body: "Do you want to delete",
      path,
      fileName,
    });
  };

  const renameDir = async () => {
    const res = await renameAxios(
      path + "/" + fileName,
      path + "/" + fileNewName
    );
    if (res.status == true) {
      setUpdateData((prev) => !prev);
      setFormDialougeOpen(false);
    } else {
    }
  };

  const renameOnChange = (e) => {
    setFileNewName(e.target.value);
  };

  return (
    <div className="flex flex-row  gap-5 hover:bg-blue-200 py-2 pl-5 relative group">
      {dialogue.visible && (
        <ConfirmationDialogueBox
          setDialogue={setDialogue}
          dialogue={dialogue}
          setUpdateData={setUpdateData}
        />
      )}

      <FormDialog
        open={formDialougeOpen}
        setOpen={setFormDialougeOpen}
        onClick={renameDir}
        onChange={renameOnChange}
        body="Rename Folder in your cloud storage"
        title={`Rename ${type == "DIR" ? "folder" : "file"} '${fileName}'`}
        label="New name"
        button="Rename"
      />

      <div class="group inline-block absolute right-[5px] ">
        <ul class="absolute hidden text-gray-700 pt-1 group-hover:block ">
          {type != "DIR" && (
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-blue-400 py-2 px-4 block "
                onClick={download}
                href={`${
                  process.env.SERVER || "http:///localhost:5000"
                }/api/fs/download?path=${path}${"/" + fileName}`}
              >
                Download
              </a>
            </li>
          )}
          <li class="">
            <div
              class="bg-gray-200 text-red-400 hover:bg-red-400 hover:text-white py-2 px-4 block "
              onClick={showDialogueDelete}
            >
              Delete
            </div>
          </li>
          <li class="">
            <div
              class="rounded-b bg-gray-200 text-blue-400 hover:text-white hover:bg-blue-400 py-2 px-4 block"
              onClick={() => setFormDialougeOpen(true)}
            >
              Rename
            </div>
          </li>
        </ul>
      </div>
      <div>
        <img
          src={"/assets/" + (type == "DIR" ? "folder.png" : "file.png")}
          className="w-10"
        />
      </div>
      <div className="w-11/12">
        <div className="text-2xl">{fileName}</div>
      </div>
    </div>
  );
};

export default File;
