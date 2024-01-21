import { Schema, Context, type } from "@colyseus/schema";
import { auth } from "@colyseus/auth";
export class MyRoomState extends Schema {

  @type("string") name: string = '';

}
