import { NatsConnection } from 'nats';
export declare function connectToNATS(): Promise<NatsConnection>;
export declare function subscribeToThread(threadId: string, callback: (data: any) => void): Promise<import("nats").Subscription>;
export declare function closeNATSConnection(): Promise<void>;
