export declare function registerWebhook(webhookId: string, webhookUrl: string, authToken?: string): Promise<any>;
export declare function subscribeToWebhook(webhookId: string, threadId: string): Promise<any>;
export declare function unsubscribeFromWebhook(threadId: string): Promise<any>;
