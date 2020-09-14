import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Protected/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, fetchData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  let history = useHistory();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    console.log("The id for update is : ", colorToEdit.id);
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?  colorEdit.id ??
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log("This is the Update Color :", res);
        setColorToEdit(res.data);
        fetchData();
        history.push("/bubble");
      })
      .catch((error) => console.log("This is the update error", error.message));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, colorToEdit)
      .then((res) => {
        console.log("This is the delete response:", res);
        setColorToEdit(res.data);
        fetchData();
        history.push("/bubble");
      })
      .catch((err) => console.log("This is the delete Error: ", err.message));
  };

  const newColorSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/colors", newColor)
      .then((res) => {
        console.log("The response for newColor is:", res);
        setNewColor(res.data);
        fetchData();
        history.push("/bubble");
      })
      .catch((err) => console.log("newColor data error:", err.message));
    setNewColor({
      color: "",
      code: { hex: "" },
    });
  };

  const newColorChanger = (e) => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  };

  const newHexChanger = (e) => {
    setNewColor({ ...newColor, code: { [e.target.name]: e.target.value } });
  };

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button
              type="submit"
              onClick={(e) => {
                saveEdit(e);
              }}
            >
              save
            </button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <form id="newColor" onSubmit={newColorSubmit}>
        <legend>Add New Color</legend>
        <label>
          New Color is :
          <input
            type="text"
            name="color"
            placeholder="Name of Color"
            onChange={newColorChanger}
            value={newColor.color}
          />
        </label>
        <label>
          Hex Code is:
          <input
            type="text"
            name="hex"
            placeholder="Color Hex"
            onChange={newHexChanger}
            // value={newColor.code.hex}
          />
        </label>
        <button>Submit</button>
      </form>

      <button onClick={handleClick}>Sign Out</button>

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
