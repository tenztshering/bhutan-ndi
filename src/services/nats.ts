import { connect, NatsConnection, StringCodec, nkeyAuthenticator } from 'nats';
import dotenv from 'dotenv';

dotenv.config();

let natsConnection: NatsConnection | null = null;
const sc = StringCodec();

export async function connectToNATS(): Promise<NatsConnection> {
  if (natsConnection) return natsConnection;

  // Import nkeyAuthenticator from 'nats'
  // Make sure to add this import at the top: import { nkeyAuthenticator } from 'nats';
  natsConnection = await connect({
    servers: process.env.NATS_URL,
    authenticator: nkeyAuthenticator(
      () => {
        if (!process.env.NATS_SEED) throw new Error('NATS_SEED is not defined');
        return Uint8Array.from(Buffer.from(process.env.NATS_SEED, 'base64'));
      }
    )
  });

  return natsConnection;
}

export async function subscribeToThread(threadId: string, callback: (data: any) => void) {
  const nc = await connectToNATS();
  const sub = nc.subscribe(threadId);
  
  (async () => {
    for await (const m of sub) {
      callback(JSON.parse(sc.decode(m.data)));
    }
  })();

  return sub;
}

export async function closeNATSConnection() {
  if (natsConnection) {
    await natsConnection.close();
    natsConnection = null;
  }
}