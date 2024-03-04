const express = require ("express");

const port = 8080;

express.listen(
  port,()=>{
      console.log("listening to port ${port}")
  }
)
