import 'dotenv/config';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

// NOTE: Ensure to call this before requiring any other modules!
Sentry.init({
    dsn: 'https://bd2177c0d754bdbec1f01f165a184a0b@o4508962703409152.ingest.de.sentry.io/4508962710224976',
    integrations: [nodeProfilingIntegration()],
});
