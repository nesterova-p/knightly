import { Webhook } from 'svix';
import { headers } from 'next/headers';

import User from '@/Models/UserSchema';
import connectToDB from '@/lib/connectToDB';

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        console.error('WEBHOOK_SECRET missing');
        return new Response('Server misconfigured', { status: 500 });
    }

    /* 2. –– grab and validate Svix headers ––––––––––––––––––––––––––––––– */
    const h = headers();
    const svixId        = h.get('svix-id');
    const svixTimestamp = h.get('svix-timestamp');
    const svixSignature = h.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response('Missing Svix headers', { status: 400 });
    }

    /* 3. –– read the body and verify the signature –––––––––––––––––––––– */
    const payload = await req.json();
    const body    = JSON.stringify(payload);

    let event;
    try {
        const wh = new Webhook(WEBHOOK_SECRET);
        event = wh.verify(body, {
            'svix-id':        svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature,
        });
    } catch (err) {
        console.error('Webhook verification failed:', err);
        return new Response('Invalid signature', { status: 400 });
    }

    /* 4. –– handle the user.created event ––––––––––––––––––––––––––––––– */
    if (event.type === 'user.created') {
        const {
            id: clerkUserId,
            email_addresses,
            username,
            first_name,
        } = event.data;

        // Choose the first available nickname source
        const nickname =
            username ||
            first_name ||
            email_addresses?.[0]?.email_address.split('@')[0] ||
            'New User';

        try {
            await connectToDB();           // sentinel-connect (no new conn if already open)
            await User.create({
                clerkUserId,
                emailAddress: email_addresses[0].email_address,
                nickname,
            });
            console.log('User saved:', clerkUserId);
        } catch (err) {
            console.error('DB insert error:', err);
            return new Response('Database error', { status: 500 });
        }
    }

    /* 5. –– always respond 2xx so Clerk stops retrying ––––––––––––––––––– */
    return new Response('ok', { status: 200 });
}
