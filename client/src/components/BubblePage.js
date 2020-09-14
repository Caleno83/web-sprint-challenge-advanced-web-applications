import React, { useState, useEffect } from "react";
import axiosWithAuth from "../Protected/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const fetchData = () => {
    axiosWithAuth()
    .get("/api/colors")
    .then((res) => {
      console.log("The response for BubblePage is:", res.data);
      setColorList(res.data);
    })
    .catch((err) =>
      console.error("The Error for BubblePage is", err.message)
    );
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchData={fetchData} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
