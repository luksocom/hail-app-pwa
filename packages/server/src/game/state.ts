import { Player, Shot } from "@shared/types";
import { nanoid } from "nanoid";

export const players = new Map<string, Player>();
export const shots = new Map<string, Shot>();

export function spawnShot(ownerId: string, x: number, y: number, angle: number, text: string): Shot {
  const speed = 0.6;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  const id = nanoid();
  const s: Shot = { id, ownerId, x, y, vx, vy, text };
  shots.set(id, s);
  return s;
}
