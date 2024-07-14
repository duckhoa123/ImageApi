import express from 'express';

import fs from 'fs';
import sharp from 'sharp';
const images=express.Router();
images.get('/',(req,res)=>{
    const widthString = req.query.width as string | undefined;
    const heightString = req.query.height as string | undefined;
    const filenameString = req.query.filename as string ;

  
    let width: number | undefined;
    let height: number | undefined;
   
  
    if (widthString) {
      width = parseInt(widthString);
    }
  
    if (heightString) {
      height = parseInt(heightString);
    }
  

    res.type('image/jpg')

    const readStream = fs.createReadStream(`../ImageApi/src/routes/full/${filenameString}.jpg`)
    let transform = sharp()
  
   
    if (width || height) {
      transform = transform.resize(width, height)
    }
    transform = transform.toFormat('jpg');
  
    return readStream.pipe(transform).pipe(res)
});
export default images;