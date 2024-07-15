import express from 'express';
import {makeThumb,checkFileThumb} from '../../utilities/file';
import fs from 'fs';
import sharp from 'sharp';
const images=express.Router();
images.get('/',async (req,res): Promise<void>=>{
    const widthString = req.query.width as string | undefined;
    const heightString = req.query.height as string | undefined;
    const filenameString = req.query.filename as string | undefined;

  
    let width: number | undefined;
    let height: number | undefined;
   
    if(!filenameString){
        res.status(400).send('Please provide file name');
        return;
    }
    if (!fs.existsSync(`../ImageApi/src/imagesrc/full/${filenameString}.jpg`)) {
        res.status(404).send('File not found');
        return;
      }
    if (widthString) {
      width = parseInt(widthString);
      if (isNaN(width) || width <= 0) {
        res.status(400).send('Invalid width');
        return;
      }
    }
    else{
        res.status(400).send('Please provide width');
        
        return;
    }
  
    if (heightString) {
      height = parseInt(heightString);
      if (isNaN(height) || height <= 0) {
        res.status(400).send('Invalid height');
        return;
    }}
    else{
        res.status(400).send('Please provide length');
        return;
    }
     res.type('image/jpg')
    try{
      if (!fs.existsSync(`../ImageApi/src/imagesrc/thumb`)) {
       if( await makeThumb()===false)
       {
        console.error('Error creating thumb folder');
        res.status(500).send('Internal Server Error');
       }
      };
      const check=await checkFileThumb(`../ImageApi/src/imagesrc/thumb/${filenameString}x${width}x${height}.jpg`)
      if(check===true)
      {
        const readStream =await fs.createReadStream(`../ImageApi/src/imagesrc/thumb/${filenameString}x${width}x${height}.jpg`);
        readStream.pipe(res);
        readStream.on('error', (err) => {
          console.error('Read stream error:', err);
          res.status(500).send('Internal Server Error');
        });

      }
      else{
        const readStream = fs.createReadStream(`../ImageApi/src/imagesrc/full/${filenameString}.jpg`);
    let transform = sharp().resize(width, height).toFormat('jpg');
      readStream.pipe(transform).pipe(res);
    try{
      let output=`../ImageApi/src/imagesrc/thumb/${filenameString}x${width}x${height}.jpg` as string;
      let input=`../ImageApi/src/imagesrc/full/${filenameString}.jpg` ;
    await  sharp(input).resize(width, height).toFormat('jpg').toFile(output);}
     catch(error){
      console.error('Save file error:', error);
      res.status(500).send('Internal Server Error');
     };
     readStream.on('error', (err) => {
        console.error('Read stream error:', err);
        res.status(500).send('Internal Server Error');
      });
    
      transform.on('error', (err) => {
        console.error('Transform stream error:', err);
        res.status(500).send('Internal Server Error');
      });
      }   
    }
    catch(err){
        console.error('Error processing image:', err);
        res.status(500).send('Internal Server Error');
    }
});
export default images;