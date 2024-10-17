import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!,
)


export async function POST(req: Request) {
    const body = await req.text();
  
    

    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");
  
    if (!authorization) {
      return new NextResponse("No authorization header", { status: 400 });
    }
  
    const event = await receiver.receive(body, authorization);
  
    if (event.event === "ingress_started") {
        await db.stream.update({
          where: {
              ingress_id: event.ingressInfo?.ingressId,
          },
          data: {
              is_live: true,
          }
        })
      }

    if (event.event === "ingress_ended") {
      await db.stream.update({
        where: {
            ingress_id: event.ingressInfo?.ingressId,
        },
        data: {
            is_live: false,
        }
      })
    }
  }