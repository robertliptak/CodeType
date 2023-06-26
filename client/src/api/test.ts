import axios from "./axios";

const test = async () => {
  try {
    const response = await axios.get("/test", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAyNzc4YjRiMmE4YmQ5MWQ5ZDY5NCIsImlhdCI6MTY4NjgzMDQ0MSwiZXhwIjoxNjg2ODMxMzQxfQ.DJx8mzRexlQPHV3R-MYBuI4--I2yKb6UAlhV3CNu9J8",
      },
    });
    return response;
  } catch (error) {
    console.log("from test.ts", error);
    return error;
  }
};

export default test;
