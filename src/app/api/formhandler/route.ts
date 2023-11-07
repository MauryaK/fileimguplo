import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import imageRename from '@/app/imageRename/imageRename';
import MongoDBConnect from "@/app/lib/MongoDBConnect";
import crudTable from "@/app/model/TestModel"
export async function POST(req: NextRequest, res: NextResponse) {
 await MongoDBConnect();
  try {
    const formData = await req.formData();
    const image = [];
    const username = await formData.get('username');
    const formDataEntryValues = Array.from(formData.values());
    for (const formDataEntryValue of formDataEntryValues) {
      if (
        typeof formDataEntryValue === 'object' &&
        'arrayBuffer' in formDataEntryValue
      ) {
        const fileBlob = formDataEntryValue as Blob;
        const buffer = Buffer.from(await fileBlob.arrayBuffer());
        
        const originalFilename = formDataEntryValue.name; 
        const filename = imageRename(originalFilename);

        fs.writeFileSync(`public/${filename}`, buffer);
        image.push(filename);
        JSON.stringify(image);
      }
    }
    const s = JSON.parse(String(username))
    const {name,email,mobile, status} = s ;
    await crudTable.create({name,email,mobile,status,image})

    return NextResponse.json({success:true,name,email,mobile,status,image});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}
