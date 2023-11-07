export default function imageRename(file:any){
    // 1e9
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 2000)}`;
    // const filename = `${uniqueSuffix}.${file}`;
    const filename = file;
    return filename
}