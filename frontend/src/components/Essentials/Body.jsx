import React, { useEffect, useState } from "react";
import File from "../Small Components/File";
import { createDirAxios, getDirContent, uploadAxios } from "../../api/api";
import FormDialog from "../Forms/DialogForm";
import { useRef } from "react";

const Body = () => {
  const [content, setcontent] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const baseDir = [{ name: "..", type: "DIR" }];
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("");
  const [file, setFile] = useState({ details: null, nameVisibility: false });
  const [createFolder, setCreateFolder] = useState({
    visibility: false,
    dirName: "",
  });
  const fileRef = useRef(null);

  useEffect(() => {
    console.log(path);
    dirContent(path);
  }, [path, updateData]);

  const dirContent = async (path) => {
    const data = await getDirContent(path);
    console.log(data);
    if (data.status == true) {
      console.log(data.data);
      setcontent(baseDir.concat(data.data));
    }
  };
  const setPathFun = (path) => {
    //  setPath(prev=>prev + "/" + path)
    if (path != "..") setPath((prev) => prev + "/" + path);
    else {
      setPath((prev) => {
        const arr = prev.split("/");
        arr.pop();
        return arr.join("/");
      });
    }
  };
  const changeDir = (e) => {
    setCreateFolder({ ...createFolder, dirName: e.target.value });
    console.log(createFolder.dirName);
  };

  const createDir = async () => {
    if (createFolder.dirName == "") return;
    const data = await createDirAxios(path + "/" + createFolder.dirName);

    if (data) {
      setUpdateData(prev=>!prev)

      setOpen(false);
    }
  };

  const upload = async () => {
    let fileToUpload = "";
    const reader = new FileReader();
    reader.readAsDataURL(file.details);
    reader.onload = async () => {
      fileToUpload = reader.result;

      const res = await uploadAxios({
        file: fileToUpload,
        fileName: file?.details?.name,
        fileSize: file?.details?.size,
        path,
      });
      if (res.status == true) {
        setFile({ details: null, nameVisibility: false });
        setUpdateData(prev=>!prev)
      }
    };

    return;
  };

  const toggleCreateDir = () => {
    // setCreateFolder({ ...createDir, visibility: !createFolder.visibility });
    setOpen(true);
  };
  const toggleUpload = () => {
    if (file.nameVisibility == false) {
      fileRef.current.click();
    } else {
      setFile({ details: null, nameVisibility: false });
    }
    console.log(file.nameVisibility);
  };
  const fileOnChange = (e) => {
    setFile({ ...file, details: e.target.files[0], nameVisibility: true });
    console.log(e.target.files[0]);
  };

  return (
    <div className="flex flex-col justify-center w-3/4  ">
      
      <div className="border h-[40rem] ">
        <div className="w-full border flex flex-row items-center h-16 px-4">
          <div className="w-11/12 flex flex-row gap-3">
            <FormDialog
              open={open}
              setOpen={setOpen}
              onClick={createDir}
              onChange={changeDir}
              body="Create Folder in your cloud storage"
              title="Create Folder"
              label="Folder name"
            />
            {file.nameVisibility && (
              <>
                <span className="border px-3 py-1 max-w-md">
                  {file?.details?.name}
                </span>
                <button
                  className="bg-blue-400 text-white px-2 hover:bg-blue-500"
                  onClick={upload}
                >
                  {" "}
                  upload{" "}
                </button>
              </>
            )}
          </div>

          <div className="w-1/12">
            <div
              className="p-1 hover:border border-blue-400"
              onClick={toggleUpload}
            >
              <input
                type="file"
                name=""
                id=""
                ref={fileRef}
                className="hidden"
                onChange={fileOnChange}
              />
              <img src="/assets/upload.png" className="w-10" />
            </div>
          </div>
          <div className="w-1/12">
            <div
              className="p-1 hover:border border-blue-400"
              onClick={toggleCreateDir}
            >
              <img src="/assets/folderC.png" className="w-10" />
            </div>
          </div>
        </div>

        <div className="flex flex-col px-2 py-3">
          {content.map((e) => {
            return (
              <div
                onDoubleClick={() => {
                if(e.type == 'DIR')  setPathFun(e.name);
                }}
              >
                <File type={e.type} fileName={e.name} path={path} setUpdateData={setUpdateData} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
