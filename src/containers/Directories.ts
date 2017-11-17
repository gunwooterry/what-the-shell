import { File, Folder } from './Entity';

const root = new Folder('~');

const documentsFolder = new Folder('Documents');
const doc3 = new File('doc3');
const doc4 = new File('doc4');
documentsFolder.addChildren([doc3, doc4]);

const workRelatedFolder = new Folder('work_related');
const doc1 = new File('doc1');
const doc2 = new File('doc2');
workRelatedFolder.addChildren([doc1, doc2]);

const downloadsFolder = new Folder('Downloads');
const imagesFolder = new Folder('images');
const img1  = new File('img1');
const img2 = new File('img2');

downloadsFolder.addChild(imagesFolder);
imagesFolder.addChildren([img1, img2]);

root.addChildren([documentsFolder, downloadsFolder]);

export { root };
