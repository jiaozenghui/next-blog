import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: any) {
  try {
    const { searchParams } = new URL(request.url);
    const task_id = searchParams.get("task_id");
    const resulut = await axios.get(
      `https://dashscope.aliyuncs.com/api/v1/tasks/${task_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
        },
      }
    );
    return NextResponse.json(resulut.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
