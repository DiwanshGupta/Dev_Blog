import express from 'express';
const app = express();

app.get("/api/", (req,res,next)=>{
    res.send("Hello from server..")
  });

const port = 5000;
const start = async () => {
  try {
      app.listen(port, () =>
        console.log(
          `⚡️[server]: Server iS running at http://localhost:${port} as well as connected with database`
        )
      );
  } catch (error) {
    console.log(error);
  }
};
start()