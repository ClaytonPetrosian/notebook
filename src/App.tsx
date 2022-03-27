import { FC, useState, useEffect } from "react";
import { Button, Input, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import "./App.scss";

const { TextArea } = Input;
interface Note {
  title: string;
  content: string;
}

const sample: Note = {
  title: "示例笔记",
  content:
    "Similique odit blanditiis voluptatem recusandae officiis. Natus architecto quod repellendus distinctio corporis. Sit voluptas qui provident.",
};
const App: FC = () => {
  const initialNoteState: Note = {
    title: "",
    content: "",
  };

  const [note, editNote] = useState(initialNoteState);

  const noteLisLInitialState = JSON.parse(
    localStorage.getItem("noteList") || JSON.stringify([sample])
  );

  const [notelist, setNoteList] = useState(noteLisLInitialState);

  const edit = (e: any) => {
    const { name, value } = e.target;
    editNote((note) => ({ ...note, [name]: value }));
  };

  const add = (e: any) => {
    if (!note.title || !note.content) return;
    setNoteList([...notelist, note]);
    editNote(initialNoteState);
  };

  useEffect(() => {
    localStorage.setItem("noteList", JSON.stringify(notelist));
  }, [notelist]);

  const deleteNote = (noteIndex: Number) => {
    const newNoteList = notelist.filter(
      (_: Object, index: Number) => index !== noteIndex
    );
    setNoteList(newNoteList);
  };

  return (
    <main className="notebook">
      <section className="notebook-editing-zone">
        <Input
          placeholder="新笔记..."
          value={note.title}
          name="title"
          onChange={edit}
        />
        <TextArea
          rows={3}
          placeholder="编辑笔记..."
          maxLength={6}
          value={note.content}
          name="content"
          onChange={edit}
        />
        <Button type="primary" onClick={add} shape="round">
          添加新的笔记 📒
        </Button>
      </section>
      <aside className="notebook-preview">
        <List
          itemLayout="horizontal"
          dataSource={notelist}
          size="small"
          renderItem={(item: Note, index: Number) => (
            <List.Item className="notebook-item" key={item.title}>
              <List.Item.Meta
                className="notebook-item-title"
                title={<header>{item.title}</header>}
              />
              <section className="notebook-item-wrapper">
                <article className="notebook-item-content">
                  {item.content}
                </article>
                <Button
                  danger
                  className="notebook-item-delete"
                  shape="circle"
                  onClick={() => {
                    deleteNote(index);
                  }}
                  icon={<DeleteOutlined />}
                />
              </section>
            </List.Item>
          )}
        />
      </aside>
    </main>
  );
};

export default App;
