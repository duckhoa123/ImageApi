
import {makeThumb,checkFileThumb} from '../utilities/file';
describe('Test File Utilities', (): void => {
    const path='../ImageApi/src/imagesrc/thumb/palmtunneltestx300x100.jpg';
    it('Should create thumb folder and return true', async (): Promise<void> => {
        const result: boolean = await makeThumb();
        expect(result).toBeFalse();
      });
      it('Should return false', async (): Promise<void> => {
        const result: boolean = await checkFileThumb(path);
        expect(result).toBeFalse();
      });
});