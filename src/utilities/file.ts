
import {promises as fsPromises} from 'fs';

export const makeThumb = async (): Promise<boolean> => {
try{
    await fsPromises.mkdir('../ImageApi/src/imagesrc/thumb');
    return true;
}
catch(error){
return false;
}
  };
  export const checkFileThumb = async (path:string): Promise<boolean> => {
    try{
       await fsPromises.access(path);
       return true;
        
    }
    catch(error){
    return false;
    }
      };
